import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const score = searchParams.get('score') || '87'
  const category = searchParams.get('category') || 'The Ex Texter'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2f 50%, #0a0a1f 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Emoji */}
        <div style={{ fontSize: 100, marginBottom: 20 }}>🍺</div>

        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
          }}
        >
          Drunk Text Analyzer
        </div>

        {/* Score */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: '#ff4757',
            marginBottom: 10,
          }}
        >
          {score}%
        </div>

        <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.7)', marginBottom: 30 }}>
          Regret Score
        </div>

        {/* Category */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.1)',
            padding: '16px 32px',
            borderRadius: 50,
            border: '1px solid rgba(255,107,157,0.3)',
          }}
        >
          <span style={{ fontSize: 24, color: 'white' }}>
            Category: {category}
          </span>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Analyze your drunk texts at drunktextanalyzer.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
