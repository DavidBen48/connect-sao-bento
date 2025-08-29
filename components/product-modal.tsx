"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formats"

interface Product {
  id: number
  name: string
  description: string
  image: string
  pixPrice: number
  cardPrice: number
}

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (quantity: number, paymentMethod: "pix" | "card") => void
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")

  const price = paymentMethod === "pix" ? product.pixPrice : product.cardPrice
  const total = price * quantity

  const handleSubmit = () => {
    onAddToCart(quantity, paymentMethod)
    setQuantity(1)
    setPaymentMethod("pix")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-auto"
          >
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Payment Method */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Método de Pagamento</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={paymentMethod === "pix" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("pix")}
                      className="justify-start hover:bg-white hover:text-black transition-colors"
                    >
                      <span className="text-sm">Pix - {formatCurrency(product.pixPrice)}</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("card")}
                      className="justify-start hover:bg-white hover:text-black transition-colors"
                    >
                      <span className="text-sm">Cartão - {formatCurrency(product.cardPrice)}</span>
                    </Button>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Quantidade</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-accent">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  size="lg"
                >
                  Adicionar ao Carrinho
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
