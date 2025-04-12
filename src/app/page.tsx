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
import Spacer from '@/components/Spacer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="space-y-8">
        <HeroSection />
        <Spacer size={150} />
        <HowItWorks />
        <Spacer size={150} />
        <ImageSlider />
        <Spacer size={150} />
        <CompanySection />
        <Spacer size={150} />
        <Testimonials />
        <Spacer size={150} />
        <QuickQuote />
        <Spacer size={150} />
        <Gallery />
        <Spacer size={150} />
        <FAQ />
        <Spacer size={150} />
        <Contact />
        
      </div>
      <Footer />
    </main>
  );
}
