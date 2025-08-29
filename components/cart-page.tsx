"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/formats"
import { generateWhatsAppMessage, openWhatsApp, type CheckoutData } from "@/lib/whatsapp"
import { PRODUCTS } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function CartPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCart()
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<Record<number, "pix" | "card">>({})
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [copiedPix, setCopiedPix] = useState(false)

  const handleProductSelect = (productId: number, paymentMethod: "pix" | "card") => {
    const product = PRODUCTS.find((p) => p.id === productId)
    if (!product) return

    const price = paymentMethod === "pix" ? product.pixPrice : product.cardPrice
    const existingItem = items.find((item) => item.id === productId)

    if (existingItem) {
      // Update existing item with new payment method and price
      removeItem(productId, existingItem.paymentMethod)
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
    setIsCheckoutOpen(true)
  }

  const handleSendOrder = () => {
    if (!customerName || !customerEmail || !customerPhone) return
    const data: CheckoutData = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      items,
    }
    const message = generateWhatsAppMessage(data)
    openWhatsApp(message)
    setIsCheckoutOpen(false)
  }

  const handleCopyPix = () => {
    navigator.clipboard.writeText("+5521991442334")
    setCopiedPix(true)
    setTimeout(() => setCopiedPix(false), 3000)
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl pt-16">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Faça seu <span className="text-accent">Pedido</span> Agora
            <span className="text-accent">!</span>
          </h1>
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
                        className="text-xs"
                      >
                        PIX {formatCurrency(product.pixPrice)}
                      </Button>
                      <Button
                        variant={selectedPayment === "card" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleProductSelect(product.id, "card")}
                        className="text-xs"
                      >
                        Cartão {formatCurrency(product.cardPrice)}
                      </Button>
                    </div>

                    {cartItem && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(product.id, cartItem.paymentMethod, Math.max(0, cartItem.quantity - 1))}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(product.id, cartItem.paymentMethod, cartItem.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => removeItem(product.id, cartItem.paymentMethod)} className="ml-2">
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
            <h2 className="text-xl font-semibold mb-4"><span className="text-accent">Resumo</span> do Pedido</h2>

            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Nenhum item selecionado ainda</p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.paymentMethod}-${index}`} className="flex justify-between items-center">
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 text-lg hover:bg-white hover:text-black"
                  >
                    Finalizar Pedido
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Você será redirecionado para o WhatsApp da Líder Quéren Mota.
                </p>

                {items.length > 0 && (
                  <Button variant="outline" onClick={clearCart} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 text-lg hover:bg-white hover:text-black">
                    Limpar Carrinho
                  </Button>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCheckoutOpen(false)} />
          <div className="relative z-10 w-full max-w-md">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Finalize seu Pedido</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nome"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Telefone (DDD+XXXXXXXXX)"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
                <div className="mt-2">
                  <div className="text-sm text-muted-foreground mb-1">CHAVE PIX: Quéren Mota Herculano - PICPAY</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 text-sm border rounded-md px-3 py-2 bg-muted/50">
                      +55 21 99144-2334
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyPix}
                    >
                      {copiedPix ? "Copiado" : "Copiar"}
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleSendOrder}
                  disabled={!customerName || !customerEmail || !customerPhone}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 text-lg hover:bg-white hover:text-black"
                >
                  Enviar Pedido
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Você será redirecionado para o WhatsApp da Líder do Connect São Bento, Quéren Mota.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
