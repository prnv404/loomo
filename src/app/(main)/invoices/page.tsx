
import Link from 'next/link';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockSales, mockCustomers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function InvoicesPage() {

  const salesWithCustomerData = mockSales.map(sale => {
    const customer = mockCustomers.find(c => c.name === sale.customerName);
    return {
      ...sale,
      customerPhone: customer?.phone || 'N/A',
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Invoices</h1>

       {/* Mobile View */}
      <div className="grid gap-2 sm:hidden">
        {salesWithCustomerData.map((sale) => (
          <Card key={sale.id}>
             <Link href={`/invoices/${sale.id}`} className="text-current no-underline">
                <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="font-semibold">{sale.customerName}</span>
                            <span className="text-xs text-muted-foreground">
                                {sale.customerPhone}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                ID: {sale.id} &bull; {sale.date}
                            </span>
                        </div>
                        <div className="text-right flex items-center gap-2">
                            <div>
                                <p className="font-bold text-base">₹{sale.total.toFixed(2)}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </CardContent>
             </Link>
          </Card>
        ))}
      </div>

       {/* Desktop View */}
      <Card className="hidden sm:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesWithCustomerData.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.customerName}</TableCell>
                  <TableCell>{sale.customerPhone}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell className="text-right">₹{sale.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                        <Link href={`/invoices/${sale.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
