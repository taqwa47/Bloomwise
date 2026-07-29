import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, AlertTriangle, Clock } from 'lucide-react'
import '../styles/Diagnosis.css'

const DiagnosisPage = () => {
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingState, setLoadingState] = useState('Uploading image...')
  const [error, setError] = useState(null)
  
  const [history, setHistory] = useState([])
  const [recurringAlert, setRecurringAlert] = useState(null)

  const fileInputRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('bloomwise_diagnoses')
    if (stored) {
      const parsed = JSON.parse(stored)
      setHistory(parsed)
      checkRecurring(parsed)
    }
  }, [])

  const checkRecurring = (historyData) => {
    const counts = {}
    historyData.forEach(diag => {
      if (diag.status !== 'Treated' && diag.primaryFinding && diag.flowerIdentification) {
        const key = `${diag.flowerIdentification.likelyName}-${diag.primaryFinding.name}`
        counts[key] = (counts[key] || 0) + 1
      }
    })

    let maxKey = null
    let maxCount = 0
    for (const [key, count] of Object.entries(counts)) {
      if (count >= 3 && count > maxCount) {
        maxCount = count
        maxKey = key
      }
    }

    if (maxKey) {
      const [flower, finding] = maxKey.split('-')
      setRecurringAlert({ flower, finding, count: maxCount })
    } else {
      setRecurringAlert(null)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file) => {
    setError(null)
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WEBP image.')
      return false
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum size is 10MB.')
      return false
    }
    return true
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        handleFileSelection(file)
      }
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        handleFileSelection(file)
      }
    }
  }

  const handleFileSelection = (file) => {
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const clearSelection = () => {
    setSelectedFile(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const generateThumbnail = (file) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 300
        const scaleSize = MAX_WIDTH / img.width
        canvas.width = MAX_WIDTH
        canvas.height = img.height * scaleSize
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.7))
      }
    })
  }

  const startAnalysis = async () => {
    if (!selectedFile) return
    setLoading(true)
    setError(null)
    
    try {
      setLoadingState('Uploading image...')
      const formData = new FormData()
      formData.append('flowerImage', selectedFile)

      setLoadingState('Inspecting visible symptoms...')
      const response = await fetch('/api/diagnosis/analyze', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Server failed to analyze image')
      }

      setLoadingState('Preparing recommendations...')
      const result = await response.json()

      if (!result.imageSuitable) {
        setError(result.reason || 'Image is not suitable for analysis. ' + (result.retakeInstructions || ''))
        setLoading(false)
        return
      }

      // Generate base64 thumbnail for localStorage
      const thumbBase64 = await generateThumbnail(selectedFile)

      const newDiagnosis = {
        id: `diag_${Date.now()}`,
        date: new Date().toISOString(),
        flowerName: result.flowerIdentification.likelyName,
        issue: result.primaryFinding.name,
        confidence: result.primaryFinding.confidence,
        healthScore: result.healthScore,
        severity: result.primaryFinding.severity,
        status: 'New',
        thumbnailUrl: thumbBase64,
        fullResult: result
      }

      const updatedHistory = [newDiagnosis, ...history]
      setHistory(updatedHistory)
      localStorage.setItem('bloomwise_diagnoses', JSON.stringify(updatedHistory))
      
      // Navigate to result
      navigate(`/owner/ai-diagnosis/${newDiagnosis.id}`)

    } catch (err) {
      console.error(err)
      setError(err.message || 'An unexpected error occurred.')
      setLoading(false)
    }
  }

  const scrollToHistory = () => {
    document.getElementById('recent-diagnoses')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="dashboard-main diagnosis-main">
      <div className="flowers-header" style={{marginBottom: '0'}}>
        <h1 className="dashboard-title" style={{margin: 0}}>AI Diagnosis</h1>
        <div className="diagnosis-actions-top">
          {recurringAlert && (
            <div className="recurring-alert">
              <AlertTriangle size={18} />
              <span>
                <strong>Recurring Disease Alert: {recurringAlert.finding}</strong> has been detected {recurringAlert.count} times on {recurringAlert.flower}s. Immediate action recommended — check entire stock.
              </span>
            </div>
          )}
          <button className="new-diagnosis-btn" onClick={clearSelection}>New Diagnosis</button>
          <button className="history-btn" onClick={scrollToHistory} title="View History">
            <Clock size={18} />
          </button>
        </div>
      </div>

      <div className="upload-card">
        {loading ? (
          <div className="loading-area">
            <div className="loader-spinner"></div>
            <h2 className="loading-text">{loadingState}</h2>
            <p className="upload-subtitle">Please wait, AI is analyzing the flower.</p>
          </div>
        ) : selectedFile ? (
          <div className="preview-area">
            <div className="preview-image-wrapper">
              <img src={previewUrl} alt="Preview" />
            </div>
            <h3 style={{fontFamily: 'var(--font-sans)', margin: 0}}>{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</h3>
            
            {error && <div style={{color: '#c93434', fontWeight: '500', background: '#fde8e8', padding: '12px 24px', borderRadius: '12px'}}>{error}</div>}

            <div className="preview-actions">
              <button className="cancel-btn" onClick={clearSelection}>Change Image</button>
              <button className="analyze-btn" onClick={startAnalysis}>Analyze Flower</button>
            </div>
          </div>
        ) : (
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-icon-wrapper">
              <Upload size={24} />
            </div>
            <h2 className="upload-title">Drop your flower image here</h2>
            <p className="upload-subtitle">or click to browse — JPG, PNG, WEBP (Max 10MB)</p>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/jpeg,image/png,image/webp" 
              onChange={handleChange}
              style={{display: 'none'}}
            />
          </div>
        )}
      </div>

      <div id="recent-diagnoses" className="diagnosis-history-card">
        <div className="history-header">
          <h2>Recent Diagnoses</h2>
        </div>
        <div className="history-list">
          {history.length > 0 ? history.map(diag => (
            <div key={diag.id} className="history-item" onClick={() => navigate(`/owner/ai-diagnosis/${diag.id}`)}>
              <img src={diag.thumbnailUrl} alt={diag.flowerName} className="history-thumb" />
              <div className="history-info">
                <div className="history-title-row">
                  <span className="history-flower-name">{diag.flowerName}</span>
                  {(recurringAlert?.flower === diag.flowerName && recurringAlert?.finding === diag.issue) && (
                    <span className="recurring-badge">
                      <AlertTriangle size={10} /> Recurring
                    </span>
                  )}
                </div>
                <span className="history-finding">{diag.issue}</span>
                <span className="history-date">
                  {new Date(diag.date).toLocaleString('default', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="history-score-col">
                <span className="history-score">{diag.healthScore}%</span>
                <span className={`status-pill ${diag.status.toLowerCase()}`}>{diag.status}</span>
              </div>
            </div>
          )) : (
            <div style={{padding: '40px', textAlign: 'center', color: '#9aa69d'}}>
              No diagnosis history yet. Upload an image to get started.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default DiagnosisPage
