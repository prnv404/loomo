
'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockSales, mockCustomers, mockProducts } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default function InvoiceDetailPage() {
  const params = useParams();
  const { id } = params;

  const sale = mockSales.find((s) => s.id === id);
  const customer = mockCustomers.find((c) => c.name === sale?.customerName);

  // In a real app, you would fetch the line items for the sale.
  // For this mock, we'll just show a couple of random products.
  const lineItems = mockProducts.slice(0, sale?.items || 2).map(p => ({...p, billQuantity: 1}));

  if (!sale) {
    return <div>Invoice not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div>
              <CardTitle>Invoice {sale.id}</CardTitle>
              <CardDescription>{sale.date}</CardDescription>
            </div>
             {customer && (
              <div className="text-sm text-muted-foreground text-left sm:text-right">
                <p className="font-semibold text-foreground">{customer.name}</p>
                <p>{customer.phone}</p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
            <Separator className="my-4" />
             <h3 className="text-lg font-semibold mb-2">Items Purchased</h3>
             {/* Mobile View */}
            <div className="grid gap-2 sm:hidden">
                {lineItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-muted/50">
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-muted-foreground">Qty: {item.billQuantity}</p>
                        </div>
                        <p className="font-medium">₹{(item.price * item.billQuantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* Desktop View */}
            <Table className="hidden sm:table">
                <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {lineItems.map((item) => (
                    <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell className="text-center">{item.billQuantity}</TableCell>
                    <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">₹{(item.price * item.billQuantity).toFixed(2)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            <Separator className="my-4" />

            <div className="flex justify-end">
                <div className="grid gap-2 text-sm w-full sm:w-auto sm:min-w-[200px]">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{sale.total.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (0%)</span>
                        <span>₹0.00</span>
                    </div>
                    <Separator />
                     <div className="flex justify-between font-bold text-base">
                        <span>Total</span>
                        <span>₹{sale.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
