'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Facebook, Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-4">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          {/* Logo */}
          <div className="mb-8 md:mb-0">
  <Link href="/" className="inline-block">
    <div className="text-4xl font-bold tracking-tighter">
      <div className="flex flex-col items-center">
        <img 
          src="/logo/logov2-1.svg" 
          alt="Logo" 
          className="w-24 h-auto md:w-32 lg:w-40 xl:w-48" // Responsive width with auto height
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
      <div className="border-t border-gray-800 ml-6 mr-6 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2021 - 2025 MILLA BARTON Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Mentions Légales
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Politique de confidentialité
            </Link>
          </div>
        </div>
    </footer>
  );
}
