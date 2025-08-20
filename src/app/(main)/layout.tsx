
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, QrCode, Users, FileText, UserCircle, MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { LoomoLogo } from '@/components/logo';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/pos', icon: QrCode, label: 'POS' },
  { href: '/invoices', icon: FileText, label: 'Invoices' },
  { href: '/more', icon: MoreHorizontal, label: 'More' },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-2">
            <LoomoLogo className="h-6 w-6" />
          <h1 className="text-lg font-bold tracking-tight">LOOMO</h1>
        </div>

        <div className="relative ml-auto flex items-center gap-2 md:grow-0">
          <ThemeSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full w-8 h-8"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/32x32.png" alt="User" data-ai-hint="male portrait" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <main className="flex-1 items-start gap-4 p-2 sm:px-4 md:gap-4 pb-20 sm:pb-4">
            {children}
        </main>
      </div>
       <nav className="fixed bottom-0 left-0 right-0 z-10 border-t bg-card text-card-foreground sm:hidden">
          <div className="mx-auto grid max-w-screen-sm h-16 grid-cols-4 items-center justify-center gap-2 px-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
            {navItems.map((item) => (
                <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center rounded-lg p-2 text-xs transition-colors ${
                    pathname === item.href || (item.href === '/more' && ['/customers', '/marketing', '/inventory', '/accounts'].includes(pathname))
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
                >
                <item.icon className="h-5 w-5 mb-1" />
                <span>{item.label}</span>
                </Link>
            ))}
            </div>
        </nav>
    </div>
  );
}
