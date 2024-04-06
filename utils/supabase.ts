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
      completed: {
        Row: {
          created_at: string
          id: number
          step_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          step_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          step_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_completed_step_id_fkey'
            columns: ['step_id']
            isOneToOne: false
            referencedRelation: 'step'
            referencedColumns: ['id']
          },
        ]
      }
      course: {
        Row: {
          created_at: string
          description: string | null
          id: number
          link_id: string | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          link_id?: string | null
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          link_id?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      lesson: {
        Row: {
          created_at: string
          id: number
          list_order: number
          module_id: number | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          list_order: number
          module_id?: number | null
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          list_order?: number
          module_id?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_lesson_module_id_fkey'
            columns: ['module_id']
            isOneToOne: false
            referencedRelation: 'module'
            referencedColumns: ['id']
          },
        ]
      }
      message: {
        Row: {
          created_at: string
          id: number
          message: string
          receiving_user_id: string
          room: string
          sender_user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string
          receiving_user_id?: string
          room: string
          sender_user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          receiving_user_id?: string
          room?: string
          sender_user_id?: string
        }
        Relationships: []
      }
      module: {
        Row: {
          course_id: number
          created_at: string
          id: number
          list_order: number
          name: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          list_order: number
          name: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          list_order?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_module_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'course'
            referencedColumns: ['id']
          },
        ]
      }
      step: {
        Row: {
          created_at: string
          id: number
          lesson_id: number
          list_order: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          lesson_id: number
          list_order: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          lesson_id?: number
          list_order?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_step_lesson_id_fkey'
            columns: ['lesson_id']
            isOneToOne: false
            referencedRelation: 'lesson'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
