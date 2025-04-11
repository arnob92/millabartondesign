'use client';

export default function CompanySection() {
  return (
    <section id="entreprise" className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-left text-5xl mb-4 font-bold">L'entreprise</h2>

        <div className="flex flex-col md:flex-row items-center gap-12"> {/* Changed to items-center */}
          <div className="flex justify-center mb-4 md:mb-0">
            <img
              src="\images\company\mila.png"
              alt="Milla Barton"
              className="shadow-lg" 
              style={{ 
                height: '550px',  // Increased from 600px
                width: 'auto',   // Changed from fixed width to auto
                maxWidth: '450px' // Added maxWidth
              }}
            />
          </div>

          <div className="flex flex-col justify-center md:py-12"> {/* Added vertical padding */}
            <h3 className="text-3xl font-bold mb-4">Milla Barton</h3>
            <p className="text-gray-600 text-xl font-bold mb-6">Designer d'intérieur</p>

            <div className="space-y-8 text-gray-700 max-w-2xl"> {/* Added max-width */}
              <p className="text-lg"> {/* Increased text size */}
                Milla BARTON met à votre disposition son équipe dynamique pour la réalisation de vos projets.
              </p>
              <p className="text-lg">
                Nous sommes à votre disposition et proposons des solutions sur mesure pour l'aménagement,
                le suivi de chantier et la décoration de votre intérieur en France comme à l'étranger.
              </p>
              <p className="text-lg">
                Architecte d'intérieur et Décoratrice d'intérieur basée à Neuilly sur Seine, j'accompagne les particuliers et les professionnels.
              </p>
              <p className="text-lg">
                Je vous propose d'être à l'écoute de vos besoins et de vous accompagner dans vos projets: direction de projet, planches d'objets décoration, 3D, achats et mise en place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}