import { NextRequest, NextResponse } from 'next/server';

// Datos de ejemplo de empleados
const empleados = [
  {
    id: 1,
    nombre: "Juan Pérez",
    cargo: "Desarrollador Senior",
    departamento: "Tecnología",
    email: "juan.perez@empresa.com",
    telefono: "+57 300 123 4567",
    fechaIngreso: "2022-01-15",
    salario: 5000000,
    estado: "activo"
  },
  {
    id: 2,
    nombre: "María García",
    cargo: "Gerente de Ventas",
    departamento: "Ventas",
    email: "maria.garcia@empresa.com",
    telefono: "+57 300 234 5678",
    fechaIngreso: "2021-03-20",
    salario: 6000000,
    estado: "activo"
  },
  {
    id: 3,
    nombre: "Carlos López",
    cargo: "Analista de Recursos Humanos",
    departamento: "RRHH",
    email: "carlos.lopez@empresa.com",
    telefono: "+57 300 345 6789",
    fechaIngreso: "2023-06-10",
    salario: 4500000,
    estado: "activo"
  },
  {
    id: 4,
    nombre: "Ana Rodríguez",
    cargo: "Contadora",
    departamento: "Contabilidad",
    email: "ana.rodriguez@empresa.com",
    telefono: "+57 300 456 7890",
    fechaIngreso: "2020-11-05",
    salario: 4800000,
    estado: "activo"
  },
  {
    id: 5,
    nombre: "Luis Martínez",
    cargo: "Diseñador UX/UI",
    departamento: "Tecnología",
    email: "luis.martinez@empresa.com",
    telefono: "+57 300 567 8901",
    fechaIngreso: "2023-02-28",
    salario: 4200000,
    estado: "activo"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const departamento = searchParams.get('departamento');
    const estado = searchParams.get('estado');

    let empleadosFiltrados = [...empleados];

    // Filtrar por ID si se proporciona
    if (id) {
      const empleado = empleados.find(emp => emp.id === parseInt(id));
      if (empleado) {
        return NextResponse.json({
          success: true,
          data: empleado,
          message: "Empleado encontrado"
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Empleado no encontrado"
        }, { status: 404 });
      }
    }

    // Filtrar por departamento
    if (departamento) {
      empleadosFiltrados = empleadosFiltrados.filter(emp => 
        emp.departamento.toLowerCase().includes(departamento.toLowerCase())
      );
    }

    // Filtrar por estado
    if (estado) {
      empleadosFiltrados = empleadosFiltrados.filter(emp => 
        emp.estado.toLowerCase() === estado.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      data: empleadosFiltrados,
      total: empleadosFiltrados.length,
      message: "Empleados obtenidos exitosamente"
    });

  } catch (error) {
    console.error('Error al obtener empleados:', error);
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
    if (!body.nombre || !body.cargo || !body.departamento || !body.email) {
      return NextResponse.json({
        success: false,
        message: "Faltan campos requeridos: nombre, cargo, departamento, email"
      }, { status: 400 });
    }

    // Crear nuevo empleado
    const nuevoEmpleado = {
      id: empleados.length + 1,
      nombre: body.nombre,
      cargo: body.cargo,
      departamento: body.departamento,
      email: body.email,
      telefono: body.telefono || "",
      fechaIngreso: new Date().toISOString().split('T')[0],
      salario: body.salario || 0,
      estado: "activo"
    };

    empleados.push(nuevoEmpleado);

    return NextResponse.json({
      success: true,
      data: nuevoEmpleado,
      message: "Empleado creado exitosamente"
    }, { status: 201 });

  } catch (error) {
    console.error('Error al crear empleado:', error);
    return NextResponse.json({
      success: false,
      message: "Error interno del servidor"
    }, { status: 500 });
  }
}
