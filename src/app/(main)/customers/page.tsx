
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCustomers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default function CustomersPage() {
  const segments = ['All', 'Frequent', 'High-Value', 'New'];
  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <Tabs defaultValue="All" className="flex flex-col gap-4">
        <div className="flex items-center">
          <TabsList className="overflow-x-auto">
              {segments.map(segment => (
                   <TabsTrigger key={segment} value={segment}>{segment}</TabsTrigger>
              ))}
          </TabsList>
        </div>
        {segments.map(segment => (
            <TabsContent key={segment} value={segment} className="m-0">
               {/* Mobile View */}
              <div className="grid gap-4 sm:hidden">
                  {mockCustomers
                      .filter(c => segment === 'All' || c.segment === segment)
                      .map(customer => (
                          <Card key={customer.id}>
                              <CardContent className="p-4 flex flex-col gap-2">
                                  <div className="flex justify-between items-start gap-2">
                                      <div>
                                          <p className="font-medium">{customer.name}</p>
                                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                                      </div>
                                      <Badge 
                                        variant={customer.segment === 'High-Value' ? "default" : "secondary"}
                                        className="text-xs whitespace-nowrap text-right"
                                      >
                                        {customer.segment}
                                      </Badge>
                                  </div>
                                  <div className="flex justify-between items-baseline pt-2 border-t mt-2">
                                      <span className="text-sm text-muted-foreground">Total Spend</span>
                                      <p className="font-bold text-lg">₹{customer.totalSpend.toFixed(2)}</p>
                                  </div>
                              </CardContent>
                          </Card>
                  ))}
              </div>
              {/* Desktop View */}
              <Card className="hidden sm:block">
                  <CardContent className="p-0">
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Segment</TableHead>
                                  <TableHead>Phone</TableHead>
                                  <TableHead className="text-right">Total Spend</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {mockCustomers
                                  .filter(c => segment === 'All' || c.segment === segment)
                                  .map(customer => (
                                      <TableRow key={customer.id}>
                                          <TableCell className="font-medium">{customer.name}</TableCell>
                                          <TableCell>
                                              <Badge variant={customer.segment === 'High-Value' ? "default" : "secondary"}>{customer.segment}</Badge>
                                          </TableCell>
                                          <TableCell>{customer.phone}</TableCell>
                                          <TableCell className="text-right">₹{customer.totalSpend.toFixed(2)}</TableCell>
                                      </TableRow>
                                  ))
                              }
                          </TableBody>
                      </Table>
                  </CardContent>
              </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
