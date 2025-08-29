"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type CartItem, generateWhatsAppMessage, openWhatsApp } from "@/lib/whatsapp"
import { formatCurrency, maskPhone } from "@/lib/formats"
import { PIX_KEY } from "@/lib/constants"

const checkoutSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  items: CartItem[]
}

export function CheckoutForm({ isOpen, onClose, onComplete, items }: CheckoutFormProps) {
  const [pixKeyCopied, setPixKeyCopied] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const phoneValue = watch("phone")

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskPhone(e.target.value)
    setValue("phone", masked)
  }

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
      setPixKeyCopied(true)
      setTimeout(() => setPixKeyCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy PIX key:", err)
    }
  }

  const onSubmit = (data: CheckoutFormData) => {
    const message = generateWhatsAppMessage({
      ...data,
      phone: data.phone.replace(/\D/g, ""),
      items,
    })

    openWhatsApp(message)
    reset()
    onComplete()
  }

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const hasPixItems = items.some((item) => item.paymentMethod === "pix")

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Finalizar Pedido</h3>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" {...register("name")} placeholder="Seu nome completo" className="mt-1" />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="seu@email.com"
                      className="mt-1"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      value={phoneValue || ""}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                      className="mt-1"
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* PIX Key Section */}
                {hasPixItems && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Chave PIX para pagamento:</h4>
                    <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                      <code className="flex-1 text-sm font-mono">{PIX_KEY}</code>
                      <Button type="button" variant="outline" size="sm" onClick={copyPixKey}>
                        {pixKeyCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Resumo do Pedido:</h4>
                  <div className="space-y-2 text-sm">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.paymentMethod}`} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name} ({item.paymentMethod === "pix" ? "Pix" : "Cartão"})
                        </span>
                        <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-accent">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  size="lg"
                >
                  Enviar Pedido via WhatsApp
                </Button>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
