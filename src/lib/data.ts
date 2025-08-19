
export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  dataAiHint: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  totalSpend: number;
  segment: 'Frequent' | 'High-Value' | 'New';
};

export type Sale = {
  id: string;
  customerName: string;
  date: string;
  total: number;
  items: number;
};

export const mockProducts: Product[] = [
  { id: '1', name: 'Classic White Shirt', sku: 'CWS-001', price: 75.00, quantity: 50, image: 'https://placehold.co/300x300.png', dataAiHint: 'white shirt' },
  { id: '2', name: 'Slim-Fit Chinos', sku: 'SFC-002', price: 90.00, quantity: 30, image: 'https://placehold.co/300x300.png', dataAiHint: 'khaki pants' },
  { id: '3', name: 'Leather Loafers', sku: 'LL-003', price: 150.00, quantity: 15, image: 'https://placehold.co/300x300.png', dataAiHint: 'leather shoes' },
  { id: '4', name: 'Cashmere Sweater', sku: 'CS-004', price: 220.00, quantity: 8, image: 'https://placehold.co/300x300.png', dataAiHint: 'gray sweater' },
  { id: '5', name: 'Wool Blazer', sku: 'WB-005', price: 350.00, quantity: 25, image: 'https://placehold.co/300x300.png', dataAiHint: 'mens blazer' },
  { id: '6', name: 'Denim Jacket', sku: 'DJ-006', price: 120.00, quantity: 40, image: 'https://placehold.co/300x300.png', dataAiHint: 'denim jacket' },
];

export const mockCustomers: Customer[] = [
  { id: '1', name: 'John Doe', phone: '+1-202-555-0104', totalSpend: 1250.75, segment: 'High-Value' },
  { id: '2', name: 'Jane Smith', phone: '+1-202-555-0168', totalSpend: 850.50, segment: 'Frequent' },
  { id: '3', name: 'Mike Johnson', phone: '+1-202-555-0182', totalSpend: 350.00, segment: 'Frequent' },
  { id: '4', name: 'Emily Davis', phone: '+1-202-555-0151', totalSpend: 75.00, segment: 'New' },
  { id: '5', name: 'Chris Lee', phone: '+1-202-555-0199', totalSpend: 2500.00, segment: 'High-Value' },
];

export const mockSales: Sale[] = [
    { id: 'S001', customerName: 'John Doe', date: '2023-10-26', total: 225.00, items: 2 },
    { id: 'S002', customerName: 'Jane Smith', date: '2023-10-26', total: 150.00, items: 1 },
    { id: 'S003', customerName: 'Mike Johnson', date: '2023-10-25', total: 75.00, items: 1 },
    { id: 'S004', customerName: 'Chris Lee', date: '2023-10-25', total: 570.00, items: 2 },
    { id: 'S005', customerName: 'Jane Smith', date: '2023-10-24', total: 90.00, items: 1 },
];

export const mockSalesDataForChart = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 5500 },
    { name: 'Jul', revenue: 7000 },
];
