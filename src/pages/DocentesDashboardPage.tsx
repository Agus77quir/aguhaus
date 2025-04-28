
import MainLayout from "@/components/MainLayout";
import DocenteDashboard from "@/components/DocenteDashboard";

const DocentesDashboardPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido al panel de gestión de docentes
          </p>
        </div>
        <DocenteDashboard />
      </div>
    </MainLayout>
  );
};

export default DocentesDashboardPage;
