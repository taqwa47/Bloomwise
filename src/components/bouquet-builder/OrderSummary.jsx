import React from 'react';

export default function OrderSummary({ state }) {
  const { 
    selectedFlowers, bouquetSize, bouquetStyle, wrappingStyle, wrappingColor, 
    containerOption, addOns, giftCard, fulfillment, coupon, bloomPoints 
  } = state;

  const flowersTotal = selectedFlowers.reduce((sum, f) => sum + (f.price * f.qty), 0);
  const sizePrice = bouquetSize?.price || 0;
  const wrappingPrice = wrappingStyle?.price || 0;
  const containerPrice = containerOption?.price || 0;
  const addOnsTotal = addOns.reduce((sum, a) => sum + (a.price * a.qty), 0);
  const cardPrice = giftCard.includeCard ? 10 : 0;
  const deliveryFee = fulfillment.type === 'Delivery' ? 35 : 0;

  const subtotal = flowersTotal + sizePrice + wrappingPrice + containerPrice + addOnsTotal + cardPrice;
  const total = subtotal + deliveryFee;

  return (
    <div className="bouquet-builder-summary">
      <h3 className="summary-title">Order Summary</h3>
      
      <div className="summary-items">
        {selectedFlowers.length > 0 && (
          <div style={{ marginBottom: 12, borderBottom: '1px dashed #e2e8e4', paddingBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#1a2f24', display: 'block', marginBottom: 8 }}>FLOWERS</span>
            {selectedFlowers.map(f => (
              <div key={f.id} className="summary-item" style={{ marginBottom: 4 }}>
                <span>{f.qty}x {f.name}</span>
                <span>₪{(f.price * f.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {(bouquetSize || bouquetStyle) && (
          <div style={{ marginBottom: 12, borderBottom: '1px dashed #e2e8e4', paddingBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#1a2f24', display: 'block', marginBottom: 8 }}>BOUQUET DETAILS</span>
            {bouquetSize && (
              <div className="summary-item">
                <span>Size: {bouquetSize.label}</span>
                <span>{sizePrice > 0 ? `₪${sizePrice.toFixed(2)}` : 'Included'}</span>
              </div>
            )}
            {bouquetStyle && (
              <div className="summary-item">
                <span>Style: {bouquetStyle}</span>
                <span>Included</span>
              </div>
            )}
            {wrappingStyle && (
              <div className="summary-item">
                <span>Wrap: {wrappingStyle.label} {wrappingColor ? `(${wrappingColor})` : ''}</span>
                <span>{wrappingPrice > 0 ? `₪${wrappingPrice.toFixed(2)}` : 'Free'}</span>
              </div>
            )}
            {containerOption && (
              <div className="summary-item">
                <span>Container: {containerOption.label}</span>
                <span>{containerPrice > 0 ? `₪${containerPrice.toFixed(2)}` : 'Free'}</span>
              </div>
            )}
          </div>
        )}

        {(addOns.length > 0 || giftCard.includeCard) && (
          <div style={{ marginBottom: 12, borderBottom: '1px dashed #e2e8e4', paddingBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#1a2f24', display: 'block', marginBottom: 8 }}>ADD-ONS & GIFTS</span>
            {addOns.map(a => (
              <div key={a.id} className="summary-item" style={{ marginBottom: 4 }}>
                <span>{a.qty}x {a.label}</span>
                <span>₪{(a.price * a.qty).toFixed(2)}</span>
              </div>
            ))}
            {giftCard.includeCard && (
              <div className="summary-item">
                <span>Gift Card ({giftCard.style || 'Standard'})</span>
                <span>₪10.00</span>
              </div>
            )}
          </div>
        )}

        {fulfillment.type && (
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#1a2f24', display: 'block', marginBottom: 8 }}>FULFILLMENT</span>
            <div className="summary-item">
              <span>{fulfillment.type}</span>
              <span>{deliveryFee > 0 ? `₪${deliveryFee.toFixed(2)}` : 'Free'}</span>
            </div>
            {fulfillment.date && fulfillment.time && (
              <div className="summary-item" style={{ fontSize: 12, color: '#88928d', marginTop: 4 }}>
                {fulfillment.date} at {fulfillment.time}
              </div>
            )}
          </div>
        )}

        <div className="summary-item total">
          <span>Final Total</span>
          <span>₪{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
