"use client";

import { useCart } from "@/components/bakery/CartContext";
import { Navbar } from "@/components/bakery/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProviderWrapper>
          <LayoutContent>{children}</LayoutContent>
        </CartProviderWrapper>
      </body>
    </html>
  );
}


// Separate component to use the context
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { itemCount } = useCart();

  const bakeryFont = {
    fontFamily: "'Playfair Display', serif"
  };

  const style = `
    @keyframes fadeIn {
      from { opacity: 0 }
      to { opacity: 1 }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-in-out;
    }
  `;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-emerald-900 to-amber-100 selection:bg-white/20"
      style={bakeryFont}
    >
      <style>{style}</style>
      <Navbar itemCount={itemCount} />
      <main className="animate-fadeIn min-h-[calc(100vh-100px)]">
        {children}
      </main>
    </div>
  );
}



// Import dynamic to avoid hydration error if needed, but simple wrapper for now
import { CartProvider } from "@/components/bakery/CartContext";
function CartProviderWrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
