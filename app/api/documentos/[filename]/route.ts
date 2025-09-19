import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const filename = decodeURIComponent((await params).filename);
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format'); // 'base64' para adjuntos, sin formato para descarga
    
    // Lista de documentos permitidos (seguridad)
    const allowedDocuments = [
      'CUENTAS POR COBRAR.pdf',
      'ORDENES DE COMPRA.pdf',
      'PETICIONES DE OFERTA.pdf'
    ];
    
    // Verificar que el archivo esté en la lista permitida
    if (!allowedDocuments.includes(filename)) {
      return NextResponse.json(
        { error: 'Documento no encontrado' },
        { status: 404 }
      );
    }
    
    // Construir la ruta del archivo desde la carpeta documentos/
    const filePath = join(process.cwd(), 'documentos', filename);
    
    // Leer el archivo
    const fileBuffer = await readFile(filePath);
    
    // Si se solicita en formato base64 (para adjuntos)
    if (format === 'base64') {
      const base64Content = fileBuffer.toString('base64');
      return NextResponse.json({
        success: true,
        filename: filename,
        content: base64Content,
        contentType: 'application/pdf',
        size: fileBuffer.length,
        message: `Documento ${filename} obtenido en formato base64`
      });
    }
    
    // Retornar el archivo con los headers apropiados para descarga directa
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error al servir documento:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
