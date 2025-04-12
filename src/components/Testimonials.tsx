'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 'testimonial1',
    name: 'Bernard Marchal',
    text: "Mila est brillante - elle m'a donné (ainsi qu'à mon appartement) une toute nouvelle perspective ! J'étais complètement dépassée par l'idée de meubler un nouveau appartement à partir de rien et je ne savais pas du tout par où commencer. Je n'avais pas non plus la moindre idée de ce que je voulais, ce qui n'a certainement pas facilité son travail. Mais Mila a été extrêmement professionnelle et patiente avec moi - elle a vraiment pris le temps de comprendre ce que je voulais de l'espace alors que je n'arrivais même pas à le définir.",
    date: '16 February 2025',
    image: '/images/avatar/bernard.png',
  },
  {
    id: 'testimonial2',
    name: 'Alain Leroux',
    text: "Mila nous a aidés à aménager notre nouvelle maison à meudon. Voici ce que nous avons apprécié dans notre collaboration avec : -Un goût impeccable. Son talent est indéniable. Elle a produit un design incroyable pour nous -Compétences en matière de communication : solide, réactive, réfléchie. Elle donnera une opinion réfléchie/raisonnée sur quelque chose sans être pressante. Son point de vue nous a beaucoup aidés à prendre nos décisions. -Elle a tenu compte de notre mode de vie et s'est assurée que les espaces qu'elle a conçus seraient très fonctionnels. -Elle entretient d'excellentes relations avec divers corps de métier dans la région, par exemple les menuisiers, les tapissiers, les peintres, les charpentiers, ce qui a permis à l'ensemble du projet de se dérouler sans problemes. Nous adorons notre nouvelle maison, en grande partie grâce aux efforts de Mila. Nous espérons travailler à nouveau avec elle pour notre prochaine maison.",
    rating: 5,
    date: "16 February 2025",
    image: '/images/avatar/alain.png'
    },
  {
    id: 'testimonial3',
    name: 'Yves Lebrun',
    text: "	Nous avons trouvé Mila par nos amis, il y a quelques années parce que nous avions besoin d'aide pour concevoir la rénovation de notre cuisine et de nos deux salles de bains. Nous avons été attirés par son style unique et dynamique et par ses commentaires positifs. Notre expérience avec Milaa largement dépassé nos attentes. Non seulement c'est une personne merveilleusement chaleureuse et positive avec laquelle il est agréable de travailler, mais elle a une capacité étonnante à comprendre notre esthétique et à proposer des designs passionnants. Notre expérience avec les designers précédents était parfois frustrante, soit parce qu'ils ignoraient nos préoccupations budgétaires, soit parce qu'ils n'étaient pas ouverts aux critiques. Mila a respecté toutes nos préoccupations budgétaires et elle est facile d'avoir un dialogue ouvert avec, et les résultats sont étonnants. En fait, nous avons eu une expérience tellement positive avec la rénovation de notre maison que nous avons fini par l'engager pour concevoir notre nouveau restaurant et nous l'utilisons maintenant pour concevoir l'espace extérieur de notre maison. Nous continuerons à faire appel à elle pour tout projet de design.",
    rating: 5,
    date: '16 February 2025',
    image: '/images/avatar/yves.png'
  },
  {
    id: 'testimonial4',
    name: 'Laurent Tanguy',
    text: "Nous sommes très reconnaissants d'avoir trouvé Mila. Ce fut un réel plaisir de travailler avec elle. Nous avons une petite maison avec un plan d'étage difficile. Elle as su s'organiser avec les difficultes de notre maison et la rendre chaleureuse, sommes des personnes âgées qui vivaient avec beaucoup de désordre et des pièces qui ne nous convenaient pas, jusqua ce que Mila nous aide a tout reorganiser.",
    rating: 5,
    date:   '16 February 2025',
    image: 'images/avatar/laurent.png'
  },
  {
    id: 'testimonial5',
    name: 'Patrice Dupuis',
    text: "Après des expériences décevantes avec deux autres entreprises de décoration d'intérieur, j'ai appris que Mila était disponible pour m'aider à décorer notre maison. Tout as ete fait dans les delai et unique a nos gout.",
    rating: 5,
    date: '16 February 2025',
    image: 'images/avatar/patrice.png'
  },
  {
    id: 'testimonial6',
    name: 'Christophe Richard',
    text: "Nous sommes absolument ravis de l'étonnante transformation que Mila a apportée à notre espace de vie et à la chambre des enfant",
    rating: 5,
    date: '16 February 2025',
    image: 'images/avatar/Christophe.png'
  },
  {
    id: 'testimonial7',
    name: 'Adèle Garnier',
    text: "Je recommande vivement Mila! elle a fait un travail formidable en créant le design magnifique. Elle est douée pour le design et la couleur, elle a écouté mes préférences, a travaillé avec mon budget et a conçu un résultat parfait, le travail a été fait dans les délais, merci à elle.",
    rating: 5,
    date: '16 February 2025',
    image: 'images/avatar/adele.png'
  },
  {
    id: 'testimonial8',
    name: '	Théo Corbel',
    text: "J'ai eu la chance de collaborer avec Mila Barton pour la Rénovation de mon intérieur, et je ne pourrais être plus satisfait du résultat. Son talent et son sens aigu de l'esthétique ont transformé mon espace !",
    rating: 5,
    date: '19 July 2025',
    image: 'images/avatar/theo.png'
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const displayedTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-10xl">
        <h2 className="mb-8 text-5xl font-bold text-left text-gray-900">Avis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="relative transition-all duration-500 ease-in-out"
            >
              {/* Large speech bubble with strong shadow */}
              <div className="relative bg-gray-50 p-6 text-gray-700 shadow-lg min-h-[280px]">
                {/* Decorative quotation marks - larger */}
                <div className="absolute top-4 left-4 text-7xl text-gray-200 font-serif leading-none">"</div>
                
                {/* Star rating - centered */}
                <div className="flex justify-center mb-3 text-yellow-400">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current mx-0.5" />
                  ))}
                </div>
                
                {/* Testimonial text - smaller */}
                <p className="text-base text-gray-600 italic relative z-10 px-4">
                  {testimonial.text}
                </p>
                
                {/* Large speech bubble arrow */}
                <div className="absolute -bottom-4 left-6 w-0 h-0 
                  border-l-[16px] border-l-transparent
                  border-r-[16px] border-r-transparent
                  border-t-[24px] border-t-gray-50
                  filter drop-shadow-md"></div>
              </div>

              {/* Author info */}
              <div className="flex items-center mt-8 ml-3">
                <div className="relative h-16 w-16 rounded-full border-3 border-white overflow-hidden shadow-md">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="ml-3">
                  <h5 className="text-lg font-bold text-gray-900">{testimonial.name}</h5>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}