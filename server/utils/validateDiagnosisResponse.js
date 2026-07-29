export const validateDiagnosisResponse = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response format: not an object')
  }

  // Define required fields based on the schema
  const requiredFields = [
    'imageSuitable',
  ]

  for (const field of requiredFields) {
    if (data[field] === undefined) {
      throw new Error(`Invalid response format: missing ${field}`)
    }
  }

  // Normalize structure in case Gemini omitted some optional arrays
  return {
    imageSuitable: !!data.imageSuitable,
    reason: data.reason || null,
    retakeInstructions: data.retakeInstructions || null,
    flowerIdentification: data.flowerIdentification || { likelyName: 'Unknown', confidence: 0 },
    healthScore: typeof data.healthScore === 'number' ? data.healthScore : 0,
    overallCondition: data.overallCondition || 'Unknown',
    primaryFinding: data.primaryFinding || { name: 'Unknown', category: 'Unknown', confidence: 0, severity: 'Unknown' },
    visibleSymptoms: Array.isArray(data.visibleSymptoms) ? data.visibleSymptoms : [],
    alternativePossibilities: Array.isArray(data.alternativePossibilities) ? data.alternativePossibilities : [],
    healthyPercentage: typeof data.healthyPercentage === 'number' ? data.healthyPercentage : 0,
    wiltingPercentage: typeof data.wiltingPercentage === 'number' ? data.wiltingPercentage : 0,
    urgency: data.urgency || 'Low',
    recommendedActions: Array.isArray(data.recommendedActions) ? data.recommendedActions : [],
    treatmentGuidance: Array.isArray(data.treatmentGuidance) ? data.treatmentGuidance : [],
    preventionTips: Array.isArray(data.preventionTips) ? data.preventionTips : [],
    needsProfessionalReview: !!data.needsProfessionalReview,
    disclaimer: data.disclaimer || "This is an AI-assisted visual assessment and not a confirmed botanical diagnosis."
  }
}
