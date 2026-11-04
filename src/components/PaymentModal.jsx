import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  CreditCard, 
  Building2, 
  Banknote, 
  Copy, 
  Check, 
  ShieldCheck, 
  RefreshCw, 
  Lock, 
  Clock, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  amount = 899,
  customer = {}
}) {
  const [activeTab, setActiveTab] = useState('upi'); // upi | card | netbanking | cod
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // UPI Timer (5 minutes)
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(300);
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8920 1823 4492');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('883');
  const [cardName, setCardName] = useState(customer?.name || 'Piyush Rathi');

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // COD Captcha state
  const [captchaCode, setCaptchaCode] = useState('8K4P');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
    setCaptchaError(false);
  };

  useEffect(() => {
    if (isOpen) generateCaptcha();
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerSuccess = (methodName) => {
    setIsProcessing(true);
    setTimeout(() => {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setIsProcessing(false);
      onSuccess({ paymentMethod: methodName });
    }, 1200);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    triggerSuccess('Credit / Debit Card');
  };

  const handleCodSubmit = (e) => {
    e.preventDefault();
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setCaptchaError(true);
      return;
    }
    triggerSuccess('Cash on Delivery (COD)');
  };

  const tabs = [
    { id: 'upi', label: 'UPI / QR', icon: QrCode, sub: 'GPay, PhonePe' },
    { id: 'card', label: 'Cards', icon: CreditCard, sub: 'Visa, RuPay' },
    { id: 'netbanking', label: 'NetBanking', icon: Building2, sub: 'All Banks' },
    { id: 'cod', label: 'COD', icon: Banknote, sub: 'Cash at Door' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => !isProcessing && onClose()}
      />

      {/* Modal Dialog (Bottom sheet on mobile, centered modal on tablet/desktop) */}
      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-10 max-h-[92vh] sm:max-h-none flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-[#111827] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#e12d2d] flex items-center justify-center font-black text-xs sm:text-sm">
              DS
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold tracking-tight">DummyStore Secure Checkout</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400">256-Bit Encrypted Indian Gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider block">Payable</span>
              <span className="text-sm sm:text-base font-black text-white font-mono">₹{amount}</span>
            </div>
            {!isProcessing && (
              <button 
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Tab Selector (Slick Pill Row for Phones) */}
        <div className="sm:hidden flex bg-gray-100 p-1.5 overflow-x-auto gap-1 border-b border-gray-200 scrollbar-none shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-black shadow-xs ring-1 ring-black/10'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#e12d2d]' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tablet & Desktop Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 flex-1 overflow-y-auto">
          
          {/* Desktop Tabs Sidebar */}
          <div className="hidden sm:block bg-gray-50 border-r border-gray-100 p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-white text-black shadow-xs border border-gray-200'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#e12d2d]" />
                  </div>
                  <div>
                    <span>{tab.label}</span>
                    <span className="text-[10px] text-gray-400 font-normal block">{tab.sub}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="sm:col-span-2 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-4">
            
            {/* 1. UPI Tab (Indian Mobile Priority) */}
            {activeTab === 'upi' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-gray-900">Instant UPI Payment</h4>
                    <p className="text-[11px] text-gray-500">Pay directly from any mobile UPI application</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>
                </div>

                {/* Mobile Direct UPI Intent Buttons */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
                    Fast 1-Tap UPI Apps:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => triggerSuccess('Google Pay UPI')}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-black bg-gray-50 hover:bg-white text-center transition-all active:scale-95"
                    >
                      <span className="text-xs font-black block text-[#0F9D58]">GPay</span>
                      <span className="text-[9px] text-gray-400 font-medium">Instant</span>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => triggerSuccess('PhonePe UPI')}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-black bg-gray-50 hover:bg-white text-center transition-all active:scale-95"
                    >
                      <span className="text-xs font-black block text-[#5f259f]">PhonePe</span>
                      <span className="text-[9px] text-gray-400 font-medium">Instant</span>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => triggerSuccess('Paytm UPI')}
                      className="p-2.5 rounded-xl border border-gray-200 hover:border-black bg-gray-50 hover:bg-white text-center transition-all active:scale-95"
                    >
                      <span className="text-xs font-black block text-[#00baf2]">Paytm</span>
                      <span className="text-[9px] text-gray-400 font-medium">Instant</span>
                    </button>
                  </div>
                </div>

                {/* QR & VPA Box */}
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200/80">
                  {/* Generated QR Code Vector */}
                  <div className="p-2 bg-white rounded-lg shadow-xs border border-gray-200 shrink-0">
                    <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 100 100" fill="none">
                      <rect width="100" height="100" fill="white" />
                      <rect x="10" y="10" width="24" height="24" rx="2" fill="#111827" />
                      <rect x="14" y="14" width="16" height="16" rx="1" fill="white" />
                      <rect x="18" y="18" width="8" height="8" fill="#111827" />
                      <rect x="66" y="10" width="24" height="24" rx="2" fill="#111827" />
                      <rect x="70" y="14" width="16" height="16" rx="1" fill="white" />
                      <rect x="74" y="18" width="8" height="8" fill="#111827" />
                      <rect x="10" y="66" width="24" height="24" rx="2" fill="#111827" />
                      <rect x="14" y="70" width="16" height="16" rx="1" fill="white" />
                      <rect x="18" y="74" width="8" height="8" fill="#111827" />
                      <rect x="42" y="12" width="6" height="6" fill="#111827" />
                      <rect x="52" y="16" width="6" height="6" fill="#111827" />
                      <rect x="42" y="24" width="6" height="6" fill="#111827" />
                      <rect x="14" y="42" width="6" height="6" fill="#111827" />
                      <rect x="22" y="48" width="6" height="6" fill="#111827" />
                      <rect x="42" y="42" width="16" height="16" rx="3" fill="#e12d2d" />
                      <text x="44" y="54" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">DS</text>
                      <rect x="66" y="42" width="6" height="6" fill="#111827" />
                      <rect x="78" y="48" width="6" height="6" fill="#111827" />
                      <rect x="42" y="68" width="6" height="6" fill="#111827" />
                      <rect x="70" y="70" width="6" height="6" fill="#111827" />
                    </svg>
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
                    <span className="text-[10px] text-gray-500 font-semibold block">DummyStore VPA ID:</span>
                    <div className="flex items-center justify-center sm:justify-start gap-1 bg-white px-2 py-1 rounded-md border border-gray-200">
                      <span className="font-mono text-[11px] font-bold text-gray-800 truncate">dummystore@okhdfcbank</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard?.writeText('dummystore@okhdfcbank');
                          setCopiedUpi(true);
                          setTimeout(() => setCopiedUpi(false), 2000);
                        }}
                        className="text-gray-400 hover:text-black p-0.5 shrink-0"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[9px] text-gray-400">Scan via BHIM, CRED, Amazon Pay or any bank UPI app</p>
                  </div>
                </div>

                <button
                  disabled={isProcessing}
                  onClick={() => triggerSuccess('UPI QR Code')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>Simulate "Payment Complete" (₹{amount})</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* 2. Card Tab */}
            {activeTab === 'card' && (
              <form onSubmit={handleCardSubmit} className="space-y-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-gray-900 mb-0.5">Credit or Debit Card</h4>
                  <p className="text-[11px] text-gray-500">Visa, Mastercard, RuPay, Maestro</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] font-bold text-gray-700 uppercase">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full mt-1 px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-gray-700 uppercase">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full mt-1 px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-700 uppercase">CVV</label>
                      <input
                        type="password"
                        maxLength="4"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full mt-1 px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-700 uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on card"
                      className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-3 bg-[#111827] hover:bg-black text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pay ₹{amount} Securely</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 3. Net Banking Tab */}
            {activeTab === 'netbanking' && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-gray-900 mb-0.5">Select Net Banking Bank</h4>
                  <p className="text-[11px] text-gray-500">Direct debit via RBI approved aggregator</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2 rounded-lg border text-left text-xs font-bold transition-all ${
                        selectedBank === bank
                          ? 'border-[#e12d2d] bg-red-50 text-[#e12d2d]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-800'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>

                <button
                  disabled={isProcessing}
                  onClick={() => triggerSuccess(`Netbanking (${selectedBank})`)}
                  className="w-full bg-[#111827] hover:bg-black text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Building2 className="w-4 h-4" />
                      <span>Proceed to {selectedBank}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* 4. COD Tab */}
            {activeTab === 'cod' && (
              <form onSubmit={handleCodSubmit} className="space-y-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-gray-900 mb-0.5">Cash On Delivery (COD)</h4>
                  <p className="text-[11px] text-gray-500">Pay cash or scan courier QR at doorstep</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900">
                  <p className="font-semibold">Verification Code Required</p>
                  <p className="text-[10px] text-amber-800 mt-0.5">Enter the 4 characters to confirm delivery.</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="px-3 py-1.5 bg-gray-900 rounded-lg text-base font-black tracking-widest text-[#facc15] font-mono select-none line-through shrink-0">
                      {captchaCode}
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-1.5 border border-gray-200 rounded-lg text-gray-600"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="text"
                      maxLength="4"
                      placeholder="Code"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value.toUpperCase());
                        setCaptchaError(false);
                      }}
                      className="flex-1 px-3 py-2 text-xs font-mono uppercase bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                      required
                    />
                  </div>
                  {captchaError && (
                    <p className="text-red-500 text-[10px] mt-1 font-semibold">
                      Invalid code. Please re-enter.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#e12d2d] hover:bg-[#c81e1e] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Banknote className="w-4 h-4" />
                      <span>Confirm COD Order (₹{amount})</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Trust Guarantee */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Buyer Protection • Secure &amp; Verified</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
