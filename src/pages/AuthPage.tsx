
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const AuthPage = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Si el usuario ya está autenticado, redirigir al inicio
  if (user) {
    return <Navigate to="/" replace />;
  }

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-2">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Gestión Académica
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de administración para instituciones educativas
          </p>
        </div>
        <div className="mt-8">
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <RegisterForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
