
import MainLayout from "@/components/MainLayout";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido al panel de gestión de empleados
          </p>
        </div>
        <Dashboard />
      </div>
    </MainLayout>
  );
};

export default Index;
