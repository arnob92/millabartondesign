'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush, Home, Check } from 'lucide-react';

type FormData = {
  projectType: string[];
  numberOfRooms: string[];
  roomType: string[];
  surfaceArea: number;
  postalCode: string;
  firstName: string;
  email: string;
  phone: string;
  designStyle: string[];
};

export default function QuickQuote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: [],
    numberOfRooms: [],
    roomType: [],
    surfaceArea: 0,
    postalCode: '',
    firstName: '',
    email: '',
    phone: '',
    designStyle: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleNext = async () => {
    if (step === 6) {
      await handleSubmit();
    } else if (step < 7) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, surfaceArea: Number(e.target.value) }));
  };

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          formType: 'quickquote'
        }),
      });

      const sheetresponse = fetch('https://script.google.com/macros/s/AKfycbzlDOfmbVG5urrW-1yvWme1qbbtVEjO9tKMS6fWVupC-q19fSVQMijSLtB3B7UgsjVEvA/exec',{
        method: 'POST',
        body: JSON.stringify({
          formData,
          formType: 'quickquote'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setStep(7);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNextButtonDisabled = () => {
    if (isSubmitting) return true;
    if (step === 1) return formData.projectType.length === 0;
    if (step === 2) return formData.numberOfRooms.length === 0;
    if (step === 3) return formData.roomType.length === 0;
    if (step === 4) return formData.surfaceArea < 10;
    if (step === 5) return formData.designStyle.length === 0;
    if (step === 6) return !formData.postalCode || !formData.firstName || !formData.email || !formData.phone;
    return false;
  };

  const stepLabels = [
    "Votre projet",
    "Nombre de pieces",
    "Type de pièces",
    "Surface du bien",
    "Style de design",
    "Vos Coordonnés",
    "Retourner à l'accueil"
  ];

  return (
    <section id="quickquote" className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-center mb-8">Devis en moins d'une minute</h2>

        <div className="mb-8 relative"> {/* Reduced margin-bottom */}
  {/* Progress line container */}
  <div className="absolute top-5 left-3 right-3 h-0.5 bg-gray-300 z-0 md:top-6"></div> {/* Smaller positioning */}
  
  {/* Progress indicator - simplified calculation */}
  <div 
    className="absolute top-5 left-3 h-0.5 bg-black z-0 transition-all duration-300 md:top-6"
    style={{ 
      width: `${(step / 7) * 100}%`,
      maxWidth: 'calc(100% - 1.5rem)' /* Accounts for padding */
    }}
  ></div>
  
  {/* Steps container */}
  <div className="relative z-10 overflow-x-auto whitespace-nowrap px-3"> {/* Reduced padding */}
    <div className="inline-flex w-full justify-between">
      {[1, 2, 3, 4, 5, 6, 7].map((stepNumber) => (
        <button
          key={stepNumber}
          type="button"
          onClick={() => {
            if (stepNumber <= step || stepNumber === 7) {
              setStep(stepNumber);
            }
          }}
          className={`inline-flex flex-col items-center ${stepNumber > step && stepNumber !== 7 ? 'cursor-default' : 'cursor-pointer'}`}
          style={{ 
            minWidth: `${100 / 7}%`,
            width: `${100 / 7}%`
          }}
        >
          <div 
            className={`
              flex items-center justify-center 
              w-8 h-8 rounded-full  /* Smaller circles */
              md:w-10 md:h-10 md:text-base  /* Adjusted desktop size */
              font-bold 
              ${stepNumber <= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}
            `}
          >
            {stepNumber}
          </div>
          {/* Step label - hidden on small screens */}
          <div className="mt-1 lg:mt-2 text-center text-sm px-1 hidden lg:block"> {/* Smaller spacing */}
            {stepLabels[stepNumber - 1]}
          </div>
        </button>
      ))}
    </div>
  </div>
</div>

        <div className="max-w-3xl mx-auto">
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded text-center">
              Une erreur s'est produite. Veuillez réessayer.
            </div>
          )}
          
          {step === 1 && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">Votre projet concerne-t-il ?</h3>
              <div className="flex justify-center mb-6 gap-4">
                {['Decoration', 'Renovation'].map((type) => (
                  <div 
                    key={type}
                    className={`border-2 p-8 cursor-pointer transition-all duration-200 ${
                      formData.projectType.includes(type) 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-300 bg-gray-100'
                    }`}
                    style={{ height: '312px', width: '227px' }}
                    onClick={() => handleCheckboxChange('projectType', type)}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <img 
                        src={`/images/quote/${type.toLowerCase()}.png`} 
                        alt={type} 
                        className="mb-4" 
                      />
                      <p className="font-semibold">
                        {type === 'Decoration' ? 'Décoration' : 'Rénovation'}
                      </p>
                      <div className="flex items-center justify-center mt-2">
                        <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.projectType.includes(type) 
                            ? 'border-black' 
                            : 'border-gray-400'
                        }`}>
                          {formData.projectType.includes(type) && (
                            <Check className="h-6 w-6 text-white bg-black rounded-full p-0.5" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleNext} 
                  disabled={isNextButtonDisabled()} 
                  className="bg-black text-white rounded-none md:h-14 md:w-40"
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

{step === 2 && (
  <div className="text-center px-4 sm:px-0">
    <h3 className="text-xl font-semibold mb-6">Nombre de pieces</h3>
    <div className="flex flex-col items-center w-full mb-6">
      {['1', '2', '3', '4+'].map((value) => (
        <div 
          key={value} 
          className={`
            p-4 mb-4 flex items-center transition-all duration-200
            ${formData.numberOfRooms.includes(value)
              ? 'border-[3px] border-black bg-gray-50'
              : 'border border-gray-300 bg-gray-50'
            }
            rounded-sm cursor-pointer
            w-full max-w-[566px] h-[60px]
          `}
          onClick={() => handleCheckboxChange('numberOfRooms', value)}
        >
          <div className="relative flex items-center w-full">
            <input
              type="checkbox"
              id={`room-${value}`}
              checked={formData.numberOfRooms.includes(value)}
              onChange={() => {}}
              className="absolute opacity-0 w-6 h-6 cursor-pointer"
            />
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${formData.numberOfRooms.includes(value) 
                ? 'bg-black border-black'
                : 'bg-white border-gray-300'
              }
            `}>
              {formData.numberOfRooms.includes(value) && (
                <Check className="h-4 w-4 text-white" />
              )}
            </div>
            <label 
              htmlFor={`room-${value}`} 
              className="ml-4 cursor-pointer select-none whitespace-nowrap"
            >
              {value === '4+' ? '+4 pièces à décorer' : `${value} pièce${value === '1' ? '' : 's'} à décorer`}
            </label>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-8">
                <Button className="bg-black text-white rounded-none md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleNext} disabled={isNextButtonDisabled()}>
                  Suivant
                </Button>
              </div>
  </div>
)}

{step === 3 && (
  <div className="text-center px-4 sm:px-0">
    <h3 className="text-xl font-semibold mb-6">Type de pièces</h3>
    <div className="flex flex-col items-center w-full mb-6">
      {['Cuisine', 'Salon', 'Chambre(s)', 'Bureau', 'Extérieur'].map((roomType) => (
        <div 
          key={roomType} 
          className={`
            p-4 mb-4 flex items-center transition-all duration-200
            ${formData.roomType.includes(roomType)
              ? 'border-2 border-black bg-gray-50'
              : 'border border-gray-300 bg-gray-50'
            }
            rounded-sm cursor-pointer
            w-full max-w-[566px] h-[60px]
          `}
          onClick={() => handleCheckboxChange('roomType', roomType)}
        >
          <div className="relative flex items-center w-full">
            <input
              type="checkbox"
              id={`type-${roomType}`}
              checked={formData.roomType.includes(roomType)}
              onChange={() => {}}
              className="absolute opacity-0 w-6 h-6 cursor-pointer"
            />
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${formData.roomType.includes(roomType) 
                ? 'bg-black border-black'
                : 'bg-white border-gray-300'
              }
            `}>
              {formData.roomType.includes(roomType) && (
                <Check className="h-4 w-4 text-white" />
              )}
            </div>
            <label 
              htmlFor={`type-${roomType}`} 
              className="ml-4 cursor-pointer select-none whitespace-nowrap"
            >
              {roomType}
            </label>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-8">
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleNext} disabled={isNextButtonDisabled()}>
                  Suivant
                </Button>
              </div>
  </div>
)}
          {step === 4 && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">Surface du bien</h3>
              <div className="mb-6">
                <p className="text-lg mb-2">{formData.surfaceArea} m²</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.surfaceArea}
                  onChange={handleSliderChange}
                  className="w-full custom-slider"
                  style={{
                    background: `linear-gradient(to right, black ${formData.surfaceArea}%, rgba(240, 240, 240, 1) ${formData.surfaceArea}%)`
                  }}
                  required
                />
              </div>
              <div className="flex justify-between mt-8">
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleNext} disabled={isNextButtonDisabled()}>
                  Suivant
                </Button>
              </div>
            </div>
          )}

{step === 5 && (
  <div className="text-center">
    <h3 className="text-xl font-semibold mb-6">Style de design</h3>
    <div className="flex flex-col items-center mb-6">
      {['Scandinave', 'Industriel', 'Vintage', 'Pop Art', 'Contemporain', 'Autre'].map((style) => (
        <div 
          key={style} 
          className={`p-4 mb-4 flex items-center transition-all duration-200 ${
            formData.designStyle.includes(style)
              ? 'border-[3px] border-black bg-gray-50'
              : 'border border-gray-300 bg-gray-50'
          } rounded-sm cursor-pointer w-full md:w-[566px] h-[50px]`}
          onClick={() => handleCheckboxChange('designStyle', style)}
        >
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id={`style-${style}`}
              checked={formData.designStyle.includes(style)}
              onChange={() => {}}
              className="absolute opacity-0 w-6 h-6 cursor-pointer"
            />
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              formData.designStyle.includes(style) 
                ? 'bg-black border-black'
                : 'bg-white border-gray-300'
            }`}>
              {formData.designStyle.includes(style) && (
                <Check className="h-4 w-4 text-white stroke-[3px]" />
              )}
            </div>
            <label 
              htmlFor={`style-${style}`} 
              className="ml-4 cursor-pointer select-none text-gray-800"
            >
              {style}
            </label>
          </div>
        </div>
      ))}
    </div>
    
      <div className="flex justify-between mt-8">
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleNext} disabled={isNextButtonDisabled()}>
                  Suivant
                </Button>
              </div>
    
  </div>
)}

{step === 6 && (
  <div className="text-center px-4 sm:px-0">
    <h3 className="text-xl font-semibold mb-6">Vos Coordonnés</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {['postalCode', 'firstName', 'email', 'phone'].map((field) => (
        <div key={field} className="mb-4 w-full">
          <label className="block text-center mb-2 sm:mb-4 text-lg sm:text-3xl text-neutral-600 font-bold">
            {field === 'postalCode' ? 'Code postal' : 
             field === 'firstName' ? 'Prénom' : 
             field === 'email' ? 'E-mail' : 'Téléphone'}
          </label>
          <input
            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
            name={field}
            placeholder={field === 'postalCode' ? 'Code Postal' : 
                        field === 'firstName' ? 'Prénom' : 
                        field === 'email' ? 'Email' : 'Numéro de portable'}
            value={formData[field as keyof FormData]}
            onChange={handleChange}
            className="w-full border border-neutral-800 p-2 rounded text-sm text-center mx-auto"
            style={{ maxWidth: '400px' }}
            required
          />
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-8">
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                <Button className="rounded-none md:h-14 md:w-40" onClick={handleNext} disabled={isNextButtonDisabled()}>
                  {isSubmitting ? 'Envoi en cours...' : 'Suivant'}
                </Button>
              </div>
  </div>
)}

          {step === 7 && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">C'est déjà fini !</h3>
              <p className="mb-4">
                Merci d'avoir rempli notre formulaire de demande de devis. Votre satisfaction est notre priorité et nous sommes ravis de pouvoir vous aider à concrétiser votre projet de rénovation et de décoration d'intérieur.
              </p>
              <p className="mb-4">
                Nous avons bien reçu vos informations et notre équipe va les analyser avec attention. Vous serez contacté sous peu pour discuter des détails supplémentaires et vous fournir un devis personnalisé.
              </p>
              <p className="mb-4">
                En attendant, n'hésitez pas à nous contacter pour toute question ou information complémentaire.
              </p>
              <Button onClick={() => window.location.href = '/'} className="bg-black text-white md:h-14 md:w-40 rounded-none">
                Retourner à l'accueil
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}