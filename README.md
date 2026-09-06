# PulseAI

A workplace dashboard with an integrated assistant, employee directory, and team analytics.

## Features

- **Workplace Assistant**: Chat interface for HR inquiries, company policies, and team info. Uses the Gemini API when a key is provided, with built-in fallback knowledge for standard queries.
- **Employee Directory**: Search colleagues by name, role, or department. Includes instant filtering and contact details.
- **Analytics Dashboard**: Visual breakdown of department headcounts and team availability using Recharts.
- **Profile & Settings**: Manage profile details, toggle between light and dark themes, and configure notification preferences saved in local storage.

## Tech Stack

- **React 19** + **Vite**
- **React Router** for page routing
- **Tailwind CSS** for styling
- **Framer Motion** for UI transitions
- **Recharts** for analytics charts
- **Lucide React** for icons

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment Configuration (Optional)

The application works directly without an API key using local mock data.

To enable live Gemini API generation, create a `.env` file from the example:

```bash
cp .env.example .env
```

Add your Gemini API key in `.env`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── analytics/     # Metric cards and chart components
│   ├── chat/          # Chat interface, message bubbles, suggested prompts
│   ├── common/        # Reusable UI primitives (Button, Card, Input, Modal, Badge)
│   ├── directory/     # Directory cards, search and filter bars
│   ├── landing/       # Landing page sections (Hero, Features, Demo, CTA)
│   ├── layout/        # Navbar, Footer, Sidebar, Topbar
│   └── settings/      # Profile form, theme toggles, notification options
├── context/           # React context providers (Chat, Theme, Employee, Profile)
├── data/              # Mock employee and analytics data
├── pages/             # Route pages
└── services/          # API integration and fallback logic
```
