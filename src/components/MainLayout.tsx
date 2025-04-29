
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { UserProfileMenu } from "./UserProfileMenu";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 relative">
        <div className="absolute top-4 right-4 z-10">
          <UserProfileMenu />
        </div>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
