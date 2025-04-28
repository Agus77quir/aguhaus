
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
