
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  // Si está cargando, no renderizamos nada aún
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Si hay usuario, renderizar el contenido protegido
  return <Outlet />;
};
