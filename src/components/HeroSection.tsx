'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="w-full mt-20">
      <div className="flex flex-col md:flex-row">
        <div className="w-full h-[350px] md:h-[600px] relative order-1 md:order-2">
          <Image 
            src="/images/hero/hero.webp"
            alt="Interior design showcase"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
        <div className="w-full bg-gray-100 flex items-center order-2 md:order-1">
          <div className="w-full px-8 py-5 md:px-12 lg:px-16">
            <h1 className="md:mb-3 leading-tight text-2xl sm:text-2xl md:text-3xl lg:text-5xl pt-4 pb-4">
              Transformez votre intérieur <br />
              en un lieu qui vous ressemble.
            </h1>
            <p className="text-base sm:text-base md:text-base lg:text-2xl mb-6 pt-4 pb-4">
              Nous serions ravis d'échanger sur votre projet, <br />
              Obtenez une estimation en moins de 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="border-black border-2 text-black hover:bg-black hover:text-white py-5 px-8 rounded-none">      
              <Link href="#quickquote">Devis Gratuit</Link>
            </Button>
              <Button asChild className="bg-black text-white border-2 hover:bg-white hover:border-black hover:border-2 hover:text-black py-5 px-8 rounded-none">
              <Link href="#contact">Contact</Link>
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
