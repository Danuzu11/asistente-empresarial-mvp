'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Plus, 
  MoreVertical, 
  User, 
  Bot, 
  ArrowLeft,
  MessageSquare,
  Trash2,
  Edit3,
  FileText
} from 'lucide-react';
import { generateAccountingPDF } from '@/lib/pdfGenerator';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
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

    // Verificar si el usuario escribió "PDF"
    const isPDFRequest = inputMessage.toLowerCase().includes('pdf');

    // Simular respuesta de IA 
    setTimeout(() => {
      let assistantContent: string;
      
      if (isPDFRequest) {
        // Generar PDF
        try {
          generateAccountingPDF();
          assistantContent = `¡Perfecto! He generado un reporte de contabilidad en PDF para ti. El documento incluye:\n\n📊 **Datos de la empresa:** TECNOLOGÍA EMPRESARIAL S.A.\n📋 **RIF:** J-12345678-9\n📅 **Período:** Enero 2024\n💰 **Movimientos contables:** 14 transacciones\n📈 **Saldo final:** $1,110,000\n\nEl archivo se está descargando automáticamente. ¿Necesitas algún otro tipo de reporte o documento?`;
        } catch (error) {
          assistantContent = `Disculpa, hubo un error al generar el PDF. Por favor, inténtalo de nuevo.`;
        }
      } else {
        assistantContent = `Hola! Soy tu asistente empresarial. Recibí tu mensaje: "${inputMessage}". Por ahora estoy en modo de demostración, pero pronto podré ayudarte con tareas empresariales específicas como análisis de datos, gestión de proyectos, y más. ¿En qué más puedo ayudarte?`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: assistantContent,
        role: 'assistant',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      const finalChat = { ...updatedChat, messages: finalMessages };
      
      setCurrentChat(finalChat);
      setIsLoading(false);

      // Actualizar lista de chats
      const updatedChats = chats.map(chat => 
        chat.id === currentChat.id ? finalChat : chat
      );
      setChats(updatedChats);
      localStorage.setItem('chats', JSON.stringify(updatedChats));
    }, isPDFRequest ? 2000 : 1500);
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
                    Asistente Empresarial IA
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
                    <p className="text-gray-500">
                      Escribe tu primera pregunta o solicitud
                    </p>
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
            </div>

            {/* Input area */}
            <div className="bg-gray-800 border-t border-gray-700 p-4">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu mensaje aquí... (escribe 'PDF' para generar un reporte)"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={() => {
                    setInputMessage('PDF');
                    setTimeout(() => sendMessage(), 100);
                  }}
                  disabled={isLoading}
                  className="px-3 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  title="Generar PDF de contabilidad"
                >
                  <FileText className="w-4 h-4" />
                </button>
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
