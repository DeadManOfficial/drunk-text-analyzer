'use client'

import { useState } from 'react'
import type { AnalysisResult } from '@/app/page'

interface Props {
  onResult: (result: AnalysisResult) => void
  isAnalyzing: boolean
  setIsAnalyzing: (v: boolean) => void
}

const drunkPhrases = [
  "Scanning for regret...",
  "Measuring cringe levels...",
  "Consulting the shame council...",
  "Calculating your poor decisions...",
  "Asking sober you for forgiveness...",
  "Processing 3AM energy...",
]

export default function DrunkTextAnalyzer({ onResult, isAnalyzing, setIsAnalyzing }: Props) {
  const [text, setText] = useState('')
  const [loadingPhrase, setLoadingPhrase] = useState(drunkPhrases[0])

  const analyzeText = async () => {
    if (!text.trim() || isAnalyzing) return

    setIsAnalyzing(true)

    // Cycle through funny loading phrases
    const interval = setInterval(() => {
      setLoadingPhrase(drunkPhrases[Math.floor(Math.random() * drunkPhrases.length)])
    }, 800)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) throw new Error('Analysis failed')

      const data = await res.json()
      onResult({ ...data, originalText: text })
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Failed to analyze. Try again!')
    } finally {
      clearInterval(interval)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 drunk-glow">
      {/* Text Input */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          Paste your drunk text here (we won't judge... much)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="heyyyy are u up?? i miss u so muchhh 🥺🥺 we should talk... i know its 3am but like... idk i just feel like we had smth special u know??"
          className="w-full h-40 bg-black/30 rounded-xl p-4 text-white placeholder-gray-500 border border-white/10 focus:border-drunk-pink focus:outline-none resize-none"
          disabled={isAnalyzing}
        />
      </div>

      {/* Examples */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 mb-2">Try these classics:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "u up?",
            "i miss us",
            "im not even drunk rn",
            "we should talk",
          ].map((example) => (
            <button
              key={example}
              onClick={() => setText(example)}
              className="text-xs px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={analyzeText}
        disabled={!text.trim() || isAnalyzing}
        className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed neon-border hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: isAnalyzing
            ? 'rgba(255,255,255,0.1)'
            : 'linear-gradient(135deg, #ff6b9d, #c44dff)',
        }}
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {loadingPhrase}
          </span>
        ) : (
          <>Analyze My Shame 🔍</>
        )}
      </button>

      {/* Character Count */}
      <div className="mt-4 text-center text-xs text-gray-500">
        {text.length}/500 characters • Free: 3 analyses/day
      </div>
    </div>
  )
}
