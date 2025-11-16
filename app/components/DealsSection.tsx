import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, Percent, Gift } from "lucide-react";
import { toast } from "sonner";

const deals = [
  {
    id: 1,
    icon: Percent,
    title: "20% Off First Order",
    description: "Sign up and get 20% off your first online order",
    code: "FIRST20",
  },
  {
    id: 2,
    icon: Clock,
    title: "Happy Hour Special",
    description: "Buy one burger, get one 50% off from 2-5 PM",
    code: "HAPPY50",
  },
  {
    id: 3,
    icon: Gift,
    title: "Family Meal Deal",
    description: "4 burgers + 4 sides + 4 drinks for only $39.99",
    code: "FAMILY",
  },
];

export function DealsSection() {
  const handleClaimDeal = (code: string, title: string) => {
    // Try to copy to clipboard, fallback to toast if blocked
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(
        () => {
          toast.success(`${title} code copied! Use "${code}" at checkout.`);
        },
        () => {
          toast.success(`Deal claimed! Use code "${code}" at checkout.`);
        }
      );
    } else {
      toast.success(`Deal claimed! Use code "${code}" at checkout.`);
    }
  };

  return (
    <section id="deals" className="py-16 bg-destructive text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-white">Special Deals</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            Don't miss out on our amazing offers and limited-time deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="p-6 bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
              <div className="mb-4">
                <deal.icon className="h-12 w-12 text-white" />
              </div>
              <h3 className="mb-2 text-white">{deal.title}</h3>
              <p className="mb-4 opacity-90">{deal.description}</p>
              <div className="flex items-center justify-between">
                <code className="px-3 py-1 bg-white/20 rounded">
                  {deal.code}
                </code>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-destructive"
                  onClick={() => handleClaimDeal(deal.code, deal.title)}
                >
                  Claim Deal
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
