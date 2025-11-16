"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Menu,
  X,
  ShoppingCart,
  Moon,
  Sun,
  Languages,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const burgerLogo =
  "https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/512/hambruger.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // prevent SSR errors
  const router = useRouter();

  const { getItemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const pages = ["home", "menu", "deals", "about", "contact"];

  // Only mount after client renders
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR rendering
  if (!mounted) return null;

  const itemCount = getItemCount();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={burgerLogo}
                alt="MAHDEE'S Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-destructive font-bold">MAHDEE'S</h1>
          </Link>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center gap-8">
  {pages.map((page) => (
    <Link
      key={page}
      href={page === "home" ? "/" : `/${page.toLowerCase()}`}
      className="text-foreground hover:text-destructive transition-colors"
    >
      {t(page)}
    </Link>
  ))}
</nav> */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-destructive transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href="/menu"
              className="text-foreground hover:text-destructive transition-colors"
            >
              {t("menu")}
            </Link>
            <Link
              href="/deals"
              className="text-foreground hover:text-destructive transition-colors"
            >
              {t("deals")}
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-destructive transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-destructive transition-colors"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Desktop Navigation
          <nav className="hidden md:flex items-center gap-8">
            {pages.map((page) => (
              <Link
                key={page}
                href={page === "home" ? "/" : `/${page}`}
                className="text-foreground hover:text-destructive transition-colors"
              >
                {t(page)}
              </Link>
            ))}
          </nav> */}

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleLanguage}>
              <Languages className="h-4 w-4" />
              <span className="text-sm">
                {language === "en" ? "EN" : "Roman"}
              </span>
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* admin login removed */}

            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/cart")}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Button>

            <Button
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => router.push("/menu")}
            >
              {t("orderNow")}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            {pages.map((page) => (
              <Link
                key={page}
                href={page === "home" ? "/" : `/${page}`}
                className="text-foreground hover:text-destructive transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(page)}
              </Link>
            ))}

            <div className="flex gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={toggleLanguage}
              >
                <Languages className="h-4 w-4" />
                {language === "en" ? "EN" : "Roman"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                {theme === "light" ? "Dark" : "Light"}
              </Button>
            </div>

            {/* admin login removed */}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  router.push("/cart");
                  setMobileMenuOpen(false);
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t("cart")} ({itemCount})
              </Button>
              <Button
                className="bg-destructive hover:bg-destructive/90 flex-1"
                onClick={() => {
                  router.push("/menu");
                  setMobileMenuOpen(false);
                }}
              >
                {t("orderNow")}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "./ui/button";
// import { Menu, X, ShoppingCart, UserCircle, Moon, Sun, Languages } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { useTheme } from "../context/ThemeContext";
// import { useLanguage } from "../context/LanguageContext";

// const burgerLogo =
//   "https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/512/hambruger.png";

// export function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const router = useRouter();

//   const { getItemCount } = useCart();
//   const itemCount = getItemCount();

//   const { theme, toggleTheme } = useTheme();
//   const { language, toggleLanguage, t } = useLanguage();

//   const pages = ["home", "menu", "deals", "about", "contact"];

//   return (
//     <header className="bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
//               <img src={burgerLogo} alt="MAHDEE'S Logo" className="w-full h-full object-cover" />
//             </div>
//             <h1 className="text-destructive font-bold">MAHDEE'S</h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             {pages.map((page) => (
//               <Link
//                 key={page}
//                 href={page === "home" ? "/" : `/${page}`}
//                 className="text-foreground hover:text-destructive transition-colors"
//               >
//                 {t(page)}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Buttons */}
//           <div className="hidden md:flex items-center gap-2">
//             <Button variant="ghost" size="sm" onClick={toggleLanguage}>
//               <Languages className="h-4 w-4" />
//               <span className="text-sm">{language === "en" ? "EN" : "Roman"}</span>
//             </Button>

//             <Button variant="ghost" size="icon" onClick={toggleTheme}>
//               {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
//             </Button>

//             <Button variant="ghost" onClick={() => router.push("/admin")}>
//               <UserCircle className="h-5 w-5" />
//               {t("adminLogin")}
//             </Button>

//             <Button variant="outline" size="icon" onClick={() => router.push("/cart")} className="relative">
//               <ShoppingCart className="h-5 w-5" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                   {itemCount}
//                 </span>
//               )}
//             </Button>

