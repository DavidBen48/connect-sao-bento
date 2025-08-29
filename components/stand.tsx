"use client"

import { motion } from "framer-motion"
import { Carousel } from "./carousel"

export function Stand() {
  return (
    <section id="stand" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Stand de <span className="text-accent">Blusa</span>
          </h2>
          <p className="text-muted-foreground text-lg">Escolha sua blusa e viva a fé com estilo</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Carousel />
        </motion.div>
      </div>
    </section>
  )
}
