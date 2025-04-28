
import MainLayout from "@/components/MainLayout";
import EmpleadoList from "@/components/EmpleadoList";

const EmpleadosPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona la información de los empleados
          </p>
        </div>
        <EmpleadoList />
      </div>
    </MainLayout>
  );
};

export default EmpleadosPage;
