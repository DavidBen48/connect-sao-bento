"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  quantity: number
  paymentMethod: "pix" | "card"
  unitPrice: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: number, paymentMethod: "pix" | "card") => void
  updateQuantity: (id: number, paymentMethod: "pix" | "card", quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex(
        (item) => item.id === newItem.id && item.paymentMethod === newItem.paymentMethod,
      )

      if (existingItemIndex >= 0) {
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      }

      return [...currentItems, newItem]
    })
  }

  const removeItem = (id: number, paymentMethod: "pix" | "card") => {
    setItems((currentItems) => currentItems.filter((item) => !(item.id === id && item.paymentMethod === paymentMethod)))
  }

  const updateQuantity = (id: number, paymentMethod: "pix" | "card", quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, paymentMethod)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.paymentMethod === paymentMethod ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
