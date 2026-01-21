'use client'

import { useRef } from 'react'
import type { AnalysisResult } from '@/app/page'

interface Props {
  result: AnalysisResult
  onReset: () => void
}

export default function ResultCard({ result, onReset }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  const getRegretColor = (score: number) => {
    if (score >= 80) return '#ff4757'
    if (score >= 60) return '#ffa502'
    if (score >= 40) return '#ffdd59'
    return '#2ed573'
  }

  const getRegretEmoji = (score: number) => {
    if (score >= 90) return '💀'
    if (score >= 80) return '☠️'
    if (score >= 60) return '😬'
    if (score >= 40) return '😅'
    return '😌'
  }

  const shareToTwitter = () => {
    const text = `My drunk text got a ${result.regretScore}% regret score ${getRegretEmoji(result.regretScore)}\n\nCategory: "${result.category}" ${result.categoryEmoji}\n\nAnalyze yours:`
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareToTikTok = () => {
    const text = `My drunk text regret score: ${result.regretScore}% ${getRegretEmoji(result.regretScore)} - Category: "${result.category}" - Try it at drunktextanalyzer.com`
    navigator.clipboard.writeText(text)
    alert('TikTok caption copied! Now paste it in your video description.')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin)
    alert('Link copied!')
  }

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div ref={cardRef} className="glass-card rounded-3xl p-6 md:p-8 drunk-glow">
        {/* Category Badge */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-drunk-pink/20 to-drunk-purple/20 border border-drunk-pink/30">
            <span className="text-2xl mr-2">{result.categoryEmoji}</span>
            <span className="gradient-text font-bold">{result.category}</span>
          </span>
        </div>

        {/* Regret Score */}
        <div className="text-center mb-8">
          <div className="text-7xl font-black mb-2" style={{ color: getRegretColor(result.regretScore) }}>
            {result.regretScore}%
          </div>
          <div className="text-xl text-gray-400">Regret Score {getRegretEmoji(result.regretScore)}</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-drunk-purple">{result.roastLevel}/10</div>
            <div className="text-xs text-gray-400">Friend Roast Level</div>
          </div>
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <div className="text-3xl">{result.vibeCheck}</div>
            <div className="text-xs text-gray-400">Vibe Check</div>
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="space-y-4">
          {/* Sober Translation */}
          <div className="bg-black/20 rounded-xl p-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">What Sober You Would Say</div>
            <p className="text-gray-300 italic">"{result.soberTranslation}"</p>
          </div>

          {/* Friend Roast */}
          <div className="bg-black/20 rounded-xl p-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Friend Roast</div>
            <p className="text-gray-300">🔥 {result.friendRoast}</p>
          </div>

          {/* Recovery Plan */}
          <div className="bg-gradient-to-r from-drunk-blue/20 to-drunk-purple/20 rounded-xl p-4 border border-drunk-blue/30">
            <div className="text-xs text-drunk-blue uppercase tracking-wide mb-2">Recovery Plan</div>
            <p className="text-white font-medium">{result.recoveryPlan}</p>
          </div>
        </div>

        {/* Original Text Preview */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="text-xs text-gray-500 mb-2">Your text:</div>
          <p className="text-gray-400 text-sm truncate">"{result.originalText}"</p>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="glass-card rounded-2xl p-4">
        <div className="text-center text-sm text-gray-400 mb-4">Share your shame</div>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={shareToTwitter}
            className="py-3 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] font-medium transition-colors"
          >
            𝕏 Twitter
          </button>
          <button
            onClick={shareToTikTok}
            className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            TikTok
          </button>
          <button
            onClick={copyLink}
            className="py-3 rounded-xl bg-drunk-purple/20 hover:bg-drunk-purple/30 text-drunk-purple font-medium transition-colors"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* Try Again */}
      <button
        onClick={onReset}
        className="w-full py-4 rounded-xl font-bold text-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
      >
        Analyze Another Text 🍻
      </button>
    </div>
  )
}
