
'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockProducts, type Product } from '@/lib/data';
import { PlusCircle, MinusCircle, QrCode, Bot, MessageSquare, Camera, CameraOff } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { usePathname } from 'next/navigation';

type BillItem = Product & { billQuantity: number };

export default function POSPage() {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const videoRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const pathname = usePathname();
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    // Pre-populate bill with some items
    setBillItems([
        { ...mockProducts[0], billQuantity: 2 },
        { ...mockProducts[1], billQuantity: 1 },
    ]);
  }, []);

  const addToBill = (product: Product) => {
    setBillItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, billQuantity: item.billQuantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, billQuantity: 1 }];
    });
  };
  
  const onScanSuccess = (decodedText: string) => {
    const product = mockProducts.find(p => p.sku === decodedText);
    if (product) {
      addToBill(product);
      toast({
        title: 'Item Scanned',
        description: `${product.name} added to bill.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Scan Error',
        description: `Product with SKU ${decodedText} not found.`,
      });
    }
  };

  const onScanFailure = () => {
    // We can ignore continuous scan failures.
  };

  const stopScanner = () => {
    const scanner = html5QrCodeRef.current;
    if (scanner && scanner.getState() === Html5QrcodeScannerState.SCANNING) {
        scanner.stop().then(() => {
            setIsScanning(false);
        }).catch(err => console.error("Failed to stop scanner", err));
    }
  };
  
  const startScanner = () => {
      if (videoRef.current) {
        if (!html5QrCodeRef.current) {
            html5QrCodeRef.current = new Html5Qrcode(videoRef.current.id, false);
        }

        const scanner = html5QrCodeRef.current;
        if (scanner.getState() === Html5QrcodeScannerState.SCANNING) {
            return;
        }

        scanner.start(
            { facingMode: 'environment' },
            {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            },
            onScanSuccess,
            onScanFailure
        ).then(() => {
            setHasCameraPermission(true);
            setIsScanning(true);
        }).catch(() => {
            setHasCameraPermission(false);
            setIsScanning(false);
            toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this app.',
            });
        });
      }
  }


  useEffect(() => {
    // This effect now only handles cleanup when navigating away
    return () => {
      stopScanner();
    };
  }, [pathname]);


  const removeFromBill = (productId: string) => {
    setBillItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem && existingItem.billQuantity > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, billQuantity: item.billQuantity - 1 }
            : item
        );
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const total = billItems.reduce((sum, item) => sum + item.price * item.billQuantity, 0);

  return (
    <div className="grid md:grid-cols-2 gap-4">
       <Card>
        <CardHeader>
          <CardTitle>QR Code Scanner</CardTitle>
           <CardDescription>Scan item's QR code to add to bill</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <div className="w-full max-w-sm aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
             <div id="qr-reader" ref={videoRef} className="w-full h-full object-cover"/>
          </div>
          { !hasCameraPermission && (
            <Alert variant="destructive" className="w-full max-w-sm">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature.
              </AlertDescription>
            </Alert>
          )}
          <div className="flex gap-2">
            {!isScanning ? (
                <Button size="lg" onClick={startScanner}>
                    <Camera className="mr-2 h-4 w-4"/>
                    Start Scanning
                </Button>
            ) : (
                <Button size="lg" onClick={stopScanner} variant="destructive">
                    <CameraOff className="mr-2 h-4 w-4"/>
                    Stop Scanning
                </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col gap-4">
        <Card>
            <CardHeader>
            <CardTitle>Current Bill</CardTitle>
            </CardHeader>
            <CardContent>
            {/* Mobile View */}
            <div className="grid gap-4 sm:hidden">
                {billItems.length === 0 ? (
                <p className="text-center text-muted-foreground h-24 flex items-center justify-center">
                    Scan an item to start
                </p>
                ) : (
                billItems.map((item) => (
                    <Card key={item.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                        <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded-md object-cover"
                        data-ai-hint={item.dataAiHint}
                        />
                        <div className="flex-grow space-y-2">
                        <p className="font-medium truncate">{item.name}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => removeFromBill(item.id)}>
                                <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span className="font-bold w-4 text-center">{item.billQuantity}</span>
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => addToBill(item)}>
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                            </div>
                            <p className="font-bold text-base">
                            ₹{(item.price * item.billQuantity).toFixed(2)}
                            </p>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                ))
                )}
            </div>
            
            {/* Desktop View */}
            <Table className="hidden sm:table">
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px]"></TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="w-[120px]"></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {billItems.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">Scan an item to start</TableCell>
                    </TableRow>
                ) : (
                    billItems.map((item) => (
                        <TableRow key={item.id}>
                        <TableCell>
                            <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" data-ai-hint={item.dataAiHint} />
                        </TableCell>
                        <TableCell className="font-medium truncate">{item.name}</TableCell>
                        <TableCell>{item.billQuantity}</TableCell>
                        <TableCell className="text-right">₹{(item.price * item.billQuantity).toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => addToBill(item)}>
                            <PlusCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeFromBill(item.id)}>
                            <MinusCircle className="h-4 w-4" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        
        {billItems.length > 0 && (
            <Card>
            <CardHeader>
                <CardTitle>Finalize Sale</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div className="flex justify-between items-center font-bold text-2xl pt-4 border-t mt-4">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerPhone">Customer Phone (Required)</Label>
                    <Input id="customerPhone" type="tel" inputMode="numeric" placeholder="+91-987-654-3210" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name (Optional)</Label>
                    <Input id="customerName" placeholder="John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <Button variant="outline" className="w-full" disabled={!customerPhone}><Bot className="mr-2 h-4 w-4" /> WhatsApp</Button>
                        <Button variant="outline" className="w-full" disabled={!customerPhone}><MessageSquare className="mr-2 h-4 w-4" /> SMS</Button>
                    </div>
                     <Button className="w-full" size="lg" disabled={!customerPhone}>Generate Bill</Button>
                </div>
                </div>
            </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
