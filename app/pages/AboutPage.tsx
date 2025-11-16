"use client";
import { AboutSection } from "../components/AboutSection";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-destructive text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white mb-4">About MAHDEE'S</h1>
          <p className="text-xl opacity-90">
            Learn more about our story, values, and commitment to quality
          </p>
        </div>
      </div>
      
      <AboutSection />
      
      {/* Team Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our passionate team of chefs and staff work hard to bring you the best dining experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "John Smith", role: "Head Chef", experience: "15 years" },
              { name: "Sarah Johnson", role: "Restaurant Manager", experience: "10 years" },
              { name: "Mike Brown", role: "Executive Chef", experience: "12 years" },
            ].map((member, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-5xl">👨‍🍳</span>
                </div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-destructive mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.experience} experience</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Our Values</h2>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="mb-2">Quality First</h3>
                <p className="text-muted-foreground">
                  We never compromise on the quality of our ingredients. Every item on our menu 
                  is prepared with fresh, locally sourced ingredients to ensure the best taste.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="mb-2">Customer Satisfaction</h3>
                <p className="text-muted-foreground">
                  Your happiness is our priority. We strive to provide exceptional service and 
                  delicious food that keeps you coming back for more.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="mb-2">Community Focused</h3>
                <p className="text-muted-foreground">
                  We're proud to be part of the local community and support local farmers and 
                  suppliers. We believe in giving back and making a positive impact.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
