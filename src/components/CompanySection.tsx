'use client';

export default function CompanySection() {
  return (
    <section id="entreprise" className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-left mb-12 text-5xl font-bold">L'entreprise</h2>

        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex justify-center mb-4 md:mb-0">
            <img
              src="\images\company\mila.png"
              alt="Milla Barton"
              className="w-full h-auto rounded-md shadow-lg" 
              style={{ maxHeight: '600px', width: 'auto'}}
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-4">Milla Barton</h3>
            <p className="text-gray-600 text-xl font-bold mb-6">Designer d’intérieur</p>

            <div className="space-y-8 text-gray-700">
              <p>
                Milla BARTON met à votre disposition son équipe dynamique pour la réalisation de vos projets.
              </p>
              <p>
                Nous sommes à votre disposition et proposons des solutions sur mesure pour l'aménagement,
                le suivi de chantier et la décoration de votre intérieur en France comme à l'étranger.
              </p>
              <p>
                Architecte d’intérieur et Décoratrice d’intérieur basée à Neuilly sur Seine, j’accompagne les particuliers et les professionnels.
              </p>
              <p>
                Je vous propose d’être à l’écoute de vos besoins et de vous accompagner dans vos projets: direction de projet, planches d’objets décoration, 3D, achats et mise en place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
