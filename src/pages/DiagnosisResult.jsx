import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, CheckCircle, Eye } from 'lucide-react'
import ConfirmDialog from '../components/inventory/ConfirmDialog'
import '../styles/Diagnosis.css'

const DiagnosisResult = () => {
  const { diagnosisId } = useParams()
  const navigate = useNavigate()
  const [diagnosis, setDiagnosis] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('bloomwise_diagnoses')
    if (stored) {
      const history = JSON.parse(stored)
      const found = history.find(d => d.id === diagnosisId)
      if (found) {
        setDiagnosis(found)
      }
    }
  }, [diagnosisId])

  const saveHistory = (updatedHistory) => {
    localStorage.setItem('bloomwise_diagnoses', JSON.stringify(updatedHistory))
  }

  const updateStatus = (newStatus) => {
    const stored = localStorage.getItem('bloomwise_diagnoses')
    if (stored) {
      const history = JSON.parse(stored)
      const updated = history.map(d => d.id === diagnosisId ? { ...d, status: newStatus } : d)
      saveHistory(updated)
      setDiagnosis({ ...diagnosis, status: newStatus })
    }
  }

  const handleDelete = () => {
    const stored = localStorage.getItem('bloomwise_diagnoses')
    if (stored) {
      const history = JSON.parse(stored)
      const filtered = history.filter(d => d.id !== diagnosisId)
      saveHistory(filtered)
      navigate('/owner/ai-diagnosis')
    }
  }

  if (!diagnosis) return null

  const { fullResult } = diagnosis
  
  const isHealthy = fullResult.healthScore >= 80
  const findingColorClass = isHealthy ? 'healthy' : ''

  return (
    <main className="dashboard-main diagnosis-main">
      <div className="flowers-header" style={{marginBottom: '0'}}>
        <button 
          onClick={() => navigate('/owner/ai-diagnosis')}
          style={{background: 'transparent', border: 'none', color: '#5c6661', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500'}}
        >
          <ArrowLeft size={16} /> Back to Upload & History
        </button>
        <div className="diagnosis-actions-top">
          <button className="new-diagnosis-btn" onClick={() => navigate('/owner/ai-diagnosis')}>New Diagnosis</button>
          <button className="cancel-btn" style={{display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => updateStatus('Monitoring')}>
            <Eye size={16} /> Mark as Monitoring
          </button>
          <button className="save-btn" style={{display: 'flex', alignItems: 'center', gap: '8px'}} onClick={() => updateStatus('Treated')}>
            <CheckCircle size={16} /> Mark as Treated
          </button>
          <button className="history-btn" style={{color: '#c93434', borderColor: '#fde8e8'}} onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="result-grid">
        <div className="result-image-panel">
          <img src={diagnosis.thumbnailUrl} alt={diagnosis.flowerName} />
          
          <div className="result-stats-row">
            <div className="stat-box">
              <span className="stat-value" style={{color: isHealthy ? '#389e65' : '#11281b'}}>{fullResult.healthScore}%</span>
              <span className="stat-label">Health Score</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{fullResult.healthyPercentage}%</span>
              <span className="stat-label">Healthy Area</span>
            </div>
          </div>
        </div>

        <div className="result-main-card">
          <div className="result-header">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div>
                <h1 className="result-title">{fullResult.flowerIdentification.likelyName}</h1>
                <div className="upload-subtitle">Identification Confidence: {Math.round(fullResult.flowerIdentification.confidence * 100)}% • Status: {diagnosis.status}</div>
              </div>
              <span className={`status-pill ${diagnosis.status.toLowerCase()}`}>{diagnosis.status}</span>
            </div>
          </div>

          <div className="result-section">
            <h3>Primary Finding</h3>
            <div className={`result-finding ${findingColorClass}`}>
              {fullResult.primaryFinding.name} ({fullResult.primaryFinding.category})
            </div>
            <p style={{margin: '8px 0 0 0', color: '#5c6661', fontSize: '14px'}}>
              Confidence: {Math.round(fullResult.primaryFinding.confidence * 100)}% • Severity: {fullResult.primaryFinding.severity} • Urgency: {fullResult.urgency}
            </p>
          </div>

          {fullResult.visibleSymptoms.length > 0 && (
            <div className="result-section">
              <h3>Visible Symptoms</h3>
              <ul className="result-list">
                {fullResult.visibleSymptoms.map((symptom, i) => <li key={i}>{symptom}</li>)}
              </ul>
            </div>
          )}

          {fullResult.recommendedActions.length > 0 && (
            <div className="result-section">
              <h3>Recommended Actions</h3>
              <ul className="result-list">
                {fullResult.recommendedActions.map((action, i) => <li key={i}>{action}</li>)}
              </ul>
            </div>
          )}

          {fullResult.treatmentGuidance.length > 0 && (
            <div className="result-section">
              <h3>Treatment Guidance</h3>
              <ul className="result-list">
                {fullResult.treatmentGuidance.map((treatment, i) => <li key={i}>{treatment}</li>)}
              </ul>
            </div>
          )}

          {fullResult.preventionTips.length > 0 && (
            <div className="result-section">
              <h3>Prevention Tips</h3>
              <ul className="result-list">
                {fullResult.preventionTips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}

          {fullResult.needsProfessionalReview && (
            <div className="recurring-alert" style={{marginTop: '24px'}}>
              <AlertTriangle size={18} />
              <span>This condition requires professional botanical review or specialized laboratory testing.</span>
            </div>
          )}

          <div className="disclaimer-box">
            {fullResult.disclaimer}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog 
          title="Delete Diagnosis"
          message={`Are you sure you want to delete this diagnosis record? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </main>
  )
}

export default DiagnosisResult
