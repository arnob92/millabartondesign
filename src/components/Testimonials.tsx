'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 'testimonial1',
    name: 'Bernard Marchal',
    text: "Mila est brillante - elle m'a donné (ainsi qu'à mon appartement) une toute nouvelle perspective ! J'étais complètement dépassée par l'idée de meubler un nouveau appartement à partir de rien et je ne savais pas du tout par où commencer. Je n'avais pas non plus la moindre idée de ce que je voulais, ce qui n'a certainement pas facilité son travail. Mais Mila a été extrêmement professionnelle et patiente avec moi - elle a vraiment pris le temps de comprendre ce que je voulais de l'espace alors que je n'arrivais même pas à le définir.",
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'testimonial2',
    name: 'Alain Leroux',
    text: "Mila nous a aidés à aménager notre nouvelle maison à Meudon. Voici ce que nous avons apprécié dans notre collaboration avec elle: -Un goût impeccable. Son talent est indéniable. Elle a produit un design incroyable pour nous -Compétences en matière de communication: solide, réactive, réfléchie. Elle donnera une opinion réfléchie/raisonnée sur quelque chose sans être pressante. Son point de vue nous a beaucoup aidés à prendre nos décisions. -Elle a tenu compte de notre mode de vie et s'est assurée que les espaces qu'elle a conçus seraient très fonctionnels. -Elle entretient d'excellentes relations avec divers corps de métier dans la région.",
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'testimonial3',
    name: 'Yves Lebrun',
    text: "Nous avons trouvé Mila par nos amis, il y a quelques années parce que nous avions besoin d'aide pour concevoir la rénovation de notre cuisine et de nos deux salles de bains. Notre expérience avec Mila a largement dépassé nos attentes. Non seulement c'est une personne merveilleusement chaleureuse et positive avec laquelle il est agréable de travailler, mais elle a une capacité étonnante à comprendre notre esthétique et à proposer des designs passionnants. En fait, nous avons eu une expérience tellement positive que nous avons fini par l'engager pour concevoir notre nouveau restaurant.",
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'testimonial4',
    name: 'Laurent Tanguy',
    text: "Nous sommes très reconnaissants d'avoir trouvé Mila. Ce fut un réel plaisir de travailler avec elle. Nous avons une petite maison avec un plan d'étage difficile. Elle a su s'organiser avec les difficultés de notre maison et la rendre chaleureuse. Nous sommes des personnes âgées qui vivaient avec beaucoup de désordre et des pièces qui ne nous convenaient pas, jusqu'à ce que Mila nous aide à tout réorganiser.",
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1600585154320-1c1e1c1c1c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'testimonial5',
    name: 'Patrice Dupuis',
    text: "Après des expériences décevantes avec deux autres entreprises de décoration d'intérieur, j'ai appris que Mila était disponible pour m'aider à décorer notre maison. Tout a été fait dans les délais et unique à nos goûts.",
    rating: 5,
    date: '16 February 2025',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const displayedTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom text-left">
        <h2 className="mb-12 font-bold text-center  md:text-left">Avis</h2>
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
                <p className="text-gray-700 text-lg">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}