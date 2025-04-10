'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqItems = [
    {
      id: 'faq-1',
      question: 'Quels services proposez-vous?',
      answer: 'Nous proposons une gamme complète de services de rénovation et de décoration d\'intérieur, incluant la conception, la planification et l\'exécution des projets. Nos services couvrent la rénovation de cuisine et salle de bain, l\'aménagement d\'espace et la décoration intérieure.'
    },
    {
      id: 'faq-2',
      question: 'Travaillez-vous sur des projets de toutes tailles?',
      answer: 'Oui, nous prenons en charge des projets de toutes envergures, des petites rénovations aux chantiers complets. Chaque projet est adapté à vos besoins spécifiques et votre budget.'
    },
    {
      id: 'faq-3',
      question: 'Est-ce que vous fournissez un devis gratuit?',
      answer: 'Oui, nous établissons des devis gratuits et sans engagement. Contactez-nous pour évaluer votre projet et recevoir une estimation personnalisée.'
    },
    {
      id: 'faq-4',
      question: 'Pouvez-vous créer des designs personnalisés?',
      answer: 'Absolument. Nos designers créent des concepts uniques qui reflètent votre style. Chaque projet est adapté à vos goûts et contraintes budgétaires.'
    },
    {
      id: 'faq-5',
      question: 'Comment sont calculés les coûts de rénovation?',
      answer: 'Nos tarifs dépendent de la surface, des matériaux sélectionnés et de la complexité des travaux. Un devis détaillé vous est remis après étude du projet.'
    },
    {
      id: 'faq-6',
      question: 'Offrez-vous des options de financement?',
      answer: 'Nous proposons différentes solutions de paiement échelonné pour faciliter le financement de vos travaux. Nos conseillers peuvent vous présenter les options disponibles.'
    }
  ];

  return (
    <section id="faq" className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-5xl font-bold mb-8">FAQ</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqItems.map((item) => (
            <AccordionItem 
              key={item.id} 
              value={item.id} 
              className="border-b border-gray-200"
            >
              <AccordionTrigger className="py-4 hover:no-underline text-left bg-black text-white px-4">
                <h3 className="font-semibold text-base">{item.question}</h3>
              </AccordionTrigger>
              <AccordionContent className="py-4 text-gray-700 px-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}