'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { resourceData } from "@/lib/resourceData";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-brand-dark-gray text-white pt-20 pb-10 dark:bg-black/80 transition-colors duration-300">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-removebg.png"
              alt="Holland Dairy Logo"
              width={150}
              height={50}
              className="object-contain brightness-0 invert"
              priority
            />
          </Link>
          <p className="opacity-70 leading-relaxed max-w-xs">
            {t.footer.desc}
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-3 bg-white/10 rounded-full hover:bg-accent transition-all transform hover:scale-110">
              <FaFacebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-3 bg-white/10 rounded-full hover:bg-accent transition-all transform hover:scale-110">
              <FaTwitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-3 bg-white/10 rounded-full hover:bg-accent transition-all transform hover:scale-110">
              <FaInstagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-accent">{t.footer.quickLinks}</h4>
          <ul className="space-y-4 opacity-70">
            <li><Link href="/" className="hover:text-accent transition-colors font-bold text-accent">{t.nav.home}</Link></li>
            <li><Link href="#about" className="hover:text-accent transition-colors">{t.nav.about}</Link></li>
            <li><Link href="#products" className="hover:text-accent transition-colors">{t.nav.products}</Link></li>
            <li><Link href="#resources" className="hover:text-accent transition-colors">{t.nav.resources}</Link></li>
            <li><Link href="#faq" className="hover:text-accent transition-colors">{t.nav.faq}</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-accent">{t.resources.badge}</h4>
          <ul className="space-y-4 opacity-70">
            {resourceData.map((res) => (
              <li key={res.slug}>
                <Link
                  href={`/resources/${res.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {language === "am" ? res.titleAm || res.slug : res.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-accent">{t.footer.contact}</h4>
          <ul className="space-y-4 opacity-70">
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0" />
              <span>{language === "am" ? "ቢሾፍቱ, ኢትዮጵያ" : "Bishoftu, Ethiopia"}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <span>{language === "am" ? "ስልክ: 6653" : "Phone: 6653"}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <span>{language === "am" ? "ኢሜይል: info@holland-dairy.com" : "Email: info@holland-dairy.com"}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-white/10 text-center opacity-40 px-6">
        <p>&copy; {new Date().getFullYear()} Holland Dairy Ethiopia. {t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;