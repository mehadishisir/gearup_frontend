import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <div className="lg:flex">

        {/* Sidebar */}
        <Sidebar />


        {/* Main Content */}
        <div className="flex-1">

          {/* Header */}
          <DashboardHeader />


          {/* Page Content */}
          <main className="p-6">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}