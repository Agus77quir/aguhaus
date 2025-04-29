
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpenText,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Home,
  LayoutDashboard,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isMobile: boolean;
}

const SidebarLink = ({
  href,
  icon,
  label,
  isActive,
  isMobile
}: SidebarLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isMobile ? "text-base py-3" : ""
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

interface SidebarSectionProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  isMobile: boolean;
}

const SidebarSection = ({
  label,
  icon,
  children,
  isActive,
  isMobile
}: SidebarSectionProps) => {
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive]);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "text-foreground hover:bg-accent/50"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          isMobile ? "text-base py-3" : ""
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="ml-6 space-y-1">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-3 text-lg font-semibold tracking-tight">
          Gestión Académica
        </h2>
        <div className="space-y-1">
          <SidebarLink
            href="/"
            icon={<Home className="h-4 w-4" />}
            label="Inicio"
            isActive={location.pathname === "/"}
            isMobile={isMobile}
          />
          
          <SidebarSection
            label="Docentes"
            icon={<GraduationCap className="h-4 w-4" />}
            isActive={location.pathname.includes("/docentes")}
            isMobile={isMobile}
          >
            <SidebarLink
              href="/docentes/dashboard"
              icon={<LayoutDashboard className="h-4 w-4" />}
              label="Dashboard"
              isActive={location.pathname === "/docentes/dashboard"}
              isMobile={isMobile}
            />
            <SidebarLink
              href="/docentes"
              icon={<GraduationCap className="h-4 w-4" />}
              label="Lista de Docentes"
              isActive={location.pathname === "/docentes"}
              isMobile={isMobile}
            />
          </SidebarSection>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isMobile && (
        <aside className="hidden lg:flex border-r w-64 flex-col">
          <ScrollArea className="flex-1 pt-8">
            <SidebarContent />
          </ScrollArea>
        </aside>
      )}

      {isMobile && (
        <>
          <Sheet open={open} onOpenChange={setOpen}>
            <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <div className="flex-1">Gestión Académica</div>
            </div>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-16 items-center border-b px-4">
                <div className="flex-1 text-lg font-semibold">
                  Gestión Académica
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="py-4">
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
};

export default Sidebar;
