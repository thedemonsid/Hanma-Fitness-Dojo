import React from "react";
import Sidebar from "@/components/sidebarcomponent"; // Adjust the import path as needed

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
