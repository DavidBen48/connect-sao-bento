# Connect São Bento - E-commerce para Evento Cristão

## 📋 Visão Geral do Projeto

O **Connect São Bento** é uma aplicação web de e-commerce desenvolvida especificamente para o evento cristão "Connect São Bento", que ocorrerá nos dias 25 e 26 de outubro de 2025. A plataforma permite aos usuários visualizar, selecionar e encomendar blusas temáticas do evento através de uma interface moderna e responsiva.

## 🏗️ Arquitetura e Estrutura Técnica

### Stack Tecnológico Principal

- **Framework Frontend**: Next.js 15.2.4 (App Router)
- **Linguagem de Programação**: TypeScript 5.x
- **Biblioteca de UI**: React 19.x
- **Sistema de Estilização**: Tailwind CSS 4.1.9
- **Gerenciamento de Estado**: React Context API + Custom Hooks
- **Validação de Formulários**: React Hook Form + Zod
- **Animações**: Framer Motion
- **Componentes UI**: Radix UI + shadcn/ui
- **Gerenciamento de Temas**: next-themes
- **Carrossel**: Embla Carousel
- **Ícones**: Lucide React

### Estrutura de Diretórios

```
connect-sao-bento/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página principal
│   ├── carrinho/          # Rota do carrinho de compras
│   └── globals.css        # Estilos globais e variáveis CSS
├── components/             # Componentes React reutilizáveis
│   ├── ui/                # Componentes base do shadcn/ui
│   ├── navbar.tsx         # Navegação principal
│   ├── hero.tsx           # Seção hero da página inicial
│   ├── stand.tsx          # Seção de produtos
│   ├── cart-drawer.tsx    # Drawer do carrinho
│   ├── cart-page.tsx      # Página completa do carrinho
│   ├── checkout-form.tsx  # Formulário de finalização
│   └── footer.tsx         # Rodapé com redes sociais
├── hooks/                  # Custom hooks React
│   └── use-cart.tsx       # Hook para gerenciamento do carrinho
├── lib/                    # Utilitários e configurações
│   ├── constants.ts       # Constantes da aplicação
│   ├── whatsapp.ts        # Lógica de integração WhatsApp
│   ├── formats.ts         # Funções de formatação
│   └── utils.ts           # Utilitários gerais
├── public/                 # Arquivos estáticos
├── styles/                 # Estilos adicionais
└── package.json            # Dependências e scripts
```

## 🔧 Arquitetura de Componentes

### Padrão de Design System

A aplicação utiliza o **shadcn/ui** como base para o design system, implementando:

- **Componentes Atômicos**: Button, Card, Input, Label, etc.
- **Sistema de Variantes**: Utilizando class-variance-authority
- **Composição de Componentes**: Seguindo princípios de composição React
- **Acessibilidade**: Implementada através do Radix UI

### Gerenciamento de Estado

#### Context API para Carrinho de Compras

```typescript
interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: number, paymentMethod: "pix" | "card") => void
  updateQuantity: (id: number, paymentMethod: "pix" | "card", quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotal: () => number
}
```

#### Estrutura de Dados do Carrinho

```typescript
export interface CartItem {
  id: number
  name: string
  quantity: number
  paymentMethod: "pix" | "card"
  unitPrice: number
}
```

### Sistema de Roteamento

- **App Router**: Utilizando a nova arquitetura de roteamento do Next.js 15
- **Rota Principal**: `/` - Página inicial com produtos e informações
- **Rota do Carrinho**: `/carrinho` - Página dedicada ao carrinho de compras
- **Navegação Interna**: Scroll suave para seções da página inicial

## 🎨 Sistema de Design e UX

### Paleta de Cores

