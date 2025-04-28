
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import EmpleadosPage from "./pages/EmpleadosPage";
import DocentesPage from "./pages/DocentesPage";
import DocentesDashboardPage from "./pages/DocentesDashboardPage";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/empleados" element={<EmpleadosPage />} />
            <Route path="/docentes" element={<DocentesPage />} />
            <Route path="/docentes/dashboard" element={<DocentesDashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
