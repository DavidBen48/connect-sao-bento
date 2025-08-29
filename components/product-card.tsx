"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formats"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  description: string
  image: string
  pixPrice: number
  cardPrice: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const handleQueroEssa = () => {
    router.push("/carrinho")
  }

  return (
    <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.3 }} className="w-full max-w-sm mx-auto">
      <Card className="overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
          <p className="text-muted-foreground mb-4 text-sm">{product.description}</p>

          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Cartão: <span className="font-semibold text-foreground">{formatCurrency(product.cardPrice)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Pix: <span className="font-semibold text-accent">{formatCurrency(product.pixPrice)}</span>
              </div>
            </div>

            <Button
              onClick={handleQueroEssa}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              Quero Essa!
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
