
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Menu, X } from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={toggleSidebar}
        >
          <Menu />
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 bg-background/80 z-40 lg:hidden",
          collapsed ? "hidden" : "block"
        )}
        onClick={toggleSidebar}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 lg:relative",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "w-64",
          "lg:block",
          className
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <h1 className={cn("font-bold text-xl", collapsed && "lg:hidden")}>
            GestiónEmp
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground lg:flex"
            onClick={toggleSidebar}
          >
            {collapsed ? <Menu /> : <X className="lg:hidden" />}
          </Button>
        </div>

        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-sidebar-accent transition-colors",
                  location.pathname === "/" && "bg-sidebar-accent"
                )}
                onClick={() => setCollapsed(true)}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span className={cn("text-sidebar-foreground", collapsed && "lg:hidden")}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/empleados"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-sidebar-accent transition-colors",
                  (location.pathname === "/empleados" || location.pathname.startsWith("/empleados/")) && "bg-sidebar-accent"
                )}
                onClick={() => setCollapsed(true)}
              >
                <Users className="h-5 w-5" />
                <span className={cn("text-sidebar-foreground", collapsed && "lg:hidden")}>
                  Empleados
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
