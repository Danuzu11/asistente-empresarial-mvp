import { NextRequest, NextResponse } from 'next/server';

// Datos de ejemplo de clientes
const clientes = [
  {
    id: 1,
    nombre: "Empresa ABC S.A.S",
    nit: "900123456-1",
    contacto: "Carlos Mendoza",
    email: "carlos.mendoza@empresaabc.com",
    telefono: "+57 1 234 5678",
    direccion: "Calle 123 #45-67, Bogotá",
    tipoCliente: "corporativo",
    fechaRegistro: "2023-01-15",
    estado: "activo",
    facturacionMensual: 15000000
  },
  {
    id: 2,
    nombre: "Comercial XYZ Ltda",
    nit: "800987654-2",
    contacto: "María González",
    email: "maria.gonzalez@comercialxyz.com",
    telefono: "+57 1 345 6789",
    direccion: "Carrera 45 #78-90, Medellín",
    tipoCliente: "corporativo",
    fechaRegistro: "2023-03-20",
    estado: "activo",
    facturacionMensual: 8500000
  },
  {
    id: 3,
    nombre: "Juan Pérez",
    nit: "12345678",
    contacto: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+57 300 123 4567",
    direccion: "Calle 67 #12-34, Cali",
    tipoCliente: "natural",
    fechaRegistro: "2023-05-10",
    estado: "activo",
    facturacionMensual: 2500000
  },
  {
    id: 4,
    nombre: "Distribuidora Norte S.A",
    nit: "900555666-3",
    contacto: "Ana Rodríguez",
    email: "ana.rodriguez@distribuidoranorte.com",
    telefono: "+57 1 456 7890",
    direccion: "Avenida 80 #23-45, Barranquilla",
    tipoCliente: "corporativo",
    fechaRegistro: "2022-11-05",
    estado: "activo",
    facturacionMensual: 22000000
  },
  {
    id: 5,
    nombre: "Luis Martínez",
    nit: "98765432",
    contacto: "Luis Martínez",
    email: "luis.martinez@email.com",
    telefono: "+57 300 567 8901",
    direccion: "Calle 90 #56-78, Bucaramanga",
    tipoCliente: "natural",
    fechaRegistro: "2023-07-15",
    estado: "inactivo",
    facturacionMensual: 0
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const tipoCliente = searchParams.get('tipoCliente');
    const estado = searchParams.get('estado');
    const nombre = searchParams.get('nombre');

    let clientesFiltrados = [...clientes];

    // Filtrar por ID si se proporciona
    if (id) {
      const cliente = clientes.find(cli => cli.id === parseInt(id));
      if (cliente) {
        return NextResponse.json({
          success: true,
          data: cliente,
          message: "Cliente encontrado"
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Cliente no encontrado"
        }, { status: 404 });
      }
    }

    // Filtrar por tipo de cliente
    if (tipoCliente) {
      clientesFiltrados = clientesFiltrados.filter(cli => 
        cli.tipoCliente.toLowerCase() === tipoCliente.toLowerCase()
      );
    }

    // Filtrar por estado
    if (estado) {
      clientesFiltrados = clientesFiltrados.filter(cli => 
        cli.estado.toLowerCase() === estado.toLowerCase()
      );
    }

    // Filtrar por nombre (búsqueda parcial)
    if (nombre) {
      clientesFiltrados = clientesFiltrados.filter(cli => 
        cli.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        cli.contacto.toLowerCase().includes(nombre.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: clientesFiltrados,
      total: clientesFiltrados.length,
      message: "Clientes obtenidos exitosamente"
    });

  } catch (error) {
    console.error('Error al obtener clientes:', error);
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

    // Crear nuevo cliente
    const nuevoCliente = {
      id: clientes.length + 1,
      nombre: body.nombre,
      nit: body.nit,
      contacto: body.contacto,
      email: body.email,
      telefono: body.telefono || "",
      direccion: body.direccion || "",
      tipoCliente: body.tipoCliente || "natural",
      fechaRegistro: new Date().toISOString().split('T')[0],
      estado: "activo",
      facturacionMensual: body.facturacionMensual || 0
    };

    clientes.push(nuevoCliente);

    return NextResponse.json({
      success: true,
      data: nuevoCliente,
      message: "Cliente creado exitosamente"
    }, { status: 201 });

  } catch (error) {
    console.error('Error al crear cliente:', error);
    return NextResponse.json({
      success: false,
      message: "Error interno del servidor"
    }, { status: 500 });
  }
}
