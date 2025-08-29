"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FancyText } from "./fancy-text"

export function Hero() {
  const scrollToStand = () => {
    const element = document.getElementById("stand")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            <FancyText>{"{Connect} {S}ão {B}ento"}</FancyText>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8">Save the Date: 25 e 26 de Outubro de 2025.</p>

          <div className="text-lg md:text-xl mb-12 h-8">
            <FancyText typewriterWords={["fé", "propósito", "comunhão", "esperança"]}>Conecte-se com </FancyText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={scrollToStand}
              className="text-lg px-8 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Ver Stand
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
