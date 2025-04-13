'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Facebook, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-8 pb-4">
      <div className="container-custom ">
        <div className="flex w-4/5 mx-auto flex-col md:flex-row md:justify-between justify-center items-center mb-6">
          {/* Logo */}
          <div className="mb-8 md:mb-0">
  <Link href="/" className="inline-block">
    <div className="text-4xl font-bold tracking-tighter">
      <div className="flex flex-col items-center">
        <img 
          src="/logo/logov2-1.svg" 
          alt="Logo" 
          className="w-28 h-auto" // Responsive width with auto height
        />
      </div>
    </div>
  </Link>
</div>

          {/* Social Media Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-medium mb-4">Réseaux sociaux</h3>
            <ul className="space-y-3">
              <li>
                <Link href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Instagram size={18} />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Linkedin size={18} />
                  <span>Linkedin</span>
                </Link>
              </li>
              <li>
                <Link href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Facebook size={18} />
                  <span>Facebook</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Coordonnées</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center gap-2">
                <Phone size={18} />
                <span>09 24 72 52 51</span>
              </li>
              <li>
                <Link href="mailto:contact@mb-design.fr" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={18} />
                  <span>Mail</span>
                </Link>
              </li>
              <li>
                <Link href="https://wa.me/33924725251" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <MessageSquare size={18} />
                  <span>Whatsapp</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        
      </div>
      {/* Bottom Section with Copyright and Legal Links */}
      <div className='border-t border-gray-700'>
      <div className=" border-gray-800 w-3/5 mx-auto my-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-md md:mb-0">© 2021 - 2025 MILLA BARTON Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-white hover:text-gray-400 transition-colors text-md font-bold">
              Mentions Légales
            </Link>
            <Link href="#" className="text-white hover:text-gray-400 transition-colors font-bold text-md">
              Politique de confidentialité
            </Link>
          </div>
        </div>
        </div>
    </footer>
  );
}
