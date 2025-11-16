
"use client";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const burgerLogo = "https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/512/hambruger.png";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-foreground text-background py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img src={burgerLogo} alt="MAHDEE'S Logo" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-background">MAHDEE'S</h3>
            </Link>
            <p className="text-background/70 mb-4">Serving the best burgers since 2010</p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-background">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <Link href="/menu" className="hover:text-background transition-colors">
                  {t("menu")}
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-background transition-colors">
                  {t("deals")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-background transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background transition-colors">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4 text-background">Opening Hours</h4>
            <ul className="space-y-2 text-background/70">
              <li>Monday - Sunday: 4 PM - 4 AM</li>
             
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-background">{t("contactUs")}</h4>
            <ul className="space-y-3 text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>233J+7C5, Sector 5-F
New Karachi Town, Karachi</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>03196996990</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@burgerblast.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/70">
          <p>&copy; 2025 MAHDEE'S. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  );
}