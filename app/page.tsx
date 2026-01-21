'use client'

import { useState } from 'react'
import DrunkTextAnalyzer from '@/components/DrunkTextAnalyzer'
import ResultCard from '@/components/ResultCard'
import SocialLinks from '@/components/SocialLinks'

export interface AnalysisResult {
  regretScore: number
  roastLevel: number
  category: string
  categoryEmoji: string
  soberTranslation: string
  friendRoast: string
  recoveryPlan: string
  vibeCheck: string
  originalText: string
}

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleReset = () => {
    setResult(null)
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-float">🍺</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
            Drunk Text Analyzer
          </h1>
          <p className="text-gray-400 text-lg">
            AI-powered regret scoring for your 3AM mistakes
          </p>
        </div>

        {/* Main Content */}
        {!result ? (
          <DrunkTextAnalyzer
            onResult={setResult}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        ) : (
          <ResultCard result={result} onReset={handleReset} />
        )}

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Join 50k+ people exposing their drunk texts</p>
          <div className="flex justify-center gap-8 text-gray-400">
            <div>
              <div className="text-2xl font-bold gradient-text">2.1M</div>
              <div className="text-xs">Texts Analyzed</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">87%</div>
              <div className="text-xs">Avg Regret Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">∞</div>
              <div className="text-xs">Shame Created</div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <SocialLinks />

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>Please drink responsibly. Your texts? Not our problem.</p>
        </footer>
      </div>
    </main>
  )
}
