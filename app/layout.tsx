import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Drunk Text Analyzer - AI Roasts Your 3AM Mistakes',
  description: 'Upload your drunk text and get an AI-powered regret score, friend roast level, and recovery strategy. Share your shame on TikTok.',
  keywords: ['drunk text', 'text analyzer', 'ai roast', 'regret score', 'drunk messages', 'text analysis', 'funny ai'],
  authors: [{ name: 'Drunk Text Analyzer' }],
  openGraph: {
    title: 'Drunk Text Analyzer - AI Roasts Your 3AM Mistakes',
    description: 'Get your regret score and recovery plan. Share the shame.',
    url: baseUrl,
    siteName: 'Drunk Text Analyzer',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Drunk Text Analyzer' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drunk Text Analyzer',
    description: 'AI roasts your drunk texts. Get your regret score.',
    images: ['/api/og'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className="antialiased text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
