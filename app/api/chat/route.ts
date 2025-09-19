import { NextRequest, NextResponse } from 'next/server';

// URL del servicio MCP
const MCP_SERVICE_URL = process.env.MCP_SERVICE_URL || 'http://localhost:3002';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

// Función para hacer proxy al servicio MCP
async function callMCPService(message: string, history: any[] = []) {
    try {
        const response = await fetch(`${MCP_SERVICE_URL}/api/consulta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                consulta: message,
                history: history
            }),
        });

        if (!response.ok) {
            throw new Error(`Error del servicio MCP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al llamar al servicio MCP:', error);
        throw error; // Re-lanzar el error para manejo en el endpoint
    }
}

// Función para detectar si el usuario quiere un documento específico
function detectDocumentRequest(message: string): string | null {
  const documentMap: { [key: string]: string[] } = {
    'CUENTAS POR COBRAR.pdf': ['cuentas por cobrar', 'cuentas', 'cobrar', 'cobranza'],
    'ORDENES DE COMPRA.pdf': ['ordenes de compra', 'ordenes', 'compra', 'compras'],
    'PETICIONES DE OFERTA.pdf': ['peticiones de oferta', 'peticiones', 'oferta', 'ofertas']
  };

  const lowerMessage = message.toLowerCase();
  
  // Palabras clave que indican solicitud de documento
  const actionKeywords = [
    'descarga', 'adjunta', 'necesito', 'dame', 'obtener', 'documento',
    'ver', 'mostrar', 'enviar', 'compartir', 'abrir', 'archivo'
  ];
  
  // Verificar si hay una palabra de acción
  const hasAction = actionKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (hasAction) {
    for (const [filename, keywords] of Object.entries(documentMap)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return filename;
      }
    }
  }
  
  return null;
}

// Función para obtener documento en base64
async function getDocumentBase64(filename: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos/${encodeURIComponent(filename)}?format=base64`);
    if (!response.ok) {
      throw new Error(`Error al obtener documento: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener documento base64:', error);
    return null;
  }
}

// // Función simplificada para detectar intenciones de descarga
// function detectDocumentIntentSimple(message: string, history: any[] = []) {
//   const lowerMessage = message.toLowerCase();
  
//   // Palabras de confirmación
//   const confirmWords = ['si', 'sí', 'dale', 'claro', 'perfecto', 'ok', 'está bien', 'por favor'];
//   const hasConfirm = confirmWords.some(word => lowerMessage.includes(word));
  
//   // Si hay confirmación, buscar en el historial reciente
//   if (hasConfirm) {
//     const recentHistory = history.slice(-3);
//     for (const msg of recentHistory) {
//       if (msg.role === 'assistant' && msg.content) {
//         const content = msg.content.toLowerCase();
//         if (content.includes('cuentas por cobrar')) return 'CUENTAS POR COBRAR.pdf';
//         if (content.includes('ordenes de compra')) return 'ORDENES DE COMPRA.pdf';
//         if (content.includes('peticiones de oferta')) return 'PETICIONES DE OFERTA.pdf';
//       }
//     }
//   }
  
//   return null;
// }

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    // Primero intentar detección con palabras clave (rápida)
    let requestedDocument = detectDocumentRequest(message);
    console.log('🔍 Detección por palabras clave:', requestedDocument);

    // // Si no se detectó con palabras clave, usar detección simple
    // if (!requestedDocument) {
    //   console.log('🤖 Usando detección simple...');
    //   requestedDocument = detectDocumentIntentSimple(message, history);
    //   console.log('🧠 Detección simple:', requestedDocument);
    // }

    // Si se detecta una solicitud de documento, obtenerlo directamente
    if (requestedDocument) {
      console.log('📄 Obteniendo documento:', requestedDocument);
      const documentData = await getDocumentBase64(requestedDocument);
      
      if (documentData && documentData.success) {
        console.log('✅ Documento obtenido exitosamente');
        return NextResponse.json({
          message: `Aquí tienes el documento "${requestedDocument}". Puedes verlo o descargarlo usando los botones de abajo.`,
          success: true,
          source: 'LOCAL_DOCUMENT_AI',
          documentAttachment: {
            filename: documentData.filename,
            content: documentData.content,
            contentType: documentData.contentType,
            size: documentData.size,
            downloadUrl: `/api/documentos/${encodeURIComponent(requestedDocument)}`
          }
        });
      } else {
        console.log('❌ Error al obtener documento');
        return NextResponse.json({
          message: `Lo siento, ha ocurrido un error al intentar obtener el documento "${requestedDocument}". Por favor, verifica que el archivo exista e intenta de nuevo más tarde.`,
          success: true,
          source: 'LOCAL_DOCUMENT_ERROR'
        });
      }
    }

    // Si no es una solicitud de documento, usar el servicio MCP normal
    console.log('🔄 Enviando consulta al servicio MCP...');
    const mcpResponse = await callMCPService(message, history);
    
    if (mcpResponse && mcpResponse.success) {
      console.log('✅ Respuesta obtenida desde MCP');
      console.log('📋 MCP Response completa:', JSON.stringify(mcpResponse, null, 2));
      console.log('📄 Document Attachment:', mcpResponse.documentAttachment);
      console.log('📥 Download Action:', mcpResponse.downloadAction);
      
      
      return NextResponse.json({
        message: mcpResponse.respuesta,
        success: true,
        source: 'MCP', // Todo viene del servicio MCP
        mcp_metadata: {
          herramientas_usadas: mcpResponse.herramientas_usadas,
          razon: mcpResponse.razon
        },
        // Agregar información de documentos adjuntos si existe
        documentAttachment: mcpResponse.documentAttachment || null,
        downloadAction: mcpResponse.downloadAction || null
      });
    } else {
      throw new Error('Error en la respuesta del servicio MCP');
    }

  } catch (error) {
    console.error('Error en API de chat:', error);
    
    // Si el servicio MCP no está disponible, devolver error específico
    if (error instanceof Error && error.message.includes('fetch')) {
      return NextResponse.json(
        { 
          error: 'Servicio MCP no disponible. Asegúrate de que esté ejecutándose en el puerto 3002.',
          details: error.message
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
