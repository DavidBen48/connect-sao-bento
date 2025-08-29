"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, ShoppingCart } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { FancyText } from "./fancy-text"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState("hero")
  const [mounted, setMounted] = useState(false)
  const { items } = useCart()
  const pathname = usePathname()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const isCartPage = pathname === "/carrinho"

  useEffect(() => {
    setMounted(true)

    if (isCartPage) return

    const handleScroll = () => {
      const sections = ["hero", "stand", "faq"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isCartPage])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
        <span className="text-accent">C</span>onnect <span className="text-accent">SB</span>
        </Link>

        {/* Navigation Links - only show on home page */}
        {!isCartPage && (
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "stand", label: "Stand de Blusa" },
              { id: "faq", label: "FAQ" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors hover:text-accent ${
                  activeSection === item.id ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Button - only show on home page */}
          {!isCartPage && (
            <Link href="/carrinho">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Button>
            </Link>
          )}

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
