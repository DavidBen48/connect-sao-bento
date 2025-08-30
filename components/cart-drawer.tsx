"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/formats"
import { useState } from "react"
import { CheckoutForm } from "./checkout-form"

export function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  const handleCheckout = () => {
    if (items.length > 0) {
      setShowCheckout(true)
    }
  }

  const handleCheckoutComplete = () => {
    setShowCheckout(false)
    clearCart()
    toggleCart()
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={toggleCart}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-xl font-bold">Faça seu Pedido Agora</h2>
                  <Button variant="ghost" size="sm" onClick={toggleCart}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <p>Nenhum produto selecionado ainda</p>
                      <p className="text-sm mt-2">Adicione produtos para fazer seu pedido via WhatsApp</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <Card key={`${item.id}-${item.paymentMethod}`} className="p-4 border-2 border-white/30">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground capitalize">
                                {item.paymentMethod === "pix" ? "Pix" : "Cartão"}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeItem(item.id, item.paymentMethod)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.paymentMethod, Math.max(1, item.quantity - 1))
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.paymentMethod, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">{formatCurrency(item.unitPrice)} cada</div>
                              <div className="font-semibold">{formatCurrency(item.unitPrice * item.quantity)}</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="border-t border-border p-6">
                    <div className="flex justify-between items-center mb-4 text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-accent">{formatCurrency(total)}</span>
                    </div>

                    <div className="text-center mb-4 text-sm text-muted-foreground">
                      <p>Você será redirecionado para o WhatsApp da</p>
                      <p className="font-semibold text-foreground">Líder Quéren Mota</p>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      size="lg"
                    >
                      Enviar Pedido via WhatsApp
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CheckoutForm
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onComplete={handleCheckoutComplete}
        items={items}
      />
    </>
  )
}
