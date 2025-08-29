"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/formats"
import { sendWhatsAppOrder } from "@/lib/whatsapp"
import { PRODUCTS } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function CartPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCart()
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<Record<number, "pix" | "card">>({})

  const handleProductSelect = (productId: number, paymentMethod: "pix" | "card") => {
    const product = PRODUCTS.find((p) => p.id === productId)
    if (!product) return

    const price = paymentMethod === "pix" ? product.pixPrice : product.cardPrice
    const existingItem = items.find((item) => item.id === productId)

    if (existingItem) {
      // Update existing item with new payment method and price
      removeItem(productId)
      addItem({
        id: productId,
        name: product.name,
        quantity: existingItem.quantity,
        paymentMethod,
        unitPrice: price,
      })
    } else {
      // Add new item
      addItem({
        id: productId,
        name: product.name,
        quantity: 1,
        paymentMethod,
        unitPrice: price,
      })
    }

    setSelectedPaymentMethods((prev) => ({
      ...prev,
      [productId]: paymentMethod,
    }))
  }

  const handleFinishOrder = () => {
    if (items.length === 0) return
    sendWhatsAppOrder(items)
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Faça seu Pedido Agora</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Escolha suas Blusas</h2>

          {PRODUCTS.map((product) => {
            const cartItem = items.find((item) => item.id === product.id)
            const selectedPayment = selectedPaymentMethods[product.id] || "pix"

            return (
              <Card key={product.id} className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>

                    <div className="flex gap-2 mb-3">
                      <Button
                        variant={selectedPayment === "pix" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleProductSelect(product.id, "pix")}
                        className="text-xs hover:bg-white hover:text-black"
                      >
                        PIX {formatCurrency(product.pixPrice)}
                      </Button>
                      <Button
                        variant={selectedPayment === "card" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleProductSelect(product.id, "card")}
                        className="text-xs hover:bg-white hover:text-black"
                      >
                        Cartão {formatCurrency(product.cardPrice)}
                      </Button>
                    </div>

                    {cartItem && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(product.id, Math.max(0, cartItem.quantity - 1))}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => removeItem(product.id)} className="ml-2">
                          Remover
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="lg:sticky lg:top-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>

            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhum item selecionado ainda</p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity}x • {item.paymentMethod === "pix" ? "PIX" : "Cartão"}
                        </div>
                      </div>
                      <span className="font-semibold">{formatCurrency(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{formatCurrency(getTotal())}</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleFinishOrder}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
                  >
                    Finalizar Pedido
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Você será redirecionado para o WhatsApp da Líder Quéren Mota
                </p>

                {items.length > 0 && (
                  <Button variant="outline" onClick={clearCart} className="w-full mt-2 bg-transparent">
                    Limpar Carrinho
                  </Button>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
