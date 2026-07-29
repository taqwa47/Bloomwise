import React from 'react';

const SUGGESTED_MESSAGES = [
  "Happy Birthday! Wishing you a wonderful day.",
  "Happy Anniversary! Here's to many more years.",
  "Thinking of you. Hope this brightens your day.",
  "Congratulations! So proud of you.",
  "Thank you for everything."
];

const CARD_STYLES = [
  'Romantic', 'Birthday', 'Elegant', 'Congratulations', 'Thank You', 'Simple'
];

export default function GiftCardForm({ giftCard, setGiftCard }) {
  const maxChars = 300;
  const charsLeft = maxChars - (giftCard.message?.length || 0);

  const updateField = (field, value) => {
    setGiftCard(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3 className="step-title">7. Gift Card</h3>
      
      <div className="options-grid" style={{ marginBottom: 24 }}>
        <div 
          className={`option-card ${!giftCard.includeCard ? 'selected' : ''}`}
          onClick={() => updateField('includeCard', false)}
        >
          <h4>No Card</h4>
          <span className="price">Free</span>
        </div>
        <div 
          className={`option-card ${giftCard.includeCard ? 'selected' : ''}`}
          onClick={() => updateField('includeCard', true)}
        >
          <h4>Add a Card</h4>
          <span className="price">+₪10</span>
        </div>
      </div>

      {giftCard.includeCard && (
        <div style={{ background: '#f8faf9', padding: 24, borderRadius: 16 }}>
          <div className="form-group">
            <label>Card Style</label>
            <select 
              value={giftCard.style || ''} 
              onChange={e => updateField('style', e.target.value)}
            >
              <option value="">Select a style...</option>
              {CARD_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Card Message</label>
            <textarea 
              rows="4" 
              maxLength={maxChars}
              placeholder="Write your message here..."
              value={giftCard.message || ''}
              onChange={e => updateField('message', e.target.value)}
            ></textarea>
            <div style={{ fontSize: 12, color: charsLeft < 20 ? '#dc2626' : '#88928d', marginTop: 4, textAlign: 'right' }}>
              {charsLeft} characters remaining
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#5c6661', display: 'block', marginBottom: 8 }}>Suggested Messages:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SUGGESTED_MESSAGES.map(msg => (
                <button 
                  key={msg}
                  type="button"
                  onClick={() => updateField('message', msg)}
                  style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #e2e8e4', background: '#fff', fontSize: 12, cursor: 'pointer', color: '#5c6661' }}
                >
                  {msg}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Sender Name (From)</label>
              <input 
                type="text" 
                value={giftCard.sender || ''}
                onChange={e => updateField('sender', e.target.value)}
                disabled={giftCard.isAnonymous}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Recipient Name (To)</label>
              <input 
                type="text" 
                value={giftCard.recipient || ''}
                onChange={e => updateField('recipient', e.target.value)}
              />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
            <input 
              type="checkbox" 
              checked={giftCard.isAnonymous || false}
              onChange={e => updateField('isAnonymous', e.target.checked)}
              style={{ width: 'auto' }}
            />
            Send anonymously (Hide sender name on the card)
          </label>
        </div>
      )}
    </div>
  );
}
