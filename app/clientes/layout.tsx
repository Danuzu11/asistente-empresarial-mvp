import DashboardLayout from '@/components/dashboard-layout';

export default function ClientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      title="Clientes"
      subtitle="Portal integral para clientes"
    >
      {children}
    </DashboardLayout>
  );
}
