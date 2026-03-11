# Qalt - Embeddable Delivery Quote Widget SaaS

Qalt is a specialized multi-tenant SaaS platform built for logistics and delivery companies. it provides an embeddable widget that allows your customers to get instant delivery estimates directly on your website.

## 🚀 Features

- **Multi-tenant Architecture:** Secure login and registration for delivery providers.
- **Dynamic Pricing Engine:** Set base rates, per-mile costs, and optional extras (stairs, heavy items, off-hours).
- **Customizable Widget:** Control colors, text, and field visibility to match your brand.
- **Instant Estimates:** Real-time ZIP-to-ZIP distance and price calculation for customers.
- **Lead Management:** Capture customer details and store them directly in your dashboard.
- **Easy Integration:** One-click iframe embed code for any website.

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** Prisma ORM (SQLite/PostgreSQL)
- **Styling:** Tailwind CSS / Lucide React
- **Auth:** Custom JWT-based Authentication

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```
4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## 📦 How to Embed

1. Log in to your Qalt dashboard.
2. Go to the **Embed Code** section.
3. Copy the providing iframe snippet.
4. Paste it onto your website page where you want the calculator to appear.

## 📝 License

MIT
