import DashboardLayout from '@/components/dashboard-layout';

export default function EmpleadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout title="Portal de Empleados" subtitle="Gestión integral para empleados">
      {children}
    </DashboardLayout>
  );
}
