# 🐦 Pigeon News & Conflict Tracker

A modern, unbiased news platform that provides comprehensive coverage of global conflicts and major news events.

## Features

- 📰 Grid-style article layout with black-and-white photo theme
- 🗺️ Interactive world map for conflict tracking
- 📊 Bias tracker for external sources
- 📱 Responsive design for all devices
- 🔒 Secure content management through Sanity.io

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet.js
- **CMS**: Sanity.io
- **UI Components**: Headless UI
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pigeon-news.git
cd pigeon-news
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Sanity.io credentials and other configuration.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── article/           # Article pages
│   ├── map/              # Conflict map page
│   └── page.tsx          # Homepage
├── components/            # Reusable components
│   ├── Header.tsx        # Navigation header
│   └── Map.tsx           # Interactive map component
└── lib/                   # Utility functions and configurations
```

## Content Management

Articles and map markers are managed through Sanity.io. To update content:

1. Log in to the Sanity Studio
2. Navigate to the desired content type
3. Make your changes
4. Publish to see updates on the site

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
