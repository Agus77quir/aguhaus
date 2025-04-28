export interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  puesto: string;
  departamento: string;
  fechaContratacion: string;
  salario: number;
  telefono?: string;
  estado: 'activo' | 'inactivo';
}

export type EmpleadoFormData = Omit<Empleado, 'id'>;

export interface Docente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  especialidad: string;
  departamento: string;
  fechaContratacion: string;
  salario: number;
  telefono?: string;
  activo: boolean;
}

export type DocenteFormData = Omit<Docente, 'id'>;

export interface Materia {
  id: string;
  nombre: string;
  descripcion?: string;
  creditos: number;
  horasSemanales: number;
  departamento: string;
}

export type MateriaFormData = Omit<Materia, 'id'>;

export interface DocenteMateria {
  id: string;
  docenteId: string;
  materiaId: string;
  periodo: string;
}
