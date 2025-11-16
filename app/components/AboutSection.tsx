import { Card } from "./ui/card";
import { Flame, Heart, Clock } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Flame,
    title: "Fresh Ingredients",
    description: "We use only the freshest, locally sourced ingredients for every burger",
  },
  {
    id: 2,
    icon: Heart,
    title: "Made with Love",
    description: "Each burger is crafted with care and passion by our expert chefs",
  },
  {
    id: 3,
    icon: Clock,
    title: "Fast Service",
    description: "Quick preparation without compromising on quality or taste",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Why Choose MAHDEE'S?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're passionate about serving the best burgers in town with exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <Card key={feature.id} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-8 md:p-12 text-center">
          <h3 className="mb-4">Our Story</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Founded in 2010, MAHDEE'S started with a simple mission: to serve the most delicious,
            high-quality burgers using fresh ingredients and time-tested recipes. Over the years, we've
            grown from a small local joint to a beloved fast-food destination, but our commitment to
            quality and customer satisfaction remains unchanged.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-8">
            <div>
              <div className="text-3xl text-destructive mb-2">500K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl text-destructive mb-2">15+</div>
              <div className="text-muted-foreground">Locations</div>
            </div>
            <div>
              <div className="text-3xl text-destructive mb-2">50+</div>
              <div className="text-muted-foreground">Menu Items</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
