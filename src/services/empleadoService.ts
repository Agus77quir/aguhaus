
import { Empleado, EmpleadoFormData } from "@/types";
import { toast } from "sonner";

// Mock data
let empleados: Empleado[] = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@empresa.com",
    puesto: "Desarrollador Frontend",
    departamento: "Tecnología",
    fechaContratacion: "2022-03-15",
    salario: 45000,
    telefono: "555-123-4567",
    estado: "activo",
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    email: "maria.gonzalez@empresa.com",
    puesto: "Gerente de Proyecto",
    departamento: "Administración",
    fechaContratacion: "2021-06-10",
    salario: 65000,
    telefono: "555-987-6543",
    estado: "activo",
  },
  {
    id: "3",
    nombre: "Carlos",
    apellido: "Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    puesto: "Analista de Datos",
    departamento: "Analítica",
    fechaContratacion: "2023-01-22",
    salario: 52000,
    estado: "activo",
  },
  {
    id: "4",
    nombre: "Ana",
    apellido: "Martínez",
    email: "ana.martinez@empresa.com",
    puesto: "Diseñadora UX/UI",
    departamento: "Diseño",
    fechaContratacion: "2022-09-05",
    salario: 48000,
    telefono: "555-765-4321",
    estado: "inactivo",
  },
  {
    id: "5",
    nombre: "Roberto",
    apellido: "López",
    email: "roberto.lopez@empresa.com",
    puesto: "DevOps Engineer",
    departamento: "Tecnología",
    fechaContratacion: "2021-11-18",
    salario: 58000,
    telefono: "555-345-6789",
    estado: "activo",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getEmpleados = async (): Promise<Empleado[]> => {
  try {
    // Simulate network request
    await delay(300);
    return [...empleados];
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    toast.error("Error al cargar la lista de empleados");
    return [];
  }
};

export const getEmpleadoPorId = async (id: string): Promise<Empleado | undefined> => {
  try {
    await delay(200);
    return empleados.find((emp) => emp.id === id);
  } catch (error) {
    console.error(`Error al obtener empleado con ID ${id}:`, error);
    toast.error("Error al obtener los datos del empleado");
    return undefined;
  }
};

export const crearEmpleado = async (empleado: EmpleadoFormData): Promise<Empleado> => {
  try {
    await delay(400);
    const nuevoEmpleado: Empleado = {
      ...empleado,
      id: Date.now().toString(),
    };
    empleados = [...empleados, nuevoEmpleado];
    toast.success("Empleado creado correctamente");
    return nuevoEmpleado;
  } catch (error) {
    console.error("Error al crear empleado:", error);
    toast.error("Error al crear el empleado");
    throw error;
  }
};

export const actualizarEmpleado = async (id: string, datosActualizados: EmpleadoFormData): Promise<Empleado> => {
  try {
    await delay(400);
    const index = empleados.findIndex((emp) => emp.id === id);
    
    if (index === -1) {
      throw new Error(`No se encontró empleado con ID ${id}`);
    }
    
    const empleadoActualizado: Empleado = {
      ...datosActualizados,
      id,
    };
    
    empleados = [
      ...empleados.slice(0, index),
      empleadoActualizado,
      ...empleados.slice(index + 1),
    ];
    
    toast.success("Empleado actualizado correctamente");
    return empleadoActualizado;
  } catch (error) {
    console.error(`Error al actualizar empleado con ID ${id}:`, error);
    toast.error("Error al actualizar el empleado");
    throw error;
  }
};

export const eliminarEmpleado = async (id: string): Promise<void> => {
  try {
    await delay(300);
    empleados = empleados.filter((emp) => emp.id !== id);
    toast.success("Empleado eliminado correctamente");
  } catch (error) {
    console.error(`Error al eliminar empleado con ID ${id}:`, error);
    toast.error("Error al eliminar el empleado");
    throw error;
  }
};

export const obtenerEstadisticas = async () => {
  try {
    await delay(200);
    
    const activos = empleados.filter(emp => emp.estado === 'activo').length;
    const inactivos = empleados.length - activos;
    
    const departamentos = empleados.reduce((acc, emp) => {
      acc[emp.departamento] = (acc[emp.departamento] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const salarioPromedio = empleados.length > 0
      ? empleados.reduce((sum, emp) => sum + emp.salario, 0) / empleados.length
      : 0;
    
    return {
      total: empleados.length,
      activos,
      inactivos,
      departamentos,
      salarioPromedio
    };
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    toast.error("Error al cargar las estadísticas");
    throw error;
  }
};
