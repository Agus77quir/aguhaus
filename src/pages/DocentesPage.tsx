
import MainLayout from "@/components/MainLayout";
import DocenteList from "@/components/DocenteList";

const DocentesPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Docentes</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona la información de los docentes
          </p>
        </div>
        <DocenteList />
      </div>
    </MainLayout>
  );
};

export default DocentesPage;
