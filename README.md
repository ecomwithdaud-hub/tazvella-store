# 🌸 Tazvella (tazvella.com)
> **Aesthetic Digital Atelier & Mindful Pet Organization**

A high-converting, lightning-fast, premium e-commerce storefront for **Tazvella**, targeting modern women and girls who love lifestyle organization, productivity, and their pets.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)

---

## ✨ Features & Architecture

### 1. Modern Hero Section
- High-impact lifestyle headline and serene subheadline.
- Mockup preview showcase of digital planners and organizers (iPad & Notion floating preview).
- Primary **"Shop Digital Assets"** CTA with smooth anchor navigation and secondary **"Explore Pet Parent Hub 🐾"** action.
- Floating live widgets: *"Luna's Pet Passport: Rabies Due in 42 Days"* and customer satisfaction badges.

### 2. Category & Collection Filters
- Navigation tabs for effortless filtering:
  - **All Digital Assets**
  - **Life & Planning**
  - **Finances**
  - **Pet Parents 🐾 (Featured Collection)**
- Live instant keyword search and sorting (Featured, Highest Rated, Price Low-High, Price High-Low).

### 3. Pet-Parent Organization (Featured Collection)
- **The Modern Pet Parent Notion Sanctuary (Dog & Cat Edition)**: Multi-pet health passports, automated 30-day vaccination expiry alerts, vet consultation archive, medication schedules, and 1-click printable pet-sitter emergency handover cheat sheets.
- **Paws & Wellness iPad GoodNotes Pet Care Journal**: Hyperlinked PDF journal with 400+ transparent digital stickers.
- **The Ultimate Puppy & Kitten First Year Survival Kit**: Socialization exposure matrices, crate training logs, and puppy growth charts.

### 4. Interactive Live Device Showcase
- Interactive viewport switcher letting customers test-drive how templates look across screens:
  - **Notion Life Sanctuary** (MacBook & iPhone view)
  - **Pet Parent Health Hub** (Tablet & Mobile passport)
  - **iPad GoodNotes Planner** (Stylus & hyperlinked spreads)
  - **Clean Wealth 50/30/20** (Google Sheets & Excel multi-currency)

### 5. Flagship Product Detail Views (PDP)
- **Dedicated Route**: `/products/[slug]` with image gallery carousel, *"What's Included"* breakdown, feature pillars, customer reviews, and sticky buy actions.
- **Quick View Modal**: Instant preview dialog directly from the catalog.
- **Homepage Deep-Dive**: Dedicated spotlight section for *The Ultimate Aesthetic Notion Life Planner*.

### 6. Seamless Checkout Flow & Integration Stub
- **Slide-out Cart Drawer**:
  - Free Gift Progress Bar (Unlock complimentary *Aesthetic Pet Sticker Pack* on orders $35+).
  - Discount Code engine (e.g. `TAZVELLA30` for 30% off, `WELCOME15` for 15% off).
  - In-cart cross-sell bump offer (*Daily Glow AM/PM Routine*).
- **Checkout Modal**:
  - Express Instant Cloud Checkout (Apple Pay, Google Pay, Card).
  - **Shopify Storefront API / Stripe Redirect stub** with GraphQL `cartCreate` integration architecture.
- **API Endpoint**: `/api/checkout` stub ready for backend webhooks.
- **Fulfillment Page**: `/checkout/success` featuring festive celebration confetti, instant 1-click Notion duplication links, and setup guides.

### 7. Social Proof & Trust Architecture
- Verified customer reviews with star ratings and photos.
- FAQ accordion answering digital delivery, Notion free plan compatibility, multi-pet tracking, and iPad stylus support.
- Multi-currency switcher: USD ($), EUR (€), GBP (£), CAD (CA$), and AUD (AU$).

---

## 🎨 Color System

| Color | Hex | Role |
|---|---|---|
| **Cream Foundation** | `#FAF8F5` | Main warm background |
| **Pearl White** | `#FDFBF9` | Card surfaces & containers |
| **Rosewood** | `#D59681` / `#F9EFEB` | Primary accent & gentle highlights |
| **Sage** | `#6D8E73` / `#EBF0EC` | Organic accents & verified tags |
| **Caramel** | `#CE8639` / `#FAF0E2` | Pet collection badges & stars |
| **Deep Espresso** | `#1D1917` / `#2A2522` | Editorial typography & contrast |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ecomwithdaud-hub/tazvella-store.git
cd tazvella-store
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📄 License
Personal & Commercial Digital Product License © Tazvella (tazvella.com). All rights reserved.
