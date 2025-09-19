import { NextRequest, NextResponse } from 'next/server';

// Datos de ejemplo de proveedores
const proveedores = [
  {
    id: 1,
    nombre: "Proveedor Tecnológico S.A.S",
    nit: "900111222-1",
    contacto: "Roberto Silva",
    email: "roberto.silva@provtech.com",
    telefono: "+57 1 111 2222",
    direccion: "Calle 100 #11-22, Bogotá",
    tipoServicio: "tecnologia",
    categoria: "software",
    fechaRegistro: "2022-08-15",
    estado: "activo",
    calificacion: 4.8,
    productosServicios: ["Desarrollo de software", "Consultoría IT", "Soporte técnico"]
  },
  {
    id: 2,
    nombre: "Suministros Industriales Ltda",
    nit: "800333444-2",
    contacto: "Patricia López",
    email: "patricia.lopez@suministrosind.com",
    telefono: "+57 1 333 4444",
    direccion: "Carrera 50 #33-44, Medellín",
    tipoServicio: "suministros",
    categoria: "industrial",
    fechaRegistro: "2021-12-10",
    estado: "activo",
    calificacion: 4.5,
    productosServicios: ["Equipos industriales", "Repuestos", "Mantenimiento"]
  },
  {
    id: 3,
    nombre: "Servicios de Limpieza Express",
    nit: "900555666-3",
    contacto: "Miguel Torres",
    email: "miguel.torres@limpiezaexpress.com",
    telefono: "+57 1 555 6666",
    direccion: "Avenida 68 #55-66, Cali",
    tipoServicio: "servicios",
    categoria: "limpieza",
    fechaRegistro: "2023-02-20",
    estado: "activo",
    calificacion: 4.2,
    productosServicios: ["Limpieza general", "Limpieza especializada", "Mantenimiento"]
  },
  {
    id: 4,
    nombre: "Consultoría Empresarial Pro",
    nit: "800777888-4",
    contacto: "Sandra Jiménez",
    email: "sandra.jimenez@consultoriapro.com",
    telefono: "+57 1 777 8888",
    direccion: "Calle 80 #77-88, Barranquilla",
    tipoServicio: "consultoria",
    categoria: "empresarial",
    fechaRegistro: "2020-06-05",
    estado: "activo",
    calificacion: 4.9,
    productosServicios: ["Consultoría estratégica", "Capacitación", "Auditorías"]
  },
  {
    id: 5,
    nombre: "Equipos de Oficina Total",
    nit: "900999000-5",
    contacto: "Andrés Ramírez",
    email: "andres.ramirez@oficinatotal.com",
    telefono: "+57 1 999 0000",
    direccion: "Carrera 30 #99-00, Bucaramanga",
    tipoServicio: "equipos",
    categoria: "oficina",
    fechaRegistro: "2023-04-12",
    estado: "inactivo",
    calificacion: 3.8,
    productosServicios: ["Muebles de oficina", "Equipos de cómputo", "Accesorios"]
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const tipoServicio = searchParams.get('tipoServicio');
    const categoria = searchParams.get('categoria');
    const estado = searchParams.get('estado');
    const nombre = searchParams.get('nombre');

    let proveedoresFiltrados = [...proveedores];

    // Filtrar por ID si se proporciona
    if (id) {
      const proveedor = proveedores.find(prov => prov.id === parseInt(id));
      if (proveedor) {
        return NextResponse.json({
          success: true,
          data: proveedor,
          message: "Proveedor encontrado"
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Proveedor no encontrado"
        }, { status: 404 });
      }
    }

    // Filtrar por tipo de servicio
    if (tipoServicio) {
      proveedoresFiltrados = proveedoresFiltrados.filter(prov => 
        prov.tipoServicio.toLowerCase() === tipoServicio.toLowerCase()
      );
    }

    // Filtrar por categoría
    if (categoria) {
      proveedoresFiltrados = proveedoresFiltrados.filter(prov => 
        prov.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    // Filtrar por estado
    if (estado) {
      proveedoresFiltrados = proveedoresFiltrados.filter(prov => 
        prov.estado.toLowerCase() === estado.toLowerCase()
      );
    }

    // Filtrar por nombre (búsqueda parcial)
    if (nombre) {
      proveedoresFiltrados = proveedoresFiltrados.filter(prov => 
        prov.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        prov.contacto.toLowerCase().includes(nombre.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: proveedoresFiltrados,
      total: proveedoresFiltrados.length,
      message: "Proveedores obtenidos exitosamente"
    });

  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    return NextResponse.json({
      success: false,
      message: "Error interno del servidor"
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos requeridos
    if (!body.nombre || !body.nit || !body.contacto || !body.email) {
      return NextResponse.json({
        success: false,
        message: "Faltan campos requeridos: nombre, nit, contacto, email"
      }, { status: 400 });
    }

    // Crear nuevo proveedor
    const nuevoProveedor = {
      id: proveedores.length + 1,
      nombre: body.nombre,
      nit: body.nit,
      contacto: body.contacto,
      email: body.email,
      telefono: body.telefono || "",
      direccion: body.direccion || "",
      tipoServicio: body.tipoServicio || "servicios",
      categoria: body.categoria || "general",
      fechaRegistro: new Date().toISOString().split('T')[0],
      estado: "activo",
      calificacion: body.calificacion || 0,
      productosServicios: body.productosServicios || []
    };

    proveedores.push(nuevoProveedor);

    return NextResponse.json({
      success: true,
      data: nuevoProveedor,
      message: "Proveedor creado exitosamente"
    }, { status: 201 });

  } catch (error) {
    console.error('Error al crear proveedor:', error);
    return NextResponse.json({
      success: false,
      message: "Error interno del servidor"
    }, { status: 500 });
  }
}
