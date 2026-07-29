import express from 'express'
import { uploadImage } from '../middleware/uploadMiddleware.js'
import { analyzeFlowerImage } from '../services/geminiDiagnosisService.js'
import { validateDiagnosisResponse } from '../utils/validateDiagnosisResponse.js'

const router = express.Router()

router.post('/analyze', (req, res) => {
  uploadImage(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' })
    }

    try {
      // Send buffer to Gemini
      const rawAiResponse = await analyzeFlowerImage(req.file.buffer, req.file.mimetype)
      
      // Validate and sanitize the JSON
      const validatedData = validateDiagnosisResponse(rawAiResponse)
      
      res.json(validatedData)
    } catch (error) {
      console.error('Diagnosis Error:', error)
      res.status(500).json({ error: error.message || 'Failed to analyze the image' })
    }
  })
})

export default router
