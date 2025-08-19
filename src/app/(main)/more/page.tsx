
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, Bot, Package, ChevronRight } from 'lucide-react';

const accountLinks = [
  {
    href: '/customers',
    icon: Users,
    label: 'Customers',
    description: 'View and manage your customer list.',
  },
  {
    href: '/marketing',
    icon: Bot,
    label: 'Marketing AI',
    description: 'Generate marketing campaigns with AI.',
  },
  {
    href: '/inventory',
    icon: Package,
    label: 'Inventory',
    description: 'Manage your product inventory.',
  },
];

export default function MorePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">More</h1>
      <div className="max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          {accountLinks.map((link) => (
            <Link href={link.href} key={link.href} className="no-underline">
              <Card className="hover:bg-muted/50 transition-colors h-full flex flex-col justify-between">
                <CardContent className="p-4 flex flex-col gap-3">
                    <div className="bg-secondary p-2.5 rounded-lg w-fit">
                      <link.icon className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{link.label}</p>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                </CardContent>
                <div className="p-3 pt-0">
                   <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