- **Tema Claro**: Fundo branco com acentos em azul-roxo
- **Tema Escuro**: Fundo escuro com acentos em azul-roxo
- **Cores de Destaque**: Gradiente azul para roxo (#3B82F6 → #8B5CF6)
- **Cores Semânticas**: Destructive (vermelho), Muted (cinza), Accent (roxo)

### Tipografia

- **Fonte Principal**: Sora (Google Fonts)
- **Hierarquia Visual**: Títulos grandes (text-7xl) para impacto
- **Legibilidade**: Contraste otimizado e espaçamento adequado

### Animações e Transições

- **Framer Motion**: Animações de entrada, hover e transições
- **Micro-interações**: Hover effects, scale transforms
- **Transições Suaves**: Duração de 300ms para interações
- **Animações de Scroll**: Reveal on scroll para seções

## 🛒 Funcionalidades do E-commerce

### Catálogo de Produtos

- **Carrossel Responsivo**: Embla Carousel com navegação
- **Cards de Produto**: Imagem, descrição, preços (PIX e Cartão)
- **Seleção de Método de Pagamento**: PIX (desconto) vs Cartão
- **Quantidade Dinâmica**: Controles de incremento/decremento

### Sistema de Carrinho

- **Drawer Lateral**: Carrinho deslizante na página inicial
- **Página Dedicada**: `/carrinho` para gestão completa
- **Persistência de Estado**: Context API mantém itens durante sessão
- **Cálculo Automático**: Total atualizado em tempo real

### Processo de Checkout

- **Formulário de Dados**: Nome, email e telefone
- **Validação**: Zod schema para validação de campos
- **Integração WhatsApp**: Geração automática de mensagem
- **Geração de ID**: Código único para cada pedido

## 📱 Responsividade e Performance

### Breakpoints Responsivos

- **Mobile First**: Design iniciado para dispositivos móveis
- **Tablet**: Adaptações para telas médias (md:)
- **Desktop**: Otimizações para telas grandes (lg:)

### Otimizações de Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Separação automática de bundles
- **CSS Variables**: Sistema de tokens para temas

## 🔌 Integrações Externas

### WhatsApp Business API

```typescript
export function openWhatsApp(message: string): void {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}
```

### Sistema de Pagamento

- **PIX**: Chave PIX da líder Quéren Mota
- **Cartão**: Preço com acréscimo para processamento
- **Desconto PIX**: R$ 6,00 de desconto em todas as blusas

## 🚀 Metodologia de Desenvolvimento

### Abordagem Kanban

O projeto foi desenvolvido seguindo a metodologia **Kanban**, organizando as etapas em:

1. **Backlog**: Definição de funcionalidades e requisitos
2. **To Do**: Tarefas planejadas para desenvolvimento
3. **In Progress**: Funcionalidades em desenvolvimento ativo
4. **Testing**: Validação e testes de funcionalidades
5. **Done**: Funcionalidades concluídas e validadas

### Fluxo de Desenvolvimento

```
Requisitos → Design → Desenvolvimento → Testes → Deploy
    ↓           ↓          ↓           ↓        ↓
  Análise   Prototipagem  Coding   Validação  Produção
```

## 📋 Pré-requisitos

### Requisitos do Sistema

- **Node.js**: Versão 18.17.0 ou superior
- **npm**: Gerenciador de pacotes Node.js
- **Git**: Controle de versão
- **Navegador Moderno**: Chrome, Firefox, Safari, Edge

### Dependências de Desenvolvimento

- **TypeScript**: Compilador e tipagem estática
- **ESLint**: Linting de código
- **PostCSS**: Processamento de CSS
- **Tailwind CSS**: Framework de utilitários CSS

## 🛠️ Instalação e Configuração

### 1. Clone do Repositório

```bash
git clone https://github.com/DavidBen48/connect-sao-bento.git
cd connect-sao-bento
```

### 2. Instalação de Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Configurações do WhatsApp
WHATSAPP_NUMBER=5521991442334
PIX_KEY=+55 21 99144-2334

# Configurações do Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Execução em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

### 5. Build de Produção

```bash
npm run build
npm start
```

## 📊 Scripts Disponíveis

```json
{
  "dev": "next dev",           # Servidor de desenvolvimento
  "build": "next build",       # Build de produção
  "start": "next start",       # Servidor de produção
  "lint": "next lint"          # Verificação de código
}
```

## 🌐 Deploy e Hospedagem

### Vercel (Recomendado)

1. **Conecte o Repositório**: Integração automática com GitHub
2. **Configuração Automática**: Next.js detectado automaticamente
3. **Deploy Contínuo**: Atualizações automáticas a cada push
4. **URL de Produção**: `https://connect-saobento.vercel.app`

### Outras Plataformas

- **Netlify**: Compatível com Next.js
- **Railway**: Deploy com banco de dados
- **AWS Amplify**: Solução enterprise
- **Docker**: Containerização para qualquer ambiente

## 🔍 Estrutura de Dados

### Produtos

```typescript
interface Product {
  id: number
  name: string
  description: string
  image: string
  pixPrice: number
  cardPrice: number
}
```

### Carrinho

```typescript
interface CartItem {
  id: number
  name: string
  quantity: number
  paymentMethod: "pix" | "card"
  unitPrice: number
}
```

### Checkout

```typescript
interface CheckoutData {
  name: string
  email: string
  phone: string
  items: CartItem[]
}
```

## 🧪 Testes e Qualidade

### Estratégia de Testes

- **Testes Unitários**: Componentes individuais
- **Testes de Integração**: Fluxos de usuário
- **Testes E2E**: Cenários completos de compra
- **Validação de Formulários**: Schemas Zod

### Ferramentas de Qualidade

- **TypeScript**: Tipagem estática e detecção de erros
- **ESLint**: Padrões de código e boas práticas
- **Prettier**: Formatação automática de código
- **Husky**: Git hooks para qualidade

## 📈 Monitoramento e Analytics

### Vercel Analytics

- **Performance Metrics**: Core Web Vitals
- **User Experience**: Métricas de usabilidade
- **Error Tracking**: Monitoramento de erros
- **Real User Monitoring**: Dados reais de usuários

## 🔒 Segurança e Privacidade

### Medidas Implementadas

- **Validação de Inputs**: Schemas Zod para formulários
- **Sanitização de Dados**: Limpeza de entradas do usuário
- **HTTPS**: Comunicação criptografada
- **CSP Headers**: Content Security Policy

## 🌟 Funcionalidades Destacadas

### 1. Sistema de Temas
- Alternância automática entre tema claro/escuro
- Persistência da preferência do usuário
- Transições suaves entre temas

### 2. Carrinho Inteligente
- Gerenciamento de estado global
- Cálculo automático de totais
- Persistência durante a sessão

### 3. Integração WhatsApp
- Geração automática de mensagens
- Formatação profissional do pedido
- ID único para cada compra

### 4. Responsividade Avançada
- Design mobile-first
- Adaptação automática para todos os dispositivos
- Navegação otimizada para touch

## 🔮 Roadmap e Melhorias Futuras

### Funcionalidades Planejadas

- **Sistema de Usuários**: Login e cadastro
- **Histórico de Pedidos**: Rastreamento de compras
- **Notificações Push**: Atualizações em tempo real
- **PWA**: Aplicação progressiva web
- **Analytics Avançado**: Métricas de conversão

### Otimizações Técnicas

- **SSR/SSG**: Renderização no servidor
- **Cache Strategy**: Otimização de performance
- **Bundle Analysis**: Análise de tamanho de código
- **Lighthouse Score**: Melhorias de acessibilidade

## 👨‍💻 Desenvolvedor

### David Ben

- **GitHub**: [@DavidBen48](https://github.com/DavidBen48)
- **LinkedIn**: [David Ben](https://www.linkedin.com/in/davidben81/)
- **Instagram**: [@davidben_sax](https://www.instagram.com/davidben_sax)

### Especializações

- **Frontend Development**: React, Next.js, TypeScript
- **UI/UX Design**: Design systems, responsividade
- **Performance**: Otimização e métricas web
- **E-commerce**: Soluções de venda online

## 📄 Licença

Este projeto é de uso exclusivo para o evento **Connect São Bento** e não está disponível para uso comercial sem autorização expressa.

---

**Connect São Bento** - Viva o culto jovem com estilo. Blusas cristãs para o Connect São Bento.

*Desenvolvido com ❤️ e tecnologias modernas para a comunidade cristã.*
