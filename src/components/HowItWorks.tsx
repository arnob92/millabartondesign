'use client';

import { Search, PenTool, ShoppingCart, Compass, Hammer } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 'step1',
      icon: <Search className="h-70 w-70 text-black" />,
      title: "Découverte & Évaluation",
      description: "Nous comprenons vos besoins, évaluons l'espace et définissons ensemble les grandes lignes du projet."
    },
    {
      id: 'step2',
      icon: <Compass className="h-70 w-70 text-black" />,
      title: "Création & Préparation",
      description: "Nous créons des plans détaillés et des maquettes 3D. Après validation, nous planifions et sélectionnons les matériaux nécessaires."
    },
    {
      id: 'step3',
      icon: <Hammer className="h-70 w-70 text-black" />,
      title: "Transformation & Réalisation",
      description: "Nous supervisons tous les aspects du projet pour assurer une réalisation conforme aux plans et dans les délais impartis."
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-center mb-12">Comment ça marche ?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="process-item">
              <div className="flex justify-center bg-gray-200 p-4 ">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
