
import { Docente, DocenteFormData } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Función para mapear docente de la base de datos a nuestro tipo Docente
const mapDbDocenteToDocente = (dbDocente: any): Docente => ({
  id: dbDocente.id,
  nombre: dbDocente.nombre,
  apellido: dbDocente.apellido,
  email: dbDocente.email,
  especialidad: dbDocente.especialidad,
  departamento: dbDocente.departamento,
  fechaContratacion: dbDocente.fecha_contratacion,
  salario: dbDocente.salario,
  telefono: dbDocente.telefono || undefined,
  activo: dbDocente.activo
});

// Función para mapear nuestro tipo DocenteFormData al formato de la base de datos
const mapDocenteFormDataToDb = (formData: DocenteFormData) => ({
  nombre: formData.nombre,
  apellido: formData.apellido,
  email: formData.email,
  especialidad: formData.especialidad,
  departamento: formData.departamento,
  fecha_contratacion: formData.fechaContratacion,
  salario: formData.salario,
  telefono: formData.telefono,
  activo: formData.activo
});

export const getDocentes = async (): Promise<Docente[]> => {
  try {
    const { data, error } = await supabase
      .from('docentes')
      .select('*')
      .order('nombre');

    if (error) {
      console.error("Error al obtener docentes:", error);
      toast.error("Error al cargar la lista de docentes");
      return [];
    }

    return data.map(mapDbDocenteToDocente);
  } catch (error) {
    console.error("Error al obtener docentes:", error);
    toast.error("Error al cargar la lista de docentes");
    return [];
  }
};

export const getDocentePorId = async (id: string): Promise<Docente | undefined> => {
  try {
    const { data, error } = await supabase
      .from('docentes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error al obtener docente con ID ${id}:`, error);
      toast.error("Error al obtener los datos del docente");
      return undefined;
    }

    return mapDbDocenteToDocente(data);
  } catch (error) {
    console.error(`Error al obtener docente con ID ${id}:`, error);
    toast.error("Error al obtener los datos del docente");
    return undefined;
  }
};

export const crearDocente = async (docente: DocenteFormData): Promise<Docente> => {
  try {
    const dbDocente = mapDocenteFormDataToDb(docente);
    
    const { data, error } = await supabase
      .from('docentes')
      .insert([dbDocente])
      .select()
      .single();

    if (error) {
      console.error("Error al crear docente:", error);
      toast.error("Error al crear el docente");
      throw error;
    }

    toast.success("Docente creado correctamente");
    return mapDbDocenteToDocente(data);
  } catch (error) {
    console.error("Error al crear docente:", error);
    toast.error("Error al crear el docente");
    throw error;
  }
};

export const actualizarDocente = async (id: string, datosActualizados: DocenteFormData): Promise<Docente> => {
  try {
    const dbDocente = mapDocenteFormDataToDb(datosActualizados);
    
    const { data, error } = await supabase
      .from('docentes')
      .update(dbDocente)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error al actualizar docente con ID ${id}:`, error);
      toast.error("Error al actualizar el docente");
      throw error;
    }

    toast.success("Docente actualizado correctamente");
    return mapDbDocenteToDocente(data);
  } catch (error) {
    console.error(`Error al actualizar docente con ID ${id}:`, error);
    toast.error("Error al actualizar el docente");
    throw error;
  }
};

export const eliminarDocente = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('docentes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error al eliminar docente con ID ${id}:`, error);
      toast.error("Error al eliminar el docente");
      throw error;
    }

    toast.success("Docente eliminado correctamente");
  } catch (error) {
    console.error(`Error al eliminar docente con ID ${id}:`, error);
    toast.error("Error al eliminar el docente");
    throw error;
  }
};

export const obtenerEstadisticas = async () => {
  try {
    const { data: docentes, error } = await supabase
      .from('docentes')
      .select('*');

    if (error) {
      console.error("Error al obtener estadísticas:", error);
      toast.error("Error al cargar las estadísticas");
      throw error;
    }

    const docentesMapeados = docentes.map(mapDbDocenteToDocente);
    const activos = docentesMapeados.filter(doc => doc.activo).length;
    const inactivos = docentesMapeados.length - activos;
    
    const departamentos = docentesMapeados.reduce((acc, doc) => {
      acc[doc.departamento] = (acc[doc.departamento] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const salarioPromedio = docentesMapeados.length > 0
      ? docentesMapeados.reduce((sum, doc) => sum + doc.salario, 0) / docentesMapeados.length
      : 0;
    
    // Calcular distribución por especialidad
    const especialidades = docentesMapeados.reduce((acc, doc) => {
      acc[doc.especialidad] = (acc[doc.especialidad] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: docentesMapeados.length,
      activos,
      inactivos,
      departamentos,
      especialidades,
      salarioPromedio
    };
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    toast.error("Error al cargar las estadísticas");
    throw error;
  }
};
