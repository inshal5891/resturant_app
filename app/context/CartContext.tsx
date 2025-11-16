"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// 🛒 Type for a single cart item
export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

// 🎯 Type for the entire CartContext
interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

// 🧠 Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 🪄 CartProvider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // (Optional) — persist cart in localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ➕ Add item
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // ❌ Remove item
  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 🔄 Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // 🧹 Clear all
  const clearCart = () => setItems([]);

  // 💰 Total price
  const getTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
  };

  // 🧮 Total quantity
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 🪝 Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// export interface CartItem {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
//   quantity: number;
// }

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (item: Omit<CartItem, "quantity">) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   getTotal: () => number;
//   getItemCount: () => number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addToCart = (item: Omit<CartItem, "quantity">) => {
//     setItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prevItems, { ...item, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setItems([]);
//   };

//   const getTotal = () => {
//     return items.reduce((total, item) => {
//       const price = parseFloat(item.price.replace("$", ""));
//       return total + price * item.quantity;
//     }, 0);
//   };

//   const getItemCount = () => {
//     return items.reduce((count, item) => count + item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         getTotal,
//         getItemCount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }
