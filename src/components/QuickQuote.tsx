'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush, Home, Check } from 'lucide-react';

type FormData = {
  projectType: string;
  numberOfRooms: string;
  roomType: string;
  surfaceArea: number;
  postalCode: string;
  firstName: string;
  email: string;
  phone: string;
  designStyle: string;
};

export default function QuickQuote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    numberOfRooms: '',
    roomType: '',
    surfaceArea: 50,
    postalCode: '',
    firstName: '',
    email: '',
    phone: '',
    designStyle: '',
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

      if (response.ok) {
        setSubmitStatus('success');
        setStep(7); // Move to success step
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
    if (step === 1) return !formData.projectType;
    if (step === 2) return !formData.numberOfRooms;
    if (step === 3) return !formData.roomType;
    if (step === 4) return formData.surfaceArea < 10;
    if (step === 5) return !formData.designStyle;
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

        <div className="mb-10">
          <div className="flex justify-center">
            <div className="relative flex items-start justify-between w-full max-w-4xl px-4">
              {/* Background line (gray) */}
              <div className="absolute top-5 left-16 right-16 h-0.5 bg-gray-300 z-0"></div>
              
              {/* Progress line (black) */}
              <div 
                className="absolute top-5 left-16 h-0.5 bg-black z-0 transition-all duration-300"
                style={{ 
                  width: `${(step - 1) * (100 / 6)}%`, 
                  maxWidth: step === 7 ? 'calc(100% - 8rem)' : `${(step - 1) * (100 / 7)}%` 
                }}
              ></div>
              
              {[1, 2, 3, 4, 5, 6, 7].map((stepNumber) => (
                <div 
                  key={stepNumber} 
                  className="flex flex-col items-center relative z-10 cursor-pointer"
                  style={{ width: 'calc(100% / 7)' }}
                  onClick={() => {
                    // Only allow jumping to completed steps or the current step
                    if (stepNumber <= step) {
                      setStep(stepNumber);
                    }
                  }}
                >
                  <div 
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      stepNumber <= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'
                    } font-bold text-lg transition-all duration-300`}
                  >
                    {stepNumber}
                  </div>
                  <div className="mt-3 text-center text-xs font-medium w-full px-1">
                    {stepLabels[stepNumber - 1]}
                  </div>
                </div>
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
              <div className="flex justify-center mb-6">
                <div 
                  className={`border-2 p-8 mx-2 cursor-pointer transition-all duration-200 ${formData.projectType === 'Decoration' ? 'border-black bg-gray-50' : 'border-gray-300 bg-gray-100'}`}
                  style={{ height: '200px', width: '130px' }}
                  onClick={() => setFormData({ ...formData, projectType: 'Decoration' })}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <img src="/images/quote/decoration.png" alt="Décoration" className="mb-4" />
                    <p className="font-semibold">Décoration</p>
                    <div className="flex items-center justify-center mt-2">
                      <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.projectType === 'Decoration' ? 'border-black' : 'border-gray-400'}`}>
                        {formData.projectType === 'Decoration' && <Check className="h-6 w-6 text-white bg-black rounded-full p-0.5" />}
                      </div>
                    </div>
                  </div>
                </div>
                <div 
                  className={`border-2 p-8 mx-2 cursor-pointer transition-all duration-200 ${formData.projectType === 'Renovation' ? 'border-black bg-gray-50' : 'border-gray-300 bg-gray-100'}`}
                  style={{ height: '200px', width: '130px' }}
                  onClick={() => setFormData({ ...formData, projectType: 'Renovation' })}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <img src="/images/quote/renovation.png" alt="Rénovation" className="mb-4" />
                    <p className="font-semibold">Rénovation</p>
                    <div className="flex items-center justify-center mt-2">
                      <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.projectType === 'Renovation' ? 'border-black' : 'border-gray-400'}`}>
                        {formData.projectType === 'Renovation' && <Check className="h-6 w-6 text-white bg-black rounded-full p-0.5" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Button onClick={handleNext} disabled={isNextButtonDisabled()} className="bg-black text-white">
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">Nombre de pieces</h3>
              <div className="flex flex-col items-center mb-6">
                {['1', '2', '3', '4+'].map((value) => (
                  <div key={value} className="bg-gray-50 border border-gray-300 p-4 mb-4 w-80">
                    <label className="flex items-center ">
                      <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.numberOfRooms === value ? 'border-black bg-gray-50' : 'border-gray-300 bg-gray-100'}`}>
                        <input
                          type="radio"
                          name="numberOfRooms"
                          value={value}
                          onChange={handleChange}
                          className="absolute opacity-0 cursor-pointer"
                          required
                        />
                        {formData.numberOfRooms === value && <Check className="h-6 w-6 text-white bg-black rounded-full p-0.5" />}
                      </div>
                      <span className="ml-4">{value === '4+' ? '+4 pièces à décorer' : `${value} pièce${value === '1' ? '' : 's'} à décorer`}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button onClick={handleBack}>Retour</Button>
                <Button onClick={handleNext} disabled={isNextButtonDisabled()}>Suivant</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">Type de pièces</h3>
              <div className="flex flex-col items-center mb-6">
                {['Cuisine', 'Salon', 'Chambre(s)', 'Bureau', 'Extérieur'].map((roomType) => (
                  <div key={roomType} className="bg-gray-50 border border-gray-300 p-4 mb-4 w-80">
                    <label className="flex items-center ">
                      <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.roomType === roomType ? 'border-black' : 'border-gray-400'}`}>
                        <input
                          type="radio"
                          name="roomType"
                          value={roomType}
                          onChange={handleChange}
                          className="absolute opacity-0 cursor-pointer"
                          required
                        />
                        {formData.roomType === roomType && <Check className="h-6 w-6 text-white bg-black rounded-full p-0.5" />}
                      </div>
                      <span className="ml-3">{roomType}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button onClick={handleBack}>Précédent</Button>
                <Button onClick={handleNext} disabled={isNextButtonDisabled()}>Suivant</Button>
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
                <Button onClick={handleBack}>Précédent</Button>
                <Button onClick={handleNext} disabled={isNextButtonDisabled()}>Suivant</Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">Style de design</h3>
              <div className="flex flex-col items-center mb-6">
                {['Scandinave', 'Industriel', 'Vintage', 'Pop Art', 'Contemporain', 'Autre'].map((style) => (
                  <div key={style} className="bg-gray-50 border border-gray-300 p-4 mb-4 w-80">
                    <label className="flex items-center">
                      <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.designStyle === style ? 'border-black' : 'border-gray-400'}`}>
                        <input
                          type="radio"
                          name="designStyle"
                          value={style}
                          onChange={handleChange}
                          className="absolute opacity-0 cursor-pointer"
                          required
                        />
                        {formData.designStyle === style && <Check className="h-6 w-6 text-white bg-black rounded-full p-0.5" />}
                      </div>
                      <span className="ml-3">{style}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button onClick={handleBack}>Précédent</Button>
                <Button onClick={handleNext} disabled={isNextButtonDisabled()}>Suivant</Button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">Vos Coordonnés</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {['postalCode', 'firstName', 'email', 'phone'].map((field) => (
                  <div key={field} className="mb-4 w-full">
                    <label className="block text-center mb-4 text-3xl text-neutral-600 font-bold">
                      {field === 'postalCode' ? 'Code postal' : 
                       field === 'firstName' ? 'Prénom' : 
                       field === 'email' ? 'E-mail' : 'Phone/Mobile'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      placeholder={field === 'postalCode' ? 'Code Postal' : 
                                  field === 'firstName' ? 'Prénom' : 
                                  field === 'email' ? 'Email Address' : 'Numéro de portable'}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      className="w-full border border-neutral-800 p-2 rounded text-sm text-center"
                      style={{ width: '100%', maxWidth: '400px' }}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <Button onClick={handleBack}>Précédent</Button>
                <Button onClick={handleNext} disabled={isNextButtonDisabled()}>
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
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
              <Button onClick={() => window.location.href = '/'} className="bg-black text-white">
                Retourner à l'accueil
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}