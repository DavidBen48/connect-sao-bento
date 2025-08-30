"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { FAQ_ITEMS } from "@/lib/constants"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-accent">FAQ</span>
          </h2>
          <p className="text-muted-foreground text-lg">
          <span className="text-accent">Perguntas</span> frequentes sobre nossas blusas<span className="text-accent">!</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {FAQ_ITEMS.map((item, index) => (
            <Card key={index} className="overflow-hidden border-2 border-white/30">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold text-lg"><span className="text-accent">- </span>{item.question}<span className="text-accent">?</span></h3>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-muted-foreground text-accent" />
                </motion.div> 
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-muted-foreground">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
