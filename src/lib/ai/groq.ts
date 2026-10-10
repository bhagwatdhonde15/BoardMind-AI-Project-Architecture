export const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

export const GROQ_MODEL = 'openai/gpt-oss-120b';

export async function callGroqAI(systemPrompt: string, userPrompt: string) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || `Groq API Error (${res.status})`);
  }

  const data = await res.json();
  const rawText = data.choices[0]?.message?.content || '{}';
  return JSON.parse(rawText);
}
