import { GoogleGenAI } from '@google/genai'

export const analyzeFlowerImage = async (imageBuffer, mimeType) => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured')
  }

  const ai = new GoogleGenAI({ apiKey })

  const systemInstruction = `
You are a cautious flower-health assistant for flower shop owners.
Your task is to analyze the provided image of a flower/plant.

First, verify:
- Does the image actually contain a flower or plant?
- Is the flower clearly visible?
- Is the image not extremely blurry?
- Is the lighting sufficient?

If the image is unsuitable, set "imageSuitable": false and provide "reason" and "retakeInstructions".

If suitable, set "imageSuitable": true and inspect for signs like wilting, spots, powdery coating, yellow leaves, discoloration, rot, mold, dry edges, pest signs, water stress, etc.
Do not claim certainty if ambiguous. Do not invent species if unrecognized. If no disease is visible, state "No obvious disease detected" in primary finding.
Do not recommend dangerous or banned chemicals.

Return ONLY structured JSON matching this schema:
{
  "imageSuitable": boolean,
  "reason": "string (optional)",
  "retakeInstructions": "string (optional)",
  "flowerIdentification": {
    "likelyName": "string",
    "confidence": number (0 to 1)
  },
  "healthScore": number (0 to 100),
  "overallCondition": "string",
  "primaryFinding": {
    "name": "string",
    "category": "string",
    "confidence": number (0 to 1),
    "severity": "string"
  },
  "visibleSymptoms": ["string"],
  "alternativePossibilities": [
    { "name": "string", "confidence": number }
  ],
  "healthyPercentage": number,
  "wiltingPercentage": number,
  "urgency": "Low" | "Medium" | "High",
  "recommendedActions": ["string"],
  "treatmentGuidance": ["string"],
  "preventionTips": ["string"],
  "needsProfessionalReview": boolean,
  "disclaimer": "This is an AI-assisted visual assessment and not a confirmed botanical diagnosis."
}
`

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        systemInstruction,
        {
          inlineData: {
            data: imageBuffer.toString('base64'),
            mimeType
          }
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    })

    const text = response.text
    if (!text) {
      throw new Error('No response from Gemini API')
    }

    try {
      const parsed = JSON.parse(text)
      return parsed
    } catch (parseError) {
      // In case Gemini wraps it in markdown blocks
      const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
      return JSON.parse(cleaned)
    }

  } catch (error) {
    console.error('Gemini API Error:', error)
    throw new Error('Failed to analyze image with AI')
  }
}
