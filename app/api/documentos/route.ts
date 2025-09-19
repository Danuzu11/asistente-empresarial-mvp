import { NextRequest, NextResponse } from 'next/server';

// Lista de documentos disponibles
const documentosDisponibles = [
  {
    id: 1,
    nombre: "CUENTAS POR COBRAR.pdf",
    descripcion: "Documento que contiene información sobre las cuentas por cobrar de la empresa",
    categoria: "contabilidad",
    fechaCreacion: "2024-01-15",
    tamaño: "2.5 MB",
    tipo: "pdf"
  },
  {
    id: 2,
    nombre: "ORDENES DE COMPRA.pdf",
    descripcion: "Documento con el proceso y formato de órdenes de compra",
    categoria: "compras",
    fechaCreacion: "2024-01-20",
    tamaño: "1.8 MB",
    tipo: "pdf"
  },
  {
    id: 3,
    nombre: "PETICIONES DE OFERTA.pdf",
    descripcion: "Documento que explica el proceso de peticiones de oferta",
    categoria: "compras",
    fechaCreacion: "2024-01-25",
    tamaño: "3.2 MB",
    tipo: "pdf"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const nombre = searchParams.get('nombre');

    let documentosFiltrados = [...documentosDisponibles];

    // Filtrar por categoría
    if (categoria) {
      documentosFiltrados = documentosFiltrados.filter(doc => 
        doc.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    // Filtrar por nombre (búsqueda parcial)
    if (nombre) {
      documentosFiltrados = documentosFiltrados.filter(doc => 
        doc.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        doc.descripcion.toLowerCase().includes(nombre.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: documentosFiltrados,
      total: documentosFiltrados.length,
      message: "Documentos obtenidos exitosamente"
    });

  } catch (error) {
    console.error('Error al obtener documentos:', error);
    return NextResponse.json({
      success: false,
      message: "Error interno del servidor"
    }, { status: 500 });
  }
}
