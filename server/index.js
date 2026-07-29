import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import diagnosisRoutes from './routes/diagnosisRoutes.js'

dotenv.config({ path: './server/.env' })

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/diagnosis', diagnosisRoutes)

app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.lang=`Server running on http://localhost:${PORT}`
})
