"use client"

import { CartProvider } from "@/hooks/use-cart"
import { Navbar } from "@/components/navbar"
import { CartPage } from "@/components/cart-page"
import { Footer } from "@/components/footer"

export default function Carrinho() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <CartPage />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
