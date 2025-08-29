import { WHATSAPP_NUMBER } from "./constants"

export interface CartItem {
  id: number
  name: string
  quantity: number
  paymentMethod: "pix" | "card"
  unitPrice: number
}

export interface CheckoutData {
  name: string
  email: string
  phone: string
  items: CartItem[]
}

export function generateOrderId(): string {
  const randomDigits = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")
  return `2025${randomDigits}`
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
}

export function generateWhatsAppMessage(data: CheckoutData): string {
  const orderId = generateOrderId()
  const total = calculateTotal(data.items)

  const itemsList = data.items.map((item) => `${item.quantity} ${item.name}`).join("\n")

  return `
    ===== Extrato da Compra para o Whatsapp =====
    Nome: ${data.name}
    Email: ${data.email}
    Número do Telefone: ${data.phone}
    =====
    ID da Compra: ${orderId}connect
    =====
    Produtos comprados:
    ${itemsList}
    Total: R$${total}.00

    ===== termos e políticas =====
    1. Pedido feito com sucesso através desta mensagem;
    2. O comprovante da compra deverá ser entregue para poder retirar a blusa na igreja;
    3. Em casos de faltas de blusa para outros pedidos, se esse pedido não foi pago e a data é próxima ao dia do evento, as blusas pedidas por você, usuário, automaticamente sairá deste pedido e dado para outro que pagar primeiro;
    4. Comprometa-se e pague a blusa o quanto antes para garantir que tenha sua blusa;
    5. Não aceitamos trocas, devoluções nem algo do tipo. Realizado a compra uma vez, assim permanecerá;
    6. Isso não é um comprovante de oficial, e sim comprovante de pedido oficial.
    7. Ao realizar a compra, é imprescindível que você envie o comprovante para este número o quanto antes;
    8. Não só compre, mas compareça a conferência :) será nos dias 25 e 26 de outubro.
    `
}

export function openWhatsApp(message: string): void {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

export function sendWhatsAppOrder(items: CartItem[]): void {
  const total = calculateTotal(items)

  const itemsList = items
    .map(
      (item) =>
        `${item.quantity}x ${item.name} (${item.paymentMethod === "pix" ? "PIX" : "Cartão"}) - R$${item.unitPrice * item.quantity}`,
    )
    .join("\n")

  const message = `
🛍️ *NOVO PEDIDO - CONNECT SÃO BENTO*

📋 *Produtos:*
${itemsList}

💰 *Total: R$${total}*

---
Olá! Gostaria de finalizar este pedido das blusas do Connect São Bento.

Aguardo as instruções para pagamento! 🙏
  `

  const encodedMessage = encodeURIComponent(message.trim())
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}