//             <Button className="bg-destructive hover:bg-destructive/90" onClick={() => router.push("/menu")}>
//               {t("orderNow")}
//             </Button>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
//             {pages.map((page) => (
//               <Link
//                 key={page}
//                 href={page === "home" ? "/" : `/${page}`}
//                 className="text-foreground hover:text-destructive transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {t(page)}
//               </Link>
//             ))}

//             <div className="flex gap-2 pt-2 border-t border-border">
//               <Button variant="outline" className="flex-1 gap-2" onClick={toggleLanguage}>
//                 <Languages className="h-4 w-4" />
//                 {language === "en" ? "EN" : "Roman"}
//               </Button>
//               <Button variant="outline" className="flex-1 gap-2" onClick={toggleTheme}>
//                 {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
//                 {theme === "light" ? "Dark" : "Light"}
//               </Button>
//             </div>

//             <Button
//               variant="ghost"
//               className="text-foreground hover:text-destructive gap-2 justify-start"
//               onClick={() => {
//                 router.push("/admin");
//                 setMobileMenuOpen(false);
//               }}
//             >
//               <UserCircle className="h-5 w-5" />
//               {t("adminLogin")}
//             </Button>

//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 className="flex-1"
//                 onClick={() => {
//                   router.push("/cart");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 {t("cart")} ({itemCount})
//               </Button>
//               <Button
//                 className="bg-destructive hover:bg-destructive/90 flex-1"
//                 onClick={() => {
//                   router.push("/menu");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 {t("orderNow")}
//               </Button>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }

// "use client";

// import {
//   Menu,
//   ShoppingCart,
//   X,
//   UserCircle,
//   Moon,
//   Sun,
//   Languages,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "../context/CartContext";
// import { useTheme } from "../context/ThemeContext";
// import { useLanguage } from "../context/LanguageContext";
// import Link from "next/link";

// const burgerLogo =
//   "https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/512/hambruger.png";

// export function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const router = useRouter();

//   const { getItemCount } = useCart();
//   const itemCount = getItemCount();

//   const { theme, toggleTheme } = useTheme();
//   const { language, toggleLanguage, t } = useLanguage();

//   return (
//     <header className="bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
//               <img
//                 src={burgerLogo}
//                 alt="MAHDEE'S Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h1 className="text-destructive font-bold">MAHDEE'S</h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             <Link
//               href="/"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("home")}
//             </Link>
//             <Link
//               href="/menu"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("menu")}
//             </Link>
//             <Link
//               href="/deals"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("deals")}
//             </Link>
//             <Link
//               href="/about"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("about")}
//             </Link>
//             <Link
//               href="/contact"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("contact")}
//             </Link>
//           </nav>

//           {/* Desktop Buttons */}
//           <div className="hidden md:flex items-center gap-2">
//             {/* Language Toggle */}
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-foreground hover:text-destructive gap-2 transition-all"
//               onClick={toggleLanguage}
//             >
//               <Languages className="h-4 w-4" />
//               <span className="text-sm">
//                 {language === "en" ? "EN" : "Roman"}
//               </span>
//             </Button>

//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-foreground hover:text-destructive transition-all"
//               onClick={toggleTheme}
//             >
//               {theme === "light" ? (
//                 <Moon className="h-5 w-5" />
//               ) : (
//                 <Sun className="h-5 w-5" />
//               )}
//             </Button>

//             {/* Admin Login */}
//             <Button
//               variant="ghost"
//               className="text-foreground hover:text-destructive gap-2"
//               onClick={() => router.push("/admin")}
//             >
//               <UserCircle className="h-5 w-5" />
//               {t("adminLogin")}
//             </Button>

//             {/* Cart */}
//             <Button
//               variant="outline"
//               size="icon"
//               className="relative"
//               onClick={() => router.push("/cart")}
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                   {itemCount}
//                 </span>
//               )}
//             </Button>

//             {/* Order Now */}
//             <Button
//               className="bg-destructive hover:bg-destructive/90"
//               onClick={() => router.push("/menu")}
//             >
//               {t("orderNow")}
//             </Button>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
//             {["home", "menu", "deals", "about", "contact"].map((page) => (
//               <Link
//                 key={page}
//                 href={`/${page === "home" ? "" : page}`}
//                 className="text-foreground hover:text-destructive transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {t(page)}
//               </Link>
//             ))}

//             {/* Mobile Theme & Language */}
//             <div className="flex gap-2 pt-2 border-t border-border">
//               <Button
//                 variant="outline"
//                 className="flex-1 gap-2"
//                 onClick={toggleLanguage}
//               >
//                 <Languages className="h-4 w-4" />
//                 {language === "en" ? "EN" : "Roman"}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 gap-2"
//                 onClick={toggleTheme}
//               >
//                 {theme === "light" ? (
//                   <Moon className="h-4 w-4" />
//                 ) : (
//                   <Sun className="h-4 w-4" />
//                 )}
//                 {theme === "light" ? "Dark" : "Light"}
//               </Button>
//             </div>

//             {/* Admin, Cart, and Order Buttons */}
//             <Button
//               variant="ghost"
//               className="text-foreground hover:text-destructive gap-2 justify-start"
//               onClick={() => {
//                 router.push("/admin");
//                 setMobileMenuOpen(false);
//               }}
//             >
//               <UserCircle className="h-5 w-5" />
//               {t("adminLogin")}
//             </Button>

//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 className="flex-1"
//                 onClick={() => {
//                   router.push("/cart");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 {t("cart")} ({itemCount})
//               </Button>
//               <Button
//                 className="bg-destructive hover:bg-destructive/90 flex-1"
//                 onClick={() => {
//                   router.push("/menu");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 {t("orderNow")}
//               </Button>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }

// "use client"; // 👈 Must be the very first line!
// import {
//   Menu,
//   ShoppingCart,
//   X,
//   UserCircle,
//   Moon,
//   Sun,
//   Languages,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "../context/CartContext";
// import { useTheme } from "../context/ThemeContext";
// import { useLanguage } from "../context/LanguageContext";
// import Link from "next/link";

// const burgerLogo =
//   "https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/512/hambruger.png";

// export function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const router = useRouter();

//   const { getItemCount } = useCart();
//   const itemCount = getItemCount();

//   const { theme, toggleTheme } = useTheme();
//   const { language, toggleLanguage, t } = useLanguage();

//   return (
//     <header className="bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
//               <img
//                 src={burgerLogo}
//                 alt="MAHDEE'S Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h1 className="text-destructive font-bold">MAHDEE'S</h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             {["home", "menu", "deals", "about", "contact"].map((page) => (
//               <Link
//                 key={page}
//                 href={`/${page === "home" ? "" : page}`}
//                 className="text-foreground hover:text-destructive transition-colors"
//               >
//                 {t(page)}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Buttons */}
//           <div className="hidden md:flex items-center gap-2">
//             {/* Language Toggle */}
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-foreground hover:text-destructive gap-2 transition-all"
//               onClick={toggleLanguage}
//             >
//               <Languages className="h-4 w-4" />
//               <span className="text-sm">
//                 {language === "en" ? "EN" : "Roman"}
//               </span>
//             </Button>

//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-foreground hover:text-destructive transition-all"
//               onClick={toggleTheme}
//             >
//               {theme === "light" ? (
//                 <Moon className="h-5 w-5" />
//               ) : (
//                 <Sun className="h-5 w-5" />
//               )}
//             </Button>

//             {/* Admin Login */}
//             <Button
//               variant="ghost"
//               className="text-foreground hover:text-destructive gap-2"
//               onClick={() => router.push("/admin")}
//             >
//               <UserCircle className="h-5 w-5" />
//               {t("adminLogin")}
//             </Button>

//             {/* Cart */}
//             <Button
//               variant="outline"
//               size="icon"
//               className="relative"
//               onClick={() => router.push("/cart")}
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                   {itemCount}
//                 </span>
//               )}
//             </Button>

//             {/* Order Now */}
//             <Button
//               className="bg-destructive hover:bg-destructive/90"
//               onClick={() => router.push("/menu")}
//             >
//               {t("orderNow")}
//             </Button>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
//             {["home", "menu", "deals", "about", "contact"].map((page) => (
//               <Link
//                 key={page}
//                 href={`/${page === "home" ? "" : page}`}
//                 className="text-foreground hover:text-destructive transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {t(page)}
//               </Link>
//             ))}

