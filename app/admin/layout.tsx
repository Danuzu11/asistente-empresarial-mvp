import DashboardLayout from '@/components/dashboard-layout';
import { AdminSidebar } from '@/components/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      title="Administración"
      subtitle="Panel de control administrativo - Super Admin"
    >
      <div className="flex h-full">
        <AdminSidebar />
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
}
