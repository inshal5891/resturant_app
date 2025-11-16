import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "MAHDEE'S Restaurant",
  description: "Fast food ordering app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
// "use client";

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// // ✅ Correct imports
// import { Header } from "./components/Header";
// import { CartProvider } from "./context/CartContext";
// import { ThemeProvider } from "./context/ThemeContext";
// import { LanguageProvider } from "./context/LanguageContext";

// // ✅ Fonts
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // ✅ Page metadata
// export const metadata: Metadata = {
//   title: "MAHDEE'S Restaurant",
//   description: "Fast food ordering app built with Next.js",
// };

// // ✅ Root layout with all providers
// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <ThemeProvider>
//           <LanguageProvider>
//             <CartProvider>
//               <Header />
//               <main>{children}</main>
//             </CartProvider>
//           </LanguageProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