//             {/* Mobile Theme & Language */}
//             <div className="flex gap-2 pt-2 border-t border-border">
//               <Button
//                 variant="outline"
//                 className="flex-1 gap-2"
//                 onClick={toggleLanguage}
//               >
//                 <Languages className="h-4 w-4" />
//                 {language === "en" ? "EN" : "Roman"}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 gap-2"
//                 onClick={toggleTheme}
//               >
//                 {theme === "light" ? (
//                   <Moon className="h-4 w-4" />
//                 ) : (
//                   <Sun className="h-4 w-4" />
//                 )}
//                 {theme === "light" ? "Dark" : "Light"}
//               </Button>
//             </div>

//             {/* Admin, Cart, and Order Buttons */}
//             <Button
//               variant="ghost"
//               className="text-foreground hover:text-destructive gap-2 justify-start"
//               onClick={() => {
//                 router.push("/admin");
//                 setMobileMenuOpen(false);
//               }}
//             >
//               <UserCircle className="h-5 w-5" />
//               {t("adminLogin")}
//             </Button>

//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 className="flex-1"
//                 onClick={() => {
//                   router.push("/cart");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 {t("cart")} ({itemCount})
//               </Button>
//               <Button
//                 className="bg-destructive hover:bg-destructive/90 flex-1"
//                 onClick={() => {
//                   router.push("/menu");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 {t("orderNow")}
//               </Button>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }

// "use client";

// import {
//   Menu,
//   ShoppingCart,
//   X,
//   UserCircle,
//   Moon,
//   Sun,
//   Languages,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "../context/CartContext";
// import { useTheme } from "../context/ThemeContext";
// import { useLanguage } from "../context/LanguageContext";
// import Link from "next/link";

// const burgerLogo =
//   "https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/512/hambruger.png";

// export function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const router = useRouter();

//   const { getItemCount } = useCart();
//   const itemCount = getItemCount();

//   const { theme, toggleTheme } = useTheme();
//   const { language, toggleLanguage, t } = useLanguage();

//   return (
//     <header className="bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
//               <img
//                 src={burgerLogo}
//                 alt="MAHDEE'S Logo"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h1 className="text-destructive font-bold">MAHDEE'S</h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             <Link
//               href="/"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("home")}
//             </Link>
//             <Link
//               href="/menu"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("menu")}
//             </Link>
//             <Link
//               href="/deals"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("deals")}
//             </Link>
//             <Link
//               href="/about"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("about")}
//             </Link>
//             <Link
//               href="/contact"
//               className="text-foreground hover:text-destructive transition-colors"
//             >
//               {t("contact")}
//             </Link>
//           </nav>

//           {/* Desktop Buttons */}
//           <div className="hidden md:flex items-center gap-2">
//             {/* Language Toggle */}
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-foreground hover:text-destructive gap-2 transition-all"
//               onClick={toggleLanguage}
//             >
//               <Languages className="h-4 w-4" />
//               <span className="text-sm">
//                 {language === "en" ? "EN" : "Roman"}
//               </span>
//             </Button>

//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-foreground hover:text-destructive transition-all"
//               onClick={toggleTheme}
//             >
//               {theme === "light" ? (
//                 <Moon className="h-5 w-5" />
//               ) : (
//                 <Sun className="h-5 w-5" />
//               )}
//             </Button>

//             {/* Admin Login */}
//             <Button
//               variant="ghost"
//               className="text-foreground hover:text-destructive gap-2"
//               onClick={() => router.push("/admin")}
//             >
//               <UserCircle className="h-5 w-5" />
//               {t("adminLogin")}
//             </Button>

//             {/* Cart */}
//             <Button
//               variant="outline"
//               size="icon"
//               className="relative"
//               onClick={() => router.push("/cart")}
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                   {itemCount}
//                 </span>
//               )}
//             </Button>

//             {/* Order Now */}
//             <Button
//               className="bg-destructive hover:bg-destructive/90"
//               onClick={() => router.push("/menu")}
//             >
//               {t("orderNow")}
//             </Button>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {mobileMenuOpen && (
//           <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
//             {["home", "menu", "deals", "about", "contact"].map((page) => (
//               <Link
//                 key={page}
//                 href={`/${page === "home" ? "" : page}`}
//                 className="text-foreground hover:text-destructive transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {t(page)}
//               </Link>
//             ))}

