"use client"; 
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "roman";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    menu: "Menu",
    deals: "Deals",
    about: "About",
    contact: "Contact",
    adminLogin: "Admin Login",
    cart: "Cart",
    orderNow: "Order Now",
    heroTitle: "Fresh Burgers\nMade Daily",
    heroSubtitle: "Experience the perfect blend of quality ingredients and bold flavors",
    ourMenu: "Our Menu",
    addToCart: "Add to Cart",
    specialDeals: "Special Deals",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    yourCart: "Your Cart",
    checkout: "Checkout",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping",
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    subscribeNewsletter: "Subscribe to our newsletter for exclusive deals!",
    emailPlaceholder: "Your email",
    subscribe: "Subscribe",
    allRightsReserved: "All rights reserved.",
  },
  roman: {
    home: "Ghar",
    menu: "Khane Ki List",
    deals: "Deals",
    about: "Hamare Baare Mein",
    contact: "Rabta Karen",
    adminLogin: "Admin Login",
    cart: "Thaila",
    orderNow: "Abhi Order Karen",
    heroTitle: "Taaza Burger\nRoz Banaye Jaate Hain",
    heroSubtitle: "Behtareen ingredients aur zabardast flavors ka perfect combination",
    ourMenu: "Hamara Menu",
    addToCart: "Thaile Mein Daalo",
    specialDeals: "Khaas Deals",
    aboutUs: "Hamare Baare Mein",
    contactUs: "Hamse Rabta Karen",
    yourCart: "Aapka Thaila",
    checkout: "Checkout Karen",
    emptyCart: "Aapka thaila khaali hai",
    continueShopping: "Shopping Continue Karen",
    quickLinks: "Quick Links",
    followUs: "Hame Follow Karen",
    newsletter: "Newsletter",
    subscribeNewsletter: "Exclusive deals ke liye hamare newsletter ko subscribe karen!",
    emailPlaceholder: "Aapka email",
    subscribe: "Subscribe Karen",
    allRightsReserved: "Saare haq mehfooz hain.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en"); // default

  // ✅ Read from localStorage only on client
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "roman" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
