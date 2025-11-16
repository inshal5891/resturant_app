"use client";
import { DealsSection } from "../components/DealsSection";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Clock } from "lucide-react";

export function DealsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-destructive text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white mb-4">Special Offers</h1>
          <p className="text-xl opacity-90">
            Save big with our exclusive deals and promotions
          </p>
        </div>
      </div>
      
      <DealsSection />
      
      {/* Limited Time Offers */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Limited Time Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-destructive/20">
              <div className="flex items-center gap-2 text-destructive mb-4">
                <Clock className="h-5 w-5" />
                <span>Ends in 3 days</span>
              </div>
              <h3 className="mb-2">Weekend Special</h3>
              <p className="text-muted-foreground mb-4">
                Get 2 burgers + 2 drinks + 1 large fries for just $24.99
              </p>
              <Button className="w-full bg-destructive hover:bg-destructive/90">
                Order Now
              </Button>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-destructive/20">
              <div className="flex items-center gap-2 text-destructive mb-4">
                <Clock className="h-5 w-5" />
                <span>Ends in 1 week</span>
              </div>
              <h3 className="mb-2">Student Discount</h3>
              <p className="text-muted-foreground mb-4">
                Show your student ID and get 15% off your entire order
              </p>
              <Button className="w-full bg-destructive hover:bg-destructive/90">
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