//             {/* Mobile Theme & Language */}
//             <div className="flex gap-2 pt-2 border-t border-border">
//               <Button
//                 variant="outline"
//                 className="flex-1 gap-2"
//                 onClick={toggleLanguage}
//               >
//                 <Languages className="h-4 w-4" />
//                 {language === "en" ? "EN" : "Roman"}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 gap-2"
//                 onClick={toggleTheme}
//               >
//                 {theme === "light" ? (
//                   <Moon className="h-4 w-4" />
//                 ) : (
//                   <Sun className="h-4 w-4" />
//                 )}
//                 {theme === "light" ? "Dark" : "Light"}
//               </Button>
//             </div>

//             {/* Admin, Cart, and Order Buttons */}
//             <Button
//               variant="ghost"
//               className="text-foreground hover:text-destructive gap-2 justify-start"
//               onClick={() => {
//                 router.push("/admin");
//                 setMobileMenuOpen(false);
//               }}
//             >
//               <UserCircle className="h-5 w-5" />
//               {t("adminLogin")}
//             </Button>

//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 className="flex-1"
//                 onClick={() => {
//                   router.push("/cart");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 {t("cart")} ({itemCount})
//               </Button>
//               <Button
//                 className="bg-destructive hover:bg-destructive/90 flex-1"
//                 onClick={() => {
//                   router.push("/menu");
//                   setMobileMenuOpen(false);
//                 }}
//               >
//                 {t("orderNow")}
//               </Button>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// }

// // import {                                                                                                                                                        import {
// //   Menu,
// //   ShoppingCart,
// //   X,
// //   UserCircle,
// //   Moon,
// //   Sun,
// //   Languages}from "lucide-react";
// // import { Button } from "./ui/button";
// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useCart } from "../context/CartContext";
// // import { useTheme } from "../context/ThemeContext";
// // import { useLanguage } from "../context/LanguageContext";

// // const burgerLogo = "https://cdn2.iconfinder.com/data/icons/tasty-bites-icon-set/512/hambruger.png";

// // export function Header() {
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const navigate = useNavigate();
// //   const { getItemCount } = useCart();
// //   const itemCount = getItemCount();
// //   const { theme, toggleTheme } = useTheme();
// //   const { language, toggleLanguage, t } = useLanguage();

// //   return (
// //     <header className="bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
// //       <div className="container mx-auto px-4 py-4">
// //         <div className="flex items-center justify-between">
// //           <Link to="/" className="flex items-center gap-2">
// //             <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
// //               <img src={burgerLogo} alt="MAHDEE'S Logo" className="w-full h-full object-cover" />
// //             </div>
// //             <h1 className="text-destructive">MAHDEE'S</h1>
// //           {/* {<h1
// //   className="text-[1rem] font-bold text-white"
// //   style={{
// //     color: 'white',
// //     WebkitTextStroke: '1.4px red'
// //   }}
// // >
// //   MAHDEE'S
// // </h1>} */}
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <nav className="hidden md:flex items-center gap-8">
// //             <Link
// //               to="/"
// //               className="text-foreground hover:text-destructive transition-colors"
// //             >
// //               {t("home")}
// //             </Link>
// //             <Link
// //               to="/menu"
// //               className="text-foreground hover:text-destructive transition-colors"
// //             >
// //               {t("menu")}
// //             </Link>
// //             <Link
// //               to="/deals"
// //               className="text-foreground hover:text-destructive transition-colors"
// //             >
// //               {t("deals")}
// //             </Link>
// //             <Link
// //               to="/about"
// //               className="text-foreground hover:text-destructive transition-colors"
// //             >
// //               {t("about")}
// //             </Link>
// //             <Link
// //               to="/contact"
// //               className="text-foreground hover:text-destructive transition-colors"
// //             >
// //               {t("contact")}
// //             </Link>
// //           </nav>

// //           <div className="hidden md:flex items-center gap-2">
// //             {/* Language Toggle */}
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               className="text-foreground hover:text-destructive gap-2 transition-all"
// //               onClick={toggleLanguage}
// //             >
// //               <Languages className="h-4 w-4" />
// //               <span className="text-sm">
// //                 {language === "en" ? "EN" : "Roman"}
// //               </span>
// //             </Button>

// //             {/* Theme Toggle */}
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               className="text-foreground hover:text-destructive transition-all"
// //               onClick={toggleTheme}
// //             >
// //               {theme === "light" ? (
// //                 <Moon className="h-5 w-5" />
// //               ) : (
// //                 <Sun className="h-5 w-5" />
// //               )}
// //             </Button>

