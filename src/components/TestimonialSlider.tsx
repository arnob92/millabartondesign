'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 'testimonial1',
    name: 'Bernard Marchal',
    text: 'Mila est brillante - elle m\'a donné (ainsi qu\'à mon appartement) une toute nouvelle perspective ! J\'étais complètement dépassée par l\'idée de meubler un nouveau appartement à partir de rien.',
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'testimonial2',
    name: 'Alain Leroux',
    text: 'Mila nous a aidés à aménager notre nouvelle maison à Meudon. Son talent est indéniable. Elle a produit un design incroyable pour nous.',
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'testimonial3',
    name: 'Yves Lebrun',
    text: 'Nous avons trouvé Mila par nos amis, il y a quelques années. Notre expérience avec Mila a largement dépassé nos attentes.',
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'testimonial4',
    name: 'Laurent Tanguy',
    text: 'Nous sommes très reconnaissants d\'avoir trouvé Mila. Ce fut un réel plaisir de travailler avec elle.',
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1600585154320-1c1e1c1c1c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'testimonial5',
    name: 'Patrice Dupuis',
    text: 'Après des expériences décevantes avec d\'autres entreprises, j\'ai appris que Mila était disponible pour m\'aider à décorer notre maison.',
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3));
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const startIndex = currentIndex * 3;
  const displayedTestimonials = testimonials.slice(startIndex, startIndex + 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom text-center">
        <h2 className="mb-12 text-2xl font-bold">Avis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-gray-200 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={`${testimonial.name}-star-${i}`} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">{testimonial.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
