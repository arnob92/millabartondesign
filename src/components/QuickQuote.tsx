'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush, Home, Check } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

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
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        projectType: '',
        numberOfRooms: '',
        roomType: '',
        surfaceArea: 0,
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

    const handleRadioChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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

            const sheetresponse = fetch('https://script.google.com/macros/s/AKfycbzlDOfmbVG5urrW-1yvWme1qbbtVEjO9tKMS6fWVupC-q19fSVQMijSLtB3B7UgsjVEvA/exec', {
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
        <section id="quickquote" className="py-16 bg-white" data-aos="fade-up">
            <div className="container-custom">
                <h2 className="text-4xl md:text-5xl text-center lg:text-5xl font-bold mb-9 md:mb-15">Devis en moins d'une minute</h2>

                <div className="mb-12 relative w-full flex flex-col items-center">
                    {/* Progress track (gray) */}
                    <div
                        className="absolute h-0.5 bg-gray-300 z-0"
                        style={{
                            top: '26px',
                            width: '70%',
                            left: '15%'
                        }}
                    ></div>

                    {/* Progress indicator (black) */}
                    <div
                        className="absolute h-0.5 bg-black z-10 transition-all duration-300"
                        style={{
                            top: '26px',
                            width: `${Math.max(0, (step - 1) / 6 * 70)}%`,
                            left: '15%'
                        }}
                    ></div>

                    {/* Steps container */}
                    <div className="relative z-20 w-full flex justify-center">
                        <div className="flex justify-between" style={{ width: '80%' }}>
                            {[1, 2, 3, 4, 5, 6, 7].map((stepNumber) => (
                                <div
                                    key={stepNumber}
                                    className="flex flex-col items-center relative"
                                    style={{ width: `${100 / 7}%` }}
                                >
                                    {/* Step circle */}
                                    <button
                                        type="button"
                                        onClick={() => stepNumber <= step && setStep(stepNumber)}
                                        className={`
                                            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                                            font-bold relative z-10
                                            ${stepNumber <= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}
                                            ${stepNumber <= step ? 'cursor-pointer' : 'cursor-default'}
                                        `}
                                    >
                                        {stepNumber}
                                    </button>

                                    {/* Step label */}
                                    <div className="mt-2 text-center text-xs lg:text-sm font-medium hidden lg:block">
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
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Votre projet concerne-t-il ?</h3>
                            <div className="flex justify-center mb-6 gap-4">
                                {['Decoration', 'Renovation'].map((type) => (
                                    <div
                                        key={type}
                                        className={`border-2 p-8 cursor-pointer transition-all ${formData.projectType === type
                                            ? 'border-black bg-gray-50'
                                            : 'border-gray-300 bg-gray-100'
                                            }`}
                                        style={{ height: '312px', width: '227px' }}
                                        onClick={() => handleRadioChange('projectType', type)}
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
                                                <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.projectType === type
                                                    ? 'border-black'
                                                    : 'border-gray-400'
                                                    }`}>
                                                    {formData.projectType === type && (
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
                                    className="bg-black text-white rounded-none md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer"
                                >
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center px-4 sm:px-0">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Nombre de pieces</h3>
                            <div className="flex flex-col items-center w-full mb-6">
                                {['1', '2', '3', '4+'].map((value) => (
                                    <div
                                        key={value}
                                        className={`
                                            p-4 mb-4 flex items-center
                                            ${formData.numberOfRooms === value
                                                ? 'border-[3px] border-black bg-gray-50'
                                                : 'border border-gray-300 bg-gray-50'
                                            }
                                            rounded-sm cursor-pointer
                                            w-full max-w-[566px] h-[60px]
                                        `}
                                        onClick={() => handleRadioChange('numberOfRooms', value)}
                                    >
                                        <div className="relative flex items-center w-full">
                                            <input
                                                type="radio"
                                                id={`room-${value}`}
                                                checked={formData.numberOfRooms === value}
                                                onChange={() => { }}
                                                className="absolute opacity-0 w-6 h-6 cursor-pointer"
                                            />
                                            <div className={`
                                                w-6 h-6 rounded-full border-2 flex items-center justify-center
                                                ${formData.numberOfRooms === value
                                                    ? 'bg-black border-black'
                                                    : 'bg-white border-gray-300'
                                                }
                                            `}>
                                                {formData.numberOfRooms === value && (
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
                                <Button className="rounded-none md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center px-4 sm:px-0">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Type de pièces</h3>
                            <div className="flex flex-col items-center w-full mb-6">
                                {['Cuisine', 'Salon', 'Chambre(s)', 'Bureau', 'Extérieur'].map((roomType) => (
                                    <div
                                        key={roomType}
                                        className={`
                                            p-4 mb-4 flex items-center
                                            ${formData.roomType === roomType
                                                ? 'border-2 border-black bg-gray-50'
                                                : 'border border-gray-300 bg-gray-50'
                                            }
                                            rounded-sm cursor-pointer
                                            w-full max-w-[566px] h-[60px]
                                        `}
                                        onClick={() => handleRadioChange('roomType', roomType)}
                                    >
                                        <div className="relative flex items-center w-full">
                                            <input
                                                type="radio"
                                                id={`type-${roomType}`}
                                                checked={formData.roomType === roomType}
                                                onChange={() => { }}
                                                className="absolute opacity-0 w-6 h-6 cursor-pointer"
                                            />
                                            <div className={`
                                                w-6 h-6 rounded-full border-2 flex items-center justify-center
                                                ${formData.roomType === roomType
                                                    ? 'bg-black border-black'
                                                    : 'bg-white border-gray-300'
                                                }
                                            `}>
                                                {formData.roomType === roomType && (
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
                                <Button className="rounded-none md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Surface du bien</h3>
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
                                <Button className="rounded-none md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Style de design</h3>
                            <div className="flex flex-col items-center mb-6">
                                {['Scandinave', 'Industriel', 'Vintage', 'Pop Art', 'Contemporain', 'Autre'].map((style) => (
                                    <div
                                        key={style}
                                        className={`p-4 mb-4 flex items-center ${formData.designStyle === style
                                            ? 'border-[3px] border-black bg-gray-50'
                                            : 'border border-gray-300 bg-gray-50'
                                            } rounded-sm cursor-pointer w-full md:w-[566px] h-[50px]`}
                                        onClick={() => handleRadioChange('designStyle', style)}
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="radio"
                                                id={`style-${style}`}
                                                checked={formData.designStyle === style}
                                                onChange={() => { }}
                                                className="absolute opacity-0 w-6 h-6 cursor-pointer"
                                            />
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.designStyle === style
                                                ? 'bg-black border-black'
                                                : 'bg-white border-gray-300'
                                                }`}>
                                                {formData.designStyle === style && (
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
                                <Button className="rounded-none md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="text-center px-4 sm:px-0">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Vos Coordonnés</h3>
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
                                <Button className="rounded-none md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    {isSubmitting ? 'Envoi en cours...' : 'Suivant'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 7 && (
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">C'est déjà fini !</h3>
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