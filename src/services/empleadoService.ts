
import { Empleado, EmpleadoFormData } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Function to map database employee to our app's Empleado type
const mapDbEmpleadoToEmpleado = (dbEmpleado: any): Empleado => ({
  id: dbEmpleado.id,
  nombre: dbEmpleado.nombre,
  apellido: dbEmpleado.apellido,
  email: dbEmpleado.email,
  puesto: dbEmpleado.puesto,
  departamento: dbEmpleado.departamento,
  fechaContratacion: dbEmpleado.fecha_contratacion,
  salario: dbEmpleado.salario,
  telefono: dbEmpleado.telefono || undefined,
  estado: dbEmpleado.activo ? 'activo' : 'inactivo'
});

// Function to map our app's EmpleadoFormData to database format
const mapEmpleadoFormDataToDb = (formData: EmpleadoFormData) => ({
  nombre: formData.nombre,
  apellido: formData.apellido,
  email: formData.email,
  puesto: formData.puesto,
  departamento: formData.departamento,
  fecha_contratacion: formData.fechaContratacion,
  salario: formData.salario,
  telefono: formData.telefono,
  activo: formData.estado === 'activo'
});

export const getEmpleados = async (): Promise<Empleado[]> => {
  try {
    const { data, error } = await supabase
      .from('empleados')
      .select('*')
      .order('nombre');

    if (error) {
      console.error("Error al obtener empleados:", error);
      toast.error("Error al cargar la lista de empleados");
      return [];
    }

    return data.map(mapDbEmpleadoToEmpleado);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    toast.error("Error al cargar la lista de empleados");
    return [];
  }
};

export const getEmpleadoPorId = async (id: string): Promise<Empleado | undefined> => {
  try {
    const { data, error } = await supabase
      .from('empleados')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error al obtener empleado con ID ${id}:`, error);
      toast.error("Error al obtener los datos del empleado");
      return undefined;
    }

    return mapDbEmpleadoToEmpleado(data);
  } catch (error) {
    console.error(`Error al obtener empleado con ID ${id}:`, error);
    toast.error("Error al obtener los datos del empleado");
    return undefined;
  }
};

export const crearEmpleado = async (empleado: EmpleadoFormData): Promise<Empleado> => {
  try {
    const dbEmpleado = mapEmpleadoFormDataToDb(empleado);
    
    const { data, error } = await supabase
      .from('empleados')
      .insert([dbEmpleado])
      .select()
      .single();

    if (error) {
      console.error("Error al crear empleado:", error);
      toast.error("Error al crear el empleado");
      throw error;
    }

    toast.success("Empleado creado correctamente");
    return mapDbEmpleadoToEmpleado(data);
  } catch (error) {
    console.error("Error al crear empleado:", error);
    toast.error("Error al crear el empleado");
    throw error;
  }
};

export const actualizarEmpleado = async (id: string, datosActualizados: EmpleadoFormData): Promise<Empleado> => {
  try {
    const dbEmpleado = mapEmpleadoFormDataToDb(datosActualizados);
    
    const { data, error } = await supabase
      .from('empleados')
      .update(dbEmpleado)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error al actualizar empleado con ID ${id}:`, error);
      toast.error("Error al actualizar el empleado");
      throw error;
    }

    toast.success("Empleado actualizado correctamente");
    return mapDbEmpleadoToEmpleado(data);
  } catch (error) {
    console.error(`Error al actualizar empleado con ID ${id}:`, error);
    toast.error("Error al actualizar el empleado");
    throw error;
  }
};

export const eliminarEmpleado = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('empleados')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error al eliminar empleado con ID ${id}:`, error);
      toast.error("Error al eliminar el empleado");
      throw error;
    }

    toast.success("Empleado eliminado correctamente");
  } catch (error) {
    console.error(`Error al eliminar empleado con ID ${id}:`, error);
    toast.error("Error al eliminar el empleado");
    throw error;
  }
};

export const obtenerEstadisticas = async () => {
  try {
    const { data: empleados, error } = await supabase
      .from('empleados')
      .select('*');

    if (error) {
      console.error("Error al obtener estadísticas:", error);
      toast.error("Error al cargar las estadísticas");
      throw error;
    }

    const mapEmpleados = empleados.map(mapDbEmpleadoToEmpleado);
    const activos = mapEmpleados.filter(emp => emp.estado === 'activo').length;
    const inactivos = mapEmpleados.length - activos;
    
    const departamentos = mapEmpleados.reduce((acc, emp) => {
      acc[emp.departamento] = (acc[emp.departamento] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const salarioPromedio = mapEmpleados.length > 0
      ? mapEmpleados.reduce((sum, emp) => sum + emp.salario, 0) / mapEmpleados.length
      : 0;
    
    return {
      total: mapEmpleados.length,
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
