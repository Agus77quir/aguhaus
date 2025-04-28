
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
} from "@/services/empleadoService";
import { Empleado, EmpleadoFormData } from "@/types";
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
import EmpleadoForm from "./EmpleadoForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const EmpleadoList = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: empleados = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["empleados"],
    queryFn: getEmpleados,
  });

  const createMutation = useMutation({
    mutationFn: crearEmpleado,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] });
      queryClient.invalidateQueries({ queryKey: ["estadisticas"] });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EmpleadoFormData }) =>
      actualizarEmpleado(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] });
      queryClient.invalidateQueries({ queryKey: ["estadisticas"] });
      setIsFormOpen(false);
      setSelectedEmpleado(undefined);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => eliminarEmpleado(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] });
      queryClient.invalidateQueries({ queryKey: ["estadisticas"] });
      setIsDeleteDialogOpen(false);
      setSelectedEmpleado(undefined);
    },
  });

  const handleCreateEmpleado = (data: EmpleadoFormData) => {
    createMutation.mutate(data);
  };

  const handleUpdateEmpleado = (data: EmpleadoFormData) => {
    if (selectedEmpleado) {
      updateMutation.mutate({ id: selectedEmpleado.id, data });
    }
  };

  const handleDeleteEmpleado = () => {
    if (selectedEmpleado) {
      deleteMutation.mutate(selectedEmpleado.id);
    }
  };

  const openCreateForm = () => {
    setSelectedEmpleado(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (empleado: Empleado) => {
    setSelectedEmpleado(empleado);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (empleado: Empleado) => {
    setSelectedEmpleado(empleado);
    setIsDeleteDialogOpen(true);
  };

  const filteredEmpleados = empleados.filter(
    (empleado) =>
      empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.puesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empleado.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Error al cargar los datos de empleados</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar empleados..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={openCreateForm} className="whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Empleados</CardTitle>
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
                    <TableHead className="hidden md:table-cell">Puesto</TableHead>
                    <TableHead className="hidden lg:table-cell">Departamento</TableHead>
                    <TableHead className="hidden lg:table-cell">Salario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmpleados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No se encontraron empleados
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmpleados.map((empleado) => (
                      <TableRow key={empleado.id}>
                        <TableCell>
                          <div className="font-medium">
                            {empleado.nombre} {empleado.apellido}
                          </div>
                          <div className="md:hidden text-xs text-muted-foreground mt-1">
                            {empleado.puesto}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {empleado.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {empleado.puesto}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {empleado.departamento}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          ${empleado.salario.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "capitalize",
                              empleado.estado === "activo"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            )}
                            variant="outline"
                          >
                            {empleado.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditForm(empleado)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteDialog(empleado)}
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

      <EmpleadoForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={selectedEmpleado ? handleUpdateEmpleado : handleCreateEmpleado}
        empleado={selectedEmpleado}
        isLoading={selectedEmpleado ? updateMutation.isPending : createMutation.isPending}
        title={selectedEmpleado ? "Editar Empleado" : "Nuevo Empleado"}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará al empleado {selectedEmpleado?.nombre}{" "}
              {selectedEmpleado?.apellido} y no podrá ser recuperado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEmpleado}
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

export default EmpleadoList;
