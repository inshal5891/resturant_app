"use client";
import { Hero } from "../components/Hero";
import { MenuSection } from "../components/MenuSection";
import { DealsSection } from "../components/DealsSection";
import { AboutSection } from "../components/AboutSection";

export function HomePage() {
  return (
    <>
      <Hero />
      <MenuSection />
      <DealsSection />
      <AboutSection />
    </>
  );
}
