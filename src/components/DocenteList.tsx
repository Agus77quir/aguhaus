
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDocentes,
  crearDocente,
  actualizarDocente,
  eliminarDocente,
} from "@/services/docenteService";
import { Docente, DocenteFormData } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import DocenteForm from "./DocenteForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const DocenteList = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState<Docente | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: docentes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["docentes"],
    queryFn: getDocentes,
  });

  const createMutation = useMutation({
    mutationFn: crearDocente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docentes"] });
      queryClient.invalidateQueries({ queryKey: ["estadisticas"] });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: DocenteFormData }) =>
      actualizarDocente(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docentes"] });
      queryClient.invalidateQueries({ queryKey: ["estadisticas"] });
      setIsFormOpen(false);
      setSelectedDocente(undefined);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => eliminarDocente(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docentes"] });
      queryClient.invalidateQueries({ queryKey: ["estadisticas"] });
      setIsDeleteDialogOpen(false);
      setSelectedDocente(undefined);
    },
  });

  const handleCreateDocente = (data: DocenteFormData) => {
    createMutation.mutate(data);
  };

  const handleUpdateDocente = (data: DocenteFormData) => {
    if (selectedDocente) {
      updateMutation.mutate({ id: selectedDocente.id, data });
    }
  };

  const handleDeleteDocente = () => {
    if (selectedDocente) {
      deleteMutation.mutate(selectedDocente.id);
    }
  };

  const openCreateForm = () => {
    setSelectedDocente(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (docente: Docente) => {
    setSelectedDocente(docente);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (docente: Docente) => {
    setSelectedDocente(docente);
    setIsDeleteDialogOpen(true);
  };

  const filteredDocentes = docentes.filter(
    (docente) =>
      docente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Error al cargar los datos de docentes</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar docentes..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={openCreateForm} className="whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Docente
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Docentes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Especialidad</TableHead>
                    <TableHead className="hidden lg:table-cell">Departamento</TableHead>
                    <TableHead className="hidden lg:table-cell">Salario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocentes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No se encontraron docentes
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDocentes.map((docente) => (
                      <TableRow key={docente.id}>
                        <TableCell>
                          <div className="font-medium">
                            {docente.nombre} {docente.apellido}
                          </div>
                          <div className="md:hidden text-xs text-muted-foreground mt-1">
                            {docente.especialidad}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {docente.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {docente.especialidad}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {docente.departamento}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          ${docente.salario.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "capitalize",
                              docente.activo
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            )}
                            variant="outline"
                          >
                            {docente.activo ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditForm(docente)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(docente)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <DocenteForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={selectedDocente ? handleUpdateDocente : handleCreateDocente}
        docente={selectedDocente}
        isLoading={selectedDocente ? updateMutation.isPending : createMutation.isPending}
        title={selectedDocente ? "Editar Docente" : "Nuevo Docente"}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará al docente {selectedDocente?.nombre}{" "}
              {selectedDocente?.apellido} y no podrá ser recuperado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDocente}
              className="bg-destructive text-destructive-foreground"
            >
              {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DocenteList;
