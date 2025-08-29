"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/DavidBen48", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/davidben81/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/davidben_sax", label: "Instagram" },
  ]

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center space-x-4 mb-6">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="sm"
                asChild
                className="transition-all duration-300 hover:-translate-y-1"
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>

          <p className="text-muted-foreground text-sm">© 2025 — Criado por David Ben — Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}
