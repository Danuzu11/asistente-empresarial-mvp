import jsPDF from 'jspdf';

export interface CompanyData {
  name: string;
  rif: string;
  address: string;
  phone: string;
  email: string;
}

export interface AccountingEntry {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export const generateAccountingPDF = (): void => {
  // Datos ficticios de la empresa
  const companyData: CompanyData = {
    name: "TECNOLOGÍA EMPRESARIAL S.A.",
    rif: "J-12345678-9",
    address: "Av. Principal, Torre Empresarial, Piso 15, Caracas 1010",
    phone: "+58 212 555-0123",
    email: "contabilidad@tecnologiaempresarial.com"
  };

  // Datos ficticios de contabilidad
  const accountingEntries: AccountingEntry[] = [
    { date: "01/01/2024", description: "Capital inicial", debit: 0, credit: 1000000, balance: 1000000 },
    { date: "02/01/2024", description: "Compra de equipos de computación", debit: 150000, credit: 0, balance: 850000 },
    { date: "03/01/2024", description: "Pago de servicios básicos", debit: 25000, credit: 0, balance: 825000 },
    { date: "05/01/2024", description: "Venta de servicios de consultoría", debit: 0, credit: 75000, balance: 900000 },
    { date: "08/01/2024", description: "Pago de nómina", debit: 120000, credit: 0, balance: 780000 },
    { date: "10/01/2024", description: "Ingresos por licencias de software", debit: 0, credit: 45000, balance: 825000 },
    { date: "12/01/2024", description: "Gastos de marketing digital", debit: 18000, credit: 0, balance: 807000 },
    { date: "15/01/2024", description: "Venta de productos tecnológicos", debit: 0, credit: 125000, balance: 932000 },
    { date: "18/01/2024", description: "Pago de alquiler de oficina", debit: 35000, credit: 0, balance: 897000 },
    { date: "20/01/2024", description: "Ingresos por mantenimiento", debit: 0, credit: 32000, balance: 929000 },
    { date: "22/01/2024", description: "Gastos de capacitación", debit: 15000, credit: 0, balance: 914000 },
    { date: "25/01/2024", description: "Venta de servicios de desarrollo", debit: 0, credit: 180000, balance: 1094000 },
    { date: "28/01/2024", description: "Pago de seguros", debit: 12000, credit: 0, balance: 1082000 },
    { date: "30/01/2024", description: "Ingresos por soporte técnico", debit: 0, credit: 28000, balance: 1110000 }
  ];

  // Crear nuevo documento PDF
  const doc = new jsPDF();
  
  // Configuraciones del PDF

  // Configurar fuente
  doc.setFont("helvetica");

  // Título principal
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("REPORTE DE CONTABILIDAD", 105, 20, { align: "center" });

  // Información de la empresa
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(companyData.name, 20, 35);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`RIF: ${companyData.rif}`, 20, 42);
  doc.text(`Dirección: ${companyData.address}`, 20, 49);
  doc.text(`Teléfono: ${companyData.phone}`, 20, 56);
  doc.text(`Email: ${companyData.email}`, 20, 63);

  // Período del reporte
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Período: Enero 2024", 20, 75);

  // Línea separadora
  doc.line(20, 80, 190, 80);

  // Encabezados de la tabla
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Fecha", 20, 90);
  doc.text("Descripción", 45, 90);
  doc.text("Débito", 130, 90);
  doc.text("Crédito", 150, 90);
  doc.text("Saldo", 170, 90);

  // Línea debajo de encabezados
  doc.line(20, 92, 190, 92);

  // Datos de la tabla
  let yPosition = 100;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  accountingEntries.forEach((entry, index) => {
    // Verificar si necesitamos una nueva página
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
      
      // Reimprimir encabezados en nueva página
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Fecha", 20, yPosition);
      doc.text("Descripción", 45, yPosition);
      doc.text("Débito", 130, yPosition);
      doc.text("Crédito", 150, yPosition);
      doc.text("Saldo", 170, yPosition);
      doc.line(20, yPosition + 2, 190, yPosition + 2);
      yPosition = 30;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    
    // Fecha
    doc.text(entry.date, 20, yPosition);
    
    // Descripción 
    const description = entry.description.length > 25 
      ? entry.description.substring(0, 25) + "..." 
      : entry.description;
    doc.text(description, 45, yPosition);
    
    // Débito
    if (entry.debit > 0) {
      doc.text(entry.debit.toLocaleString('es-VE', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0 
      }), 130, yPosition);
    }
    
    // Crédito
    if (entry.credit > 0) {
      doc.text(entry.credit.toLocaleString('es-VE', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0 
      }), 150, yPosition);
    }
    
    // Saldo
    doc.text(entry.balance.toLocaleString('es-VE', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }), 170, yPosition);

    yPosition += 8;
  });

  // Línea final
  doc.line(20, yPosition, 190, yPosition);

  // Resumen al final
  yPosition += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  
  const totalDebits = accountingEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredits = accountingEntries.reduce((sum, entry) => sum + entry.credit, 0);
  const finalBalance = accountingEntries[accountingEntries.length - 1].balance;

  doc.text("RESUMEN:", 20, yPosition);
  yPosition += 8;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Total Débitos: ${totalDebits.toLocaleString('es-VE', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0 
  })}`, 20, yPosition);
  
  yPosition += 6;
  doc.text(`Total Créditos: ${totalCredits.toLocaleString('es-VE', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0 
  })}`, 20, yPosition);
  
  yPosition += 6;
  doc.setFont("helvetica", "bold");
  doc.text(`Saldo Final: ${finalBalance.toLocaleString('es-VE', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0 
  })}`, 20, yPosition);

  // Pie de página
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`Página ${i} de ${pageCount}`, 105, 285, { align: "center" });
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-VE')}`, 20, 285);
  }

  // Descargar el PDF
  doc.save(`reporte-contabilidad-${companyData.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`);
};