// //             <Button
// //               variant="ghost"
// //               className="text-foreground hover:text-destructive gap-2"
// //               onClick={() => navigate("/admin")}
// //             >
// //               <UserCircle className="h-5 w-5" />
// //               {t("adminLogin")}
// //             </Button>
// //             <Button
// //               variant="outline"
// //               size="icon"
// //               className="relative"
// //               onClick={() => navigate("/cart")}
// //             >
// //               <ShoppingCart className="h-5 w-5" />
// //               {itemCount > 0 && (
// //                 <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
// //                   {itemCount}
// //                 </span>
// //               )}
// //             </Button>
// //             <Button
// //               className="bg-destructive hover:bg-destructive/90"
// //               onClick={() => navigate("/menu")}
// //             >
// //               {t("orderNow")}
// //             </Button>
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <button
// //             className="md:hidden"
// //             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //           >
// //             {mobileMenuOpen ? (
// //               <X className="h-6 w-6" />
// //             ) : (
// //               <Menu className="h-6 w-6" />
// //             )}
// //           </button>
// //         </div>

// //         {/* Mobile Navigation */}
// //         {mobileMenuOpen && (
// //           <nav className="md:hidden mt-4 flex flex-col gap-4 pb-4">
// //             <Link
// //               to="/"
// //               className="text-foreground hover:text-destructive transition-colors"
// //               onClick={() => setMobileMenuOpen(false)}
// //             >
// //               {t("home")}
// //             </Link>
// //             <Link
// //               to="/menu"
// //               className="text-foreground hover:text-destructive transition-colors"
// //               onClick={() => setMobileMenuOpen(false)}
// //             >
// //               {t("menu")}
// //             </Link>
// //             <Link
// //               to="/deals"
// //               className="text-foreground hover:text-destructive transition-colors"
// //               onClick={() => setMobileMenuOpen(false)}
// //             >
// //               {t("deals")}
// //             </Link>
// //             <Link
// //               to="/about"
// //               className="text-foreground hover:text-destructive transition-colors"
// //               onClick={() => setMobileMenuOpen(false)}
// //             >
// //               {t("about")}
// //             </Link>
// //             <Link
// //               to="/contact"
// //               className="text-foreground hover:text-destructive transition-colors"
// //               onClick={() => setMobileMenuOpen(false)}
// //             >
// //               {t("contact")}
// //             </Link>

// //             {/* Mobile Theme and Language Toggles */}
// //             <div className="flex gap-2 pt-2 border-t border-border">
// //               <Button
// //                 variant="outline"
// //                 className="flex-1 gap-2"
// //                 onClick={toggleLanguage}
// //               >
// //                 <Languages className="h-4 w-4" />
// //                 {language === "en" ? "EN" : "Roman"}
// //               </Button>
// //               <Button
// //                 variant="outline"
// //                 className="flex-1 gap-2"
// //                 onClick={toggleTheme}
// //               >
// //                 {theme === "light" ? (
// //                   <Moon className="h-4 w-4" />
// //                 ) : (
// //                   <Sun className="h-4 w-4" />
// //                 )}
// //                 {theme === "light" ? "Dark" : "Light"}
// //               </Button>
// //             </div>

// //             <Button
// //               variant="ghost"
// //               className="text-foreground hover:text-destructive gap-2 justify-start"
// //               onClick={() => {
// //                 navigate("/admin");
// //                 setMobileMenuOpen(false);
// //               }}
// //             >
// //               <UserCircle className="h-5 w-5" />
// //               {t("adminLogin")}
// //             </Button>
// //             <div className="flex gap-2">
// //               <Button
// //                 variant="outline"
// //                 className="flex-1"
// //                 onClick={() => {
// //                   navigate("/cart");
// //                   setMobileMenuOpen(false);
// //                 }}
// //               >
// //                 <ShoppingCart className="h-5 w-5 mr-2" />
// //                 {t("cart")} ({itemCount})
// //               </Button>
// //               <Button
// //                 className="bg-destructive hover:bg-destructive/90 flex-1"
// //                 onClick={() => {
// //                   navigate("/menu");
// //                   setMobileMenuOpen(false);
// //                 }}
// //               >
// //                 {t("orderNow")}
// //               </Button>
// //             </div>
// //           </nav>
// //         )}
// //       </div>
// //     </header>
// //   );
// // }
