"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";
import { postOrder, ApiError } from "../apis/api"; // Use the centralized API

export function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [isClient, setIsClient] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Guard router operations to client-only via useEffect
  useEffect(() => {
    setIsClient(true);
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    // Ensure there's at least one item
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      setIsSubmitting(false);
      return;
    }

    // Build payload matching OrderIn expected by the API
    const subtotal = getTotal();
    const deliveryFee = deliveryType === "delivery" ? 3.99 : 0;
    const tax = subtotal * 0.08;
    const total_price = +(subtotal + deliveryFee + tax).toFixed(2);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        quantity: it.quantity,
        price: parseFloat(String(it.price).replace("$", "")).toFixed(2),
      })),
      total_price,
      delivery_type: deliveryType,
      address:
        deliveryType === "delivery"
          ? `${formData.address}${formData.city ? ", " + formData.city : ""}${formData.zipCode ? " " + formData.zipCode : ""}`
          : "",
    };
    // Some backends expect a singular `item` field (validation schema). Include a
    // fallback `item` property so both shapes are supported.
    // The backend in this project expects `item` to be a string (validation
    // returned a `string_type` error). Send a JSON-stringified version so the
    // server receives a string while we still keep `items` as an array.
    (payload as any).item = payload.items.length === 1
      ? JSON.stringify(payload.items[0])
      : JSON.stringify(payload.items);

    try {
      // postOrder now returns parsed JSON (or throws ApiError on non-OK responses)
      const result = await postOrder(payload);

      toast.success("Order placed successfully! Estimated delivery: 30-45 minutes");
      clearCart();
      router.push("/");
      return result;
    } catch (err: any) {
      if (err instanceof ApiError) {
        setApiError(err.message);
        toast.error(err.message);
        console.error("postOrder ApiError payload:", err.payload);
        console.error("postOrder ApiError raw:", (err as any).raw ?? null);
        // Also log the outgoing payload for easier server-side correlation
        try {
          console.error("Outgoing payload:", JSON.stringify(payload, null, 2));
        } catch (e) {
          console.error("Outgoing payload (could not stringify)", payload);
        }
      } else {
        const msg = err?.message || "Failed to place order";
        setApiError(msg);
        toast.error(msg);
        console.error("postOrder error:", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Skip rendering on server if empty cart
  if (!isClient || items.length === 0) {
    return null;
  }

  const subtotal = getTotal();
  const deliveryFee = deliveryType === "delivery" ? 3.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="bg-destructive text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white mb-4">Checkout</h1>
          <p className="text-xl opacity-90">
            Complete your order details
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {apiError && (
                  <div className="rounded-md bg-red-50 p-3 text-red-700">
                    {apiError}
                  </div>
                )}
                {/* Delivery Type */}
                <Card className="p-6">
                  <h3 className="mb-4">Delivery Method</h3>
                  <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="cursor-pointer">
                        Delivery ($3.99)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="cursor-pointer">
                        Pick Up (Free)
                      </Label>
                    </div>
                  </RadioGroup>
                </Card>

                {/* Contact Information */}
                <Card className="p-6">
                  <h3 className="mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        // required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="03122*****"
                        required
                      />
                    </div>
                  </div>
                </Card>

                {/* Delivery Address */}
                {deliveryType === "delivery" && (
                  <Card className="p-6">
                    <h3 className="mb-4">Delivery Address</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 Main St, Apt 4B"
                          required={deliveryType === "delivery"}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="karachi"
                            required={deliveryType === "delivery"}
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="10001"
                            // required={deliveryType === "delivery"}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Payment Information
                <Card className="p-6">
                  <h3 className="mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                    //   /> */}
                    {/* // </div>
                    // <div className="grid grid-cols-2 gap-4">
                    //   <div>
                    //     <Label htmlFor="cardExpiry">Expiry Date</Label>
                    //     <Input */}
                    {/* //       id="cardExpiry"
                    //       name="cardExpiry"
                    //       value={formData.cardExpiry}
                    //       onChange={handleChange}
                    //       placeholder="MM/YY"
                    //       required
                    //     />
                    //   </div> */}
                    {/* //   <div>
                    //     <Label htmlFor="cardCVC">CVC</Label>
                    //     <Input */}
                    {/* //       id="cardCVC"
                  //         name="cardCVC"
                  //         value={formData.cardCVC}
                  //         onChange={handleChange}
                  //         placeholder="123"
                  //         required
                  //       /> */}
                  {/* //     </div>
                  //   </div>
                  // </div>
                // </Card> */}

                <Button
                  type="submit"
                  className="w-full bg-destructive hover:bg-destructive/90"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Placing order..." : `Place Order - ${total.toFixed(2)}`}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span>
                        ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {deliveryType === "delivery" ? "Delivery Fee" : "Pickup"}
                    </span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-destructive">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

