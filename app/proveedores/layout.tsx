import DashboardLayout from '@/components/dashboard-layout';

export default function ProveedoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      title="Proveedores"
      subtitle="Gestión integral de proveedores"
    >
      {children}
    </DashboardLayout>
  );
}
