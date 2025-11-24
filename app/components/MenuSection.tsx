"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

const categories = [
  { id: "burgers", name: "Burgers" },
  { id: "sides", name: "Sides" },
  { id: "drinks", name: "Drinks" },
  { id: "desserts", name: "Desserts" },
];

const menuItems = {
  burgers: [
    {
      id: 1,
      name: "Classic Burger",
      description: "Beef patty, lettuce, tomato, onion, pickles",
      price: "$8.99",
      image:
        "https://images.unsplash.com/photo-1641242307123-80488916bac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXJ8ZW58MXx8fHwxNzYxMjIxMTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Bacon Deluxe",
      description: "Double beef patty, bacon, cheese, BBQ sauce",
      price: "$12.99",
      image:
        "https://images.unsplash.com/photo-1641242307123-80488916bac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXJ8ZW58MXx8fHwxNzYxMjIxMTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Veggie Supreme",
      description: "Plant-based patty, avocado, sprouts",
      price: "$9.99",
      image:
        "https://images.unsplash.com/photo-1641242307123-80488916bac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXJ8ZW58MXx8fHwxNzYxMjIxMTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Spicy Chicken",
      description: "Crispy chicken, jalapeños, spicy mayo",
      price: "$10.99",
      image:
        "https://images.unsplash.com/photo-1641242307123-80488916bac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBidXJnZXJ8ZW58MXx8fHwxNzYxMjIxMTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
  sides: [
    {
      id: 5,
      name: "French Fries",
      description: "Crispy golden fries with sea salt",
      price: "$3.99",
      image:
        "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjEyMjkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 6,
      name: "Chicken Nuggets",
      description: "8 pieces with choice of dipping sauce",
      price: "$5.99",
      image:
        "https://images.unsplash.com/photo-1627662168223-7df99068099a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbnVnZ2V0c3xlbnwxfHx8fDE3NjExNjU0MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 7,
      name: "Onion Rings",
      description: "Crispy breaded onion rings",
      price: "$4.99",
      image:
        "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjEyMjkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 8,
      name: "Mozzarella Sticks",
      description: "6 pieces with marinara sauce",
      price: "$6.99",
      image:
        "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjEyMjkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
  drinks: [
    {
      id: 9,
      name: "Milkshake",
      description: "Chocolate, vanilla, or strawberry",
      price: "$4.99",
      image:
        "https://images.unsplash.com/photo-1534449369274-82e4ad08bf35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2UlMjBkcmlua3xlbnwxfHx8fDE3NjExNDU1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 10,
      name: "Soft Drink",
      description: "Coca-Cola, Sprite, Fanta",
      price: "$2.49",
      image:
        "https://images.unsplash.com/photo-1735643434124-f51889fa1f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwZHJpbmt8ZW58MXx8fHwxNzYxMjM5NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 11,
      name: "Iced Coffee",
      description: "Fresh brewed with ice",
      price: "$3.99",
      image:
        "https://images.unsplash.com/photo-1735643434124-f51889fa1f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwZHJpbmt8ZW58MXx8fHwxNzYxMjM5NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 12,
      name: "Lemonade",
      description: "Freshly squeezed daily",
      price: "$2.99",
      image:
        "https://images.unsplash.com/photo-1735643434124-f51889fa1f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwZHJpbmt8ZW58MXx8fHwxNzYxMjM5NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
  desserts: [
    {
      id: 13,
      name: "Ice Cream Sundae",
      description: "Three scoops with toppings",
      price: "$5.99",
      image:
        "https://images.unsplash.com/photo-1663904458920-f153c162fa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxMjE5ODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 14,
      name: "Apple Pie",
      description: "Warm with vanilla ice cream",
      price: "$4.99",
      image:
        "https://images.unsplash.com/photo-1663904458920-f153c162fa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxMjE5ODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 15,
      name: "Chocolate Brownie",
      description: "Rich and fudgy",
      price: "$3.99",
      image:
        "https://images.unsplash.com/photo-1663904458920-f153c162fa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxMjE5ODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 16,
      name: "Cookies",
      description: "Chocolate chip - 3 pieces",
      price: "$2.99",
      image:
        "https://images.unsplash.com/photo-1663904458920-f153c162fa79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxMjE5ODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
};

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("burgers");
  const { addToCart } = useCart();

  const handleAddToCart = (item: {
    id: number;
    name: string;
    price: string;
    image: string;
  }) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <section id="menu" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our Menu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious selection of burgers, sides, drinks, and
            desserts
          </p>
        </div>

        {/* Category Tabs */}
        {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              className={`transition-colors duration-300 ${
                activeCategory === category.id
                  ? "bg-destructive hover:bg-destructive/90 text-white"
                  : "bg-destructive/80 hover:bg-destructive text-white"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div> */}

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{ backgroundColor:  "#d4183D"  }} // B2 = 70% opacity
                className={`
          px-4 py-2 rounded-lg font-medium text-white shadow-md transition-all duration-300
          ${
            isActive
              ? "scale-105 shadow-lg"
              : "hover:scale-105 hover:brightness-110"
          }
        `}
              >
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3>{item.name}</h3>
                  <span className="text-destructive">{item.price}</span>
                </div>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <Button
                  className="w-full bg-destructive hover:bg-destructive/90"
                  onClick={() => handleAddToCart(item)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
