import React from 'react'
import '../../styles/Analytics.css'

export const CustomTooltip = ({ active, payload, label, prefix = '', suffix = '', valueLabel = 'Revenue' }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value
    
    // Format the value with commas
    const formattedValue = new Intl.NumberFormat('en-US').format(value)
    
    return (
      <div className="analytics-tooltip">
        <p className="tooltip-title">{label}</p>
        <p className="tooltip-value">
          {valueLabel}: {prefix}{formattedValue}{suffix}
        </p>
      </div>
    )
  }

  return null
}
