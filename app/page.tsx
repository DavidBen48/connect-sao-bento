"use client"

import { CartProvider } from "@/hooks/use-cart"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Stand } from "@/components/stand"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Stand />
          <FAQ />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}
