"use client";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1644447381290-85358ae625cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MTE4MjIwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Delicious burgers"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="container mx-auto px-4 z-20 text-center text-white">
        <h1 className="text-5xl md:text-7xl mb-6 whitespace-pre-line">
          {t("heroTitle")}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-destructive hover:bg-destructive/90 text-lg px-8"
            onClick={() => router.push("/menu")}
          >
            {t("orderNow")}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-foreground"
            onClick={() => router.push("/menu")}
          >
            {t("menu")}
          </Button>
        </div>
      </div>
    </section>
  );
}
