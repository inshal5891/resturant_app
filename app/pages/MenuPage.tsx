"use client";
import { useRouter } from "next/navigation";
import { MenuSection } from "../components/MenuSection";
import { Button } from "../components/ui/button";

export function MenuPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="bg-destructive text-white py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">Fresh Burgers</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Made Daily</h2>
          <p className="text-lg opacity-90 mb-6">
            Experience the perfect blend of quality ingredients and bold flavors
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button
              className="bg-white text-destructive px-6 py-3"
              onClick={() => router.push("/cart")}
            >
              Order Now
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>Menu</Button>
          </div>
        </div>
      </div>

      <MenuSection />
    </div>
  );
}
