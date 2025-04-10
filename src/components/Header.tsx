'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Mode opératoire', href: '#services' },
    { label: 'Mila Barton', href: '#entreprise' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Devis', href: '#quickquote' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0.5, 1 - scrollY / 300); // Adjust the divisor for desired effect
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`py-4 fixed w-full top-0 z-50 shadow-sm transition-opacity duration-300 bg-black`} style={{ opacity }}>
      <div className="container-custom flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo/logov2-1.svg" 
              alt="Logo" 
              width={80} // Adjusted width for smaller screens
              height={40} // Adjusted height for smaller screens
              className="md:w-24 md:h-12" // Responsive classes for larger screens
            />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center justify-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white hover:text-gray-300 transition-colors px-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block flex-shrink-0">
          <Button className="bg-white text-black hover:bg-slate-300 hover:text-black rounded-none">
            <Link href="#quickquote">Devis Gratuit</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden bg-white text-black p-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-black transition-colors py-2 border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-black text-white hover:bg-gray-800 mt-4">
              <Link href="#quickquote">Devis Gratuit</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
