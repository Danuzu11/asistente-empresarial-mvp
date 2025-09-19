'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Plus, 
  User, 
  Bot, 
  ArrowLeft,
  MessageSquare,
  Trash2,
  FileText,
  Download,
  Eye,
  Mic,
  Image,
  Paperclip,
  Banana 
} from 'lucide-react';

interface DocumentAttachment {
  filename: string;
  content: string; // base64
  contentType: string;
  size: number;
  downloadUrl: string;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  documentAttachment?: DocumentAttachment;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [messagesEndRef, setMessagesEndRef] = useState<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    setUserEmail(email || '');
    
    // Cargar chats existentes
    loadChats();
  }, [router]);

  // Auto-scroll cuando se agregan nuevos mensajes
  useEffect(() => {
    if (messagesEndRef) {
      messagesEndRef.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChat?.messages, isLoading, messagesEndRef]);

  const loadChats = () => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setChats(parsedChats);
    }
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'Nueva conversación',
      messages: [],
      createdAt: new Date()
    };
    
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setCurrentChat(newChat);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
  };

  const selectChat = (chat: Chat) => {
    setCurrentChat(chat);
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
    
    if (currentChat?.id === chatId) {
      setCurrentChat(updatedChats.length > 0 ? updatedChats[0] : null);
    }
  };



  // Funcion para enviar mensaje a Gemini
  const sendToGemini = async (message: string, history: Message[]) => {
    try {

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: history.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al conectar con Gemini:', error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    // Actualizar chat actual
    const updatedMessages = [...currentChat.messages, userMessage];
    const updatedChat = { ...currentChat, messages: updatedMessages };
    
    // Actualizar título si es la primera conversación
    if (updatedMessages.length === 1) {
      updatedChat.title = inputMessage.slice(0, 30) + (inputMessage.length > 30 ? '...' : '');
    }

    setCurrentChat(updatedChat);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Enviar mensaje a Gemini
      const aiResponse = await sendToGemini(inputMessage, currentChat.messages);
      console.log("🔍 Respuesta completa del API:", aiResponse);
 
      let assistantMessage: Message;
      
      // Verificar si hay un documento adjunto
      if (aiResponse.documentAttachment) {
        console.log("📄 Documento adjunto detectado:", aiResponse.documentAttachment.filename);
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          content: aiResponse.message,
          role: 'assistant',
          timestamp: new Date(),
          documentAttachment: aiResponse.documentAttachment
        };
      } else {
        // Respuesta normal sin documento adjunto
        console.log("💬 Respuesta normal sin documento adjunto");
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          content: aiResponse.message,
          role: 'assistant',
          timestamp: new Date()
        };
      }

      console.log("assistantMessage: ",  assistantMessage);
      const finalMessages = [...updatedMessages, assistantMessage];
      const finalChat = { ...updatedChat, messages: finalMessages };
      
      setCurrentChat(finalChat);

      // Actualizar lista de chats
      const updatedChats = chats.map(chat => 
        chat.id === currentChat.id ? finalChat : chat
      );

      setChats(updatedChats);
      localStorage.setItem('chats', JSON.stringify(updatedChats));

    } catch (error) {
      // En caso de error, mostrar mensaje de error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `❌ **Error de conexión**\n\nNo pude conectar con el asistente de IA. Por favor, verifica tu conexión a internet e inténtalo de nuevo.\n\nSi el problema persiste, contacta al administrador del sistema.`,
        role: 'assistant',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, errorMessage];
      const finalChat = { ...updatedChat, messages: finalMessages };
      
      setCurrentChat(finalChat);

      // Actualizar lista de chats
      const updatedChats = chats.map(chat => 
        chat.id === currentChat.id ? finalChat : chat
      );
      setChats(updatedChats);
      localStorage.setItem('chats', JSON.stringify(updatedChats));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Función para formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Función para ver documento
  const viewDocument = (base64Content: string, filename: string) => {
    const pdfWindow = window.open('', '_blank');
    if (pdfWindow) {
      pdfWindow.document.open();
      pdfWindow.document.write(`
        <html>
          <head>
            <title>${filename}</title>
            <style>
              body { margin: 0; padding: 0; }
              iframe { width: 100vw; height: 100vh; border: none; }
            </style>
          </head>
          <body>
            <iframe src="data:application/pdf;base64,${base64Content}"></iframe>
          </body>
        </html>
      `);
      pdfWindow.document.close();
    }
  };

  // Función para descargar documento
  const downloadDocument = (base64Content: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${base64Content}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
            </button>
          </div>
          
          <button
            onClick={createNewChat}
            className="w-full flex items-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva conversación</span>
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                  currentChat?.id === chat.id
                    ? 'bg-gray-700 text-white'
                    : 'hover:bg-gray-700/50 text-gray-300'
                }`}
                onClick={() => selectChat(chat)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">
                      {chat.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {chat.messages.length} mensajes
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded transition-all"
                  >
                    <Trash2 className="w-3 h-3 text-gray-400 hover:text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User info */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {userEmail}
              </p>
              <p className="text-xs text-gray-500">Asistente Empresarial</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">
                    {currentChat.title}
                  </h1>
                  <p className="text-sm text-gray-400">
                    Asistente Empresarial IA - Gemini
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentChat.messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-400 mb-2">
                      ¡Comienza una conversación!
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Pregúntame sobre procesos empresariales, documentación o cualquier tema relacionado con tu empresa
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4 text-left max-w-md">
                      <p className="text-sm text-gray-300 mb-2">Puedo ayudarte con:</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Análisis de documentos empresariales</li>
                        <li>• Procesos contables y administrativos</li>
                        <li>• Consultas sobre cuentas por cobrar</li>
                        <li>• Órdenes de compra y peticiones</li>
                        <li>• Reportes y análisis de datos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                currentChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex space-x-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className="flex flex-col space-y-3">
                      <div
                        className={`max-w-3xl px-4 py-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      
                      {/* Documento adjunto - ahora en una línea separada */}
                      {message.documentAttachment && (
                        <div className="max-w-md">
                          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {message.documentAttachment.filename}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {formatFileSize(message.documentAttachment.size)}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => viewDocument(
                                  message.documentAttachment!.content,
                                  message.documentAttachment!.filename
                                )}
                                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                              >
                                <Eye className="w-4 h-4" />
                                <span>Ver</span>
                              </button>
                              <button
                                onClick={() => downloadDocument(
                                  message.documentAttachment!.content,
                                  message.documentAttachment!.filename
                                )}
                                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                              >
                                <Download className="w-4 h-4" />
                                <span>Descargar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex space-x-3 justify-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Elemento de referencia para auto-scroll */}
              <div ref={setMessagesEndRef} />
            </div>

            {/* Input area */}
            <div className="bg-gray-800 border-t border-gray-700 p-4">
              <div className="flex space-x-3">
                {/* Botones de adjuntos */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => console.log('Subir audio')}
                    className="p-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors"
                    title="Subir audio"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => console.log('Subir imagen')}
                    className="p-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors"
                    title="Subir imagen"
                  >
                    <Image className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => console.log('Subir documento')}
                    className="p-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors"
                    title="Subir documento"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Pregúntame sobre procesos empresariales, documentación o cualquier tema relacionado con tu empresa..."
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-gray-500 mb-4">
                O crea una nueva conversación para comenzar
              </p>
              <button
                onClick={createNewChat}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Nueva conversación
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
