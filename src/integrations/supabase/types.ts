export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categorias: {
        Row: {
          created_at: string | null
          descripcion: string | null
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string | null
          descripcion?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      clientes: {
        Row: {
          apellido: string
          created_at: string | null
          direccion: string | null
          email: string | null
          id: string
          nombre: string
          rfc: string | null
          telefono: string | null
          tipo: string
          updated_at: string | null
        }
        Insert: {
          apellido: string
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          id?: string
          nombre: string
          rfc?: string | null
          telefono?: string | null
          tipo?: string
          updated_at?: string | null
        }
        Update: {
          apellido?: string
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          id?: string
          nombre?: string
          rfc?: string | null
          telefono?: string | null
          tipo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string
          notes: string | null
          phone: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name: string
          notes?: string | null
          phone: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string
          notes?: string | null
          phone?: string
        }
        Relationships: []
      }
      detalle_ventas: {
        Row: {
          cantidad: number
          created_at: string | null
          descuento: number
          id: string
          precio_unitario: number
          producto_id: string
          subtotal: number
          venta_id: string
        }
        Insert: {
          cantidad: number
          created_at?: string | null
          descuento?: number
          id?: string
          precio_unitario: number
          producto_id: string
          subtotal: number
          venta_id: string
        }
        Update: {
          cantidad?: number
          created_at?: string | null
          descuento?: number
          id?: string
          precio_unitario?: number
          producto_id?: string
          subtotal?: number
          venta_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "detalle_ventas_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "detalle_ventas_venta_id_fkey"
            columns: ["venta_id"]
            isOneToOne: false
            referencedRelation: "ventas"
            referencedColumns: ["id"]
          },
        ]
      }
      empleados: {
        Row: {
          activo: boolean | null
          apellido: string
          ciudad: string | null
          codigo_postal: string | null
          created_at: string | null
          departamento: string
          direccion: string | null
          email: string
          estado: string | null
          fecha_contratacion: string
          id: string
          nombre: string
          notas: string | null
          puesto: string
          salario: number
          telefono: string | null
          user_id: string | null
        }
        Insert: {
          activo?: boolean | null
          apellido: string
          ciudad?: string | null
          codigo_postal?: string | null
          created_at?: string | null
          departamento: string
          direccion?: string | null
          email: string
          estado?: string | null
          fecha_contratacion: string
          id?: string
          nombre: string
          notas?: string | null
          puesto: string
          salario: number
          telefono?: string | null
          user_id?: string | null
        }
        Update: {
          activo?: boolean | null
          apellido?: string
          ciudad?: string | null
          codigo_postal?: string | null
          created_at?: string | null
          departamento?: string
          direccion?: string | null
          email?: string
          estado?: string | null
          fecha_contratacion?: string
          id?: string
          nombre?: string
          notas?: string | null
          puesto?: string
          salario?: number
          telefono?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      Lovaemple: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      perfiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          nombre_completo: string
          rol: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          nombre_completo: string
          rol?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          nombre_completo?: string
          rol?: string | null
          user_id?: string
        }
        Relationships: []
      }
      productos: {
        Row: {
          categoria_id: string | null
          codigo: string
          created_at: string | null
          descripcion: string | null
          estado: string
          id: string
          imagen_url: string | null
          nombre: string
          precio_compra: number
          precio_venta: number
          proveedor_id: string | null
          stock_actual: number
          stock_minimo: number
          updated_at: string | null
        }
        Insert: {
          categoria_id?: string | null
          codigo: string
          created_at?: string | null
          descripcion?: string | null
          estado?: string
          id?: string
          imagen_url?: string | null
          nombre: string
          precio_compra: number
          precio_venta: number
          proveedor_id?: string | null
          stock_actual?: number
          stock_minimo?: number
          updated_at?: string | null
        }
        Update: {
          categoria_id?: string | null
          codigo?: string
          created_at?: string | null
          descripcion?: string | null
          estado?: string
          id?: string
          imagen_url?: string | null
          nombre?: string
          precio_compra?: number
          precio_venta?: number
          proveedor_id?: string | null
          stock_actual?: number
          stock_minimo?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "productos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "productos_proveedor_id_fkey"
            columns: ["proveedor_id"]
            isOneToOne: false
            referencedRelation: "proveedores"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          stock: number
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
          stock?: number
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          stock?: number
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      proveedores: {
        Row: {
          contacto: string | null
          created_at: string | null
          direccion: string | null
          email: string | null
          id: string
          nombre: string
          notas: string | null
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          contacto?: string | null
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          id?: string
          nombre: string
          notas?: string | null
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          contacto?: string | null
          created_at?: string | null
          direccion?: string | null
          email?: string | null
          id?: string
          nombre?: string
          notas?: string | null
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          apellido: string
          created_at: string | null
          id: string
          nombre: string
          rol: string
          ultimo_acceso: string | null
        }
        Insert: {
          apellido: string
          created_at?: string | null
          id: string
          nombre: string
          rol: string
          ultimo_acceso?: string | null
        }
        Update: {
          apellido?: string
          created_at?: string | null
          id?: string
          nombre?: string
          rol?: string
          ultimo_acceso?: string | null
        }
        Relationships: []
      }
      ventas: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          descuento: number
          estado: string
          fecha: string | null
          folio: string
          id: string
          iva: number
          metodo_pago: string
          notas: string | null
          subtotal: number
          total: number
          usuario_id: string | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          descuento?: number
          estado?: string
          fecha?: string | null
          folio: string
          id?: string
          iva: number
          metodo_pago: string
          notas?: string | null
          subtotal: number
          total: number
          usuario_id?: string | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          descuento?: number
          estado?: string
          fecha?: string | null
          folio?: string
          id?: string
          iva?: number
          metodo_pago?: string
          notas?: string | null
          subtotal?: number
          total?: number
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ventas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ventas_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_complete_schema: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
