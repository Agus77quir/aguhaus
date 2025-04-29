
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser, Session, UserProfile } from "@/types/auth";
import { toast } from "sonner";

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, nombreCompleto: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configurar el listener para cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, sessionData) => {
        setSession(sessionData as Session | null);
        
        if (sessionData && sessionData.user) {
          const userData: AuthUser = {
            id: sessionData.user.id,
            email: sessionData.user.email!
          };

          // Obtener el perfil del usuario usando setTimeout para evitar deadlocks
          // como se recomienda en la documentación de Supabase
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase
                .from("perfiles")
                .select("*")
                .eq("user_id", sessionData.user.id)
                .single();
                
              userData.profile = profile as UserProfile;
              setUser(userData);
            } catch (error) {
              console.error("Error al cargar el perfil:", error);
              setUser(userData);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Verificar si hay una sesión activa
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession as Session | null);
      
      if (currentSession && currentSession.user) {
        const userData: AuthUser = {
          id: currentSession.user.id,
          email: currentSession.user.email!
        };

        // Obtener el perfil del usuario
        supabase
          .from("perfiles")
          .select("*")
          .eq("user_id", currentSession.user.id)
          .single()
          .then(({ data: profile }) => {
            userData.profile = profile as UserProfile;
            setUser(userData);
          })
          .catch((error) => {
            console.error("Error al cargar el perfil:", error);
            setUser(userData);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Error al iniciar sesión:", error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, nombreCompleto: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre_completo: nombreCompleto,
          },
        },
      });
      
      if (error) {
        console.error("Error al registrar usuario:", error.message);
        return { success: false, error: error.message };
      }

      toast.success("¡Usuario creado con éxito! Por favor inicia sesión.");
      return { success: true };
    } catch (error: any) {
      console.error("Error al registrar usuario:", error.message);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
