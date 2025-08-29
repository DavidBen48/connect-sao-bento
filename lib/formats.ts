export function formatCurrency(value: number): string {
  return `R$${value.toFixed(2).replace(".", ",")}`
}

export function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return value
}

export function maskPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  let formatted = cleaned

  if (cleaned.length >= 2) {
    formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
  }
  if (cleaned.length >= 7) {
    formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
  }

  return formatted
}
