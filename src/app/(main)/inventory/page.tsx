
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { mockProducts, type Product } from '@/lib/data';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      price: parseFloat(formData.get('price') as string),
      quantity: parseInt(formData.get('quantity') as string),
      image: 'https://placehold.co/100x100.png',
      dataAiHint: 'new clothing'
    };
    setProducts((prev) => [...prev, newProduct]);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddProduct}>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter the details for the new inventory item.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="sm:text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" className="sm:col-span-3" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="sku" className="sm:text-right">
                    SKU
                  </Label>
                  <Input id="sku" name="sku" className="sm:col-span-3" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="sm:text-right">
                    Price
                  </Label>
                  <Input id="price" name="price" type="number" step="0.01" className="sm:col-span-3" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="sm:text-right">
                    Quantity
                  </Label>
                  <Input id="quantity" name="quantity" type="number" className="sm:col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Product</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
       {/* Mobile View */}
      <div className="grid gap-4 sm:hidden">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className="rounded-md object-cover"
                data-ai-hint={product.dataAiHint}
              />
              <div className="flex-grow space-y-1">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                <div className="flex items-baseline justify-between">
                   <p className="font-bold">₹{product.price.toFixed(2)}</p>
                   {product.quantity > 10 ? (
                    <Badge variant="default">In Stock</Badge>
                  ) : product.quantity > 0 ? (
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">Low Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
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
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      data-ai-hint={product.dataAiHint}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>
                    {product.quantity > 10 ? (
                      <Badge variant="default">In Stock</Badge>
                    ) : product.quantity > 0 ? (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">Low Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
