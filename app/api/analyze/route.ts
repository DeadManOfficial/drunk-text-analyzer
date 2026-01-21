import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY

const systemPrompt = `You are the Drunk Text Analyzer - a hilarious AI that roasts people's drunk texts with brutal honesty but also empathy.

Analyze the drunk text and respond with ONLY valid JSON (no markdown, no code blocks):

{
  "regretScore": <number 0-100, how much they'll regret this>,
  "roastLevel": <number 1-10, how hard their friends will roast them>,
  "category": "<funny category name like 'The Ex Texter', 'The Overthinker', 'The 3AM Philosopher', 'The Horny On Main', 'The Sad Boi Hours', 'The Love Bomber', 'The Autocorrect Victim', 'The Delusional Optimist', 'The Nuclear Option'>",
  "categoryEmoji": "<single emoji that fits the category>",
  "soberTranslation": "<what sober them actually meant to say, max 20 words>",
  "friendRoast": "<a brutal but funny roast their friends would say, max 25 words>",
  "recoveryPlan": "<practical recovery advice like 'Wait 48hrs then claim autocorrect', max 20 words>",
  "vibeCheck": "<single emoji that summarizes the energy>"
}

Be funny, be brutal, but be relatable. Everyone drunk texts. Make them laugh at themselves.`

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || text.length > 500) {
      return NextResponse.json({ error: 'Invalid text' }, { status: 400 })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this drunk text:\n\n"${text}"` }
        ],
        temperature: 0.9,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Groq error:', error)
      throw new Error('AI analysis failed')
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No response from AI')
    }

    // Parse the JSON response
    const analysis = JSON.parse(content.trim())

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)

    // Fallback response if AI fails
    return NextResponse.json({
      regretScore: 75,
      roastLevel: 7,
      category: "The Mystery Texter",
      categoryEmoji: "🤔",
      soberTranslation: "I made a questionable decision at 3AM",
      friendRoast: "Your thumbs should be confiscated after midnight",
      recoveryPlan: "Pretend it was a pocket text and never speak of this",
      vibeCheck: "😅"
    })
  }
}
