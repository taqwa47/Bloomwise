import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

import '../../styles/BouquetBuilder.css';

import FlowerSelector from '../../components/bouquet-builder/FlowerSelector';
import BouquetSizeSelector from '../../components/bouquet-builder/BouquetSizeSelector';
import BouquetStyleSelector from '../../components/bouquet-builder/BouquetStyleSelector';
import WrappingSelector from '../../components/bouquet-builder/WrappingSelector';
import ContainerSelector from '../../components/bouquet-builder/ContainerSelector';
import AddOnsSelector from '../../components/bouquet-builder/AddOnsSelector';
import GiftCardForm from '../../components/bouquet-builder/GiftCardForm';
import DeliveryPickupForm from '../../components/bouquet-builder/DeliveryPickupForm';
import PaymentReview from '../../components/bouquet-builder/PaymentReview';
import OrderSummary from '../../components/bouquet-builder/OrderSummary';

const STEPS = [
  'Flowers', 'Size', 'Style', 'Wrapping', 'Container', 'Add-ons', 'Gift Card', 'Fulfillment', 'Payment & Review'
];

export default function BouquetBuilder() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form State
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [bouquetSize, setBouquetSize] = useState(null);
  const [bouquetStyle, setBouquetStyle] = useState('');
  const [designInstructions, setDesignInstructions] = useState('');
  const [wrappingStyle, setWrappingStyle] = useState(null);
  const [wrappingColor, setWrappingColor] = useState('');
  const [containerOption, setContainerOption] = useState(null);
  const [addOns, setAddOns] = useState([]);
  const [giftCard, setGiftCard] = useState({ includeCard: false, message: '', sender: '', recipient: '', isAnonymous: false, style: '' });
  const [fulfillment, setFulfillment] = useState({ type: 'Delivery', date: '', time: '', recipientName: '', recipientPhone: '', city: '', address: '', instructions: '' });
  const [customerInfo, setCustomerInfo] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // Derived state
  const totalStems = selectedFlowers.reduce((sum, f) => sum + f.qty, 0);

  const validateStep = () => {
    setError('');
    if (currentStep === 0) {
      if (selectedFlowers.length === 0) {
        setError('Please select at least one flower type.');
        return false;
      }
    } else if (currentStep === 1) {
      if (!bouquetSize) {
        setError('Please select a bouquet size.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!bouquetStyle) {
        setError('Please select a bouquet style.');
        return false;
      }
    } else if (currentStep === 3) {
      if (!wrappingStyle) {
        setError('Please select a wrapping style.');
        return false;
      }
      if (wrappingStyle.id !== 'No Wrapping' && !wrappingColor) {
        setError('Please select a wrapping color.');
        return false;
      }
    } else if (currentStep === 4) {
      if (!containerOption) {
        setError('Please select a container option.');
        return false;
      }
    } else if (currentStep === 7) {
      if (!customerInfo.name || !customerInfo.phone) {
        setError('Please fill in your customer information.');
        return false;
      }
      if (!fulfillment.date || !fulfillment.time) {
        setError('Please select a valid date and time.');
        return false;
      }
      if (fulfillment.type === 'Delivery') {
        if (!fulfillment.recipientName || !fulfillment.address || !fulfillment.city) {
          setError('Please fill in all required delivery details.');
          return false;
        }
      }
    } else if (currentStep === 8) {
      if (!paymentMethod) {
        setError('Please select a payment method.');
        return false;
      }
      if (!confirmed) {
        setError('You must confirm the order details before submitting.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const calculateTotal = () => {
    const flowersTotal = selectedFlowers.reduce((sum, f) => sum + (f.price * f.qty), 0);
    const sizePrice = bouquetSize?.price || 0;
    const wrappingPrice = wrappingStyle?.price || 0;
    const containerPrice = containerOption?.price || 0;
    const addOnsTotal = addOns.reduce((sum, a) => sum + (a.price * a.qty), 0);
    const cardPrice = giftCard.includeCard ? 10 : 0;
    const deliveryFee = fulfillment.type === 'Delivery' ? 35 : 0;
    return flowersTotal + sizePrice + wrappingPrice + containerPrice + addOnsTotal + cardPrice + deliveryFee;
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    const newOrderId = `#CB-${Math.floor(Math.random() * 9000) + 1000}`;
    const total = calculateTotal();

    const orderData = {
      id: newOrderId,
      orderType: 'custom-bouquet',
      customerId: user?.id || 'guest',
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      recipient: fulfillment.recipientName || customerInfo.name,
      flowers: selectedFlowers,
      bouquetSize: bouquetSize.label,
      bouquetStyle,
      designInstructions,
      wrapping: { style: wrappingStyle.label, color: wrappingColor },
      container: containerOption.label,
      addOns,
      giftCard,
      fulfillmentType: fulfillment.type,
      deliveryDetails: fulfillment.type === 'Delivery' ? fulfillment : null,
      pickupDetails: fulfillment.type === 'Pickup' ? { date: fulfillment.date, time: fulfillment.time } : null,
      paymentMethod,
      amount: total,
      item: 'Custom Bouquet Builder',
      status: 'Pending',
      date: 'Today',
      fullDate: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('bloomwise_orders') || '[]');
    localStorage.setItem('bloomwise_orders', JSON.stringify([orderData, ...existingOrders]));

    setOrderId(newOrderId);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bouquet-builder-container" style={{ alignItems: 'center', textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ background: '#f0fdf4', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={40} color="#16a34a" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: '#1a2f24', margin: '0 0 16px' }}>Order Submitted Successfully!</h2>
        <p style={{ color: '#5c6661', fontSize: 18, maxWidth: 500, margin: '0 auto 32px' }}>
          Your custom bouquet order <strong>{orderId}</strong> has been received. Our florists will start reviewing it shortly.
        </p>
        <div style={{ background: '#f8faf9', border: '1px solid #e2e8e4', borderRadius: 16, padding: 24, maxWidth: 400, margin: '0 auto 32px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: '#5c6661' }}>Total Price</span>
            <span style={{ fontWeight: 600, color: '#1a2f24' }}>₪{calculateTotal().toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: '#5c6661' }}>Fulfillment</span>
            <span style={{ fontWeight: 600, color: '#1a2f24' }}>{fulfillment.type}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#5c6661' }}>Date & Time</span>
            <span style={{ fontWeight: 600, color: '#1a2f24' }}>{fulfillment.date} {fulfillment.time}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button className="btn btn-outline" onClick={() => navigate('/customer/home')}>
            Back to Home
          </button>
          <button className="btn btn-primary" onClick={() => {
            // Reset state if they want to build another
            setIsSubmitted(false);
            setCurrentStep(0);
            setSelectedFlowers([]);
            setBouquetSize(null);
            setBouquetStyle('');
            setWrappingStyle(null);
            setContainerOption(null);
            setAddOns([]);
            setConfirmed(false);
            setOrderId('');
          }}>
            Build Another Bouquet
          </button>
        </div>
      </div>
    );
  }

  const allState = {
    selectedFlowers, bouquetSize, bouquetStyle, wrappingStyle, wrappingColor, 
    containerOption, addOns, giftCard, fulfillment, coupon: null, bloomPoints: 0
  };

  return (
    <div className="bouquet-builder-container">
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, margin: '0 0 8px', color: '#1a2f24' }}>Build Your Custom Bouquet</h1>
        <p style={{ color: '#5c6661', margin: 0, fontSize: 16 }}>Follow the steps to design your perfect arrangement.</p>
      </div>

      {/* Progress Bar (simplified for desktop) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
        {STEPS.map((step, idx) => (
          <React.Fragment key={step}>
            <div 
              style={{ 
                padding: '6px 12px', 
                borderRadius: 16, 
                fontSize: 13, 
                fontWeight: 600, 
                whiteSpace: 'nowrap',
                background: currentStep === idx ? '#315e47' : currentStep > idx ? '#eef3ef' : '#f8faf9',
                color: currentStep === idx ? '#fff' : currentStep > idx ? '#315e47' : '#88928d',
                cursor: currentStep > idx ? 'pointer' : 'default', // Can click back to completed steps
                border: `1px solid ${currentStep === idx ? '#315e47' : '#e2e8e4'}`
              }}
              onClick={() => {
                if (idx < currentStep) setCurrentStep(idx);
              }}
            >
              {step}
            </div>
            {idx < STEPS.length - 1 && <ChevronRight size={16} color="#cbd5e1" />}
          </React.Fragment>
        ))}
      </div>

      <div className="bouquet-builder-layout">
        
        {/* Left Form Side */}
        <div className="bouquet-builder-form">
          {currentStep === 0 && <FlowerSelector selectedFlowers={selectedFlowers} setSelectedFlowers={setSelectedFlowers} />}
          {currentStep === 1 && <BouquetSizeSelector bouquetSize={bouquetSize} setBouquetSize={setBouquetSize} totalStems={totalStems} />}
          {currentStep === 2 && <BouquetStyleSelector bouquetStyle={bouquetStyle} setBouquetStyle={setBouquetStyle} designInstructions={designInstructions} setDesignInstructions={setDesignInstructions} />}
          {currentStep === 3 && <WrappingSelector wrappingStyle={wrappingStyle} setWrappingStyle={setWrappingStyle} wrappingColor={wrappingColor} setWrappingColor={setWrappingColor} />}
          {currentStep === 4 && <ContainerSelector containerOption={containerOption} setContainerOption={setContainerOption} />}
          {currentStep === 5 && <AddOnsSelector addOns={addOns} setAddOns={setAddOns} />}
          {currentStep === 6 && <GiftCardForm giftCard={giftCard} setGiftCard={setGiftCard} />}
          {currentStep === 7 && <DeliveryPickupForm fulfillment={fulfillment} setFulfillment={setFulfillment} customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} />}
          {currentStep === 8 && <PaymentReview paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} fulfillmentType={fulfillment.type} confirmed={confirmed} setConfirmed={setConfirmed} />}

          {error && (
            <div style={{ color: '#dc2626', background: '#fee2e2', padding: 12, borderRadius: 8, marginTop: 24, fontSize: 14 }}>
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="step-navigation">
            <button className="btn btn-outline" onClick={prevStep} disabled={currentStep === 0} style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}>
              <ArrowLeft size={18} /> Back
            </button>
            
            {currentStep < STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={nextStep}>
                Next Step <ArrowRight size={18} />
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Confirm Order
              </button>
            )}
          </div>
        </div>

        {/* Right Summary Side */}
        <OrderSummary state={allState} />
      </div>
    </div>
  );
}
