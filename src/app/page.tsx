import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import CompanySection from '@/components/CompanySection';
import Testimonials from '@/components/Testimonials';
import QuickQuote from '@/components/QuickQuote';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ImageSlider } from '@/components/ImageSlider';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="space-y-8">
        <HeroSection />
        <HowItWorks />
        <ImageSlider />
        <CompanySection />
        <Testimonials />
        <QuickQuote />
        <Gallery />
        <FAQ />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
