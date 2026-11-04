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
  Sparkles 
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
      // Fire celebration confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => !isProcessing && onClose()}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-[#111827] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e12d2d] flex items-center justify-center font-black text-sm">
              DS
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">DummyStore Secure Checkout</h3>
              <p className="text-[11px] text-gray-400">256-Bit Encrypted Payment Gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Payable Amount</span>
              <span className="text-base font-black text-white">₹{amount}</span>
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

        {/* Payment Tabs and Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-[380px]">
          
          {/* Tabs Sidebar */}
          <div className="bg-gray-50 border-r border-gray-100 p-2 space-y-1">
            <button
              onClick={() => setActiveTab('upi')}
              className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                activeTab === 'upi'
                  ? 'bg-white text-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <span>UPI / QR Code</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">Google Pay, PhonePe</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('card')}
              className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                activeTab === 'card'
                  ? 'bg-white text-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span>Cards</span>
                <span className="text-[10px] text-gray-400 font-normal block">Visa, Mastercard, RuPay</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('netbanking')}
              className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                activeTab === 'netbanking'
                  ? 'bg-white text-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span>Net Banking</span>
                <span className="text-[10px] text-gray-400 font-normal block">All Major Indian Banks</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('cod')}
              className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                activeTab === 'cod'
                  ? 'bg-white text-black shadow-xs border border-gray-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Banknote className="w-4 h-4" />
              </div>
              <div>
                <span>Cash On Delivery</span>
                <span className="text-[10px] text-gray-400 font-normal block">Pay at Doorstep</span>
              </div>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="md:col-span-2 p-6 flex flex-col justify-between">
            
            {/* 1. UPI Tab */}
            {activeTab === 'upi' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-gray-900">Scan &amp; Pay via UPI</h4>
                    <p className="text-xs text-gray-500">Scan using any UPI app (GPay, PhonePe, Paytm, CRED)</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {/* Generated QR Code Vector */}
                  <div className="p-3 bg-white rounded-lg shadow-xs border border-gray-200">
                    <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
                      {/* Stylized QR Code Mock */}
                      <rect width="100" height="100" fill="white" />
                      {/* Top-Left Corner */}
                      <rect x="10" y="10" width="24" height="24" rx="2" fill="#111827" />
                      <rect x="14" y="14" width="16" height="16" rx="1" fill="white" />
                      <rect x="18" y="18" width="8" height="8" fill="#111827" />

                      {/* Top-Right Corner */}
                      <rect x="66" y="10" width="24" height="24" rx="2" fill="#111827" />
                      <rect x="70" y="14" width="16" height="16" rx="1" fill="white" />
                      <rect x="74" y="18" width="8" height="8" fill="#111827" />

                      {/* Bottom-Left Corner */}
                      <rect x="10" y="66" width="24" height="24" rx="2" fill="#111827" />
                      <rect x="14" y="70" width="16" height="16" rx="1" fill="white" />
                      <rect x="18" y="74" width="8" height="8" fill="#111827" />

                      {/* Random Data Pattern Dots */}
                      <rect x="42" y="12" width="6" height="6" fill="#111827" />
                      <rect x="52" y="16" width="6" height="6" fill="#111827" />
                      <rect x="42" y="24" width="6" height="6" fill="#111827" />
                      <rect x="14" y="42" width="6" height="6" fill="#111827" />
                      <rect x="22" y="48" width="6" height="6" fill="#111827" />
                      <rect x="30" y="42" width="6" height="6" fill="#111827" />
                      <rect x="42" y="42" width="16" height="16" rx="3" fill="#e12d2d" />
                      {/* Center DS lettermark */}
                      <text x="44" y="54" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">DS</text>
                      <rect x="66" y="42" width="6" height="6" fill="#111827" />
                      <rect x="78" y="48" width="6" height="6" fill="#111827" />
                      <rect x="42" y="68" width="6" height="6" fill="#111827" />
                      <rect x="54" y="76" width="6" height="6" fill="#111827" />
                      <rect x="70" y="70" width="6" height="6" fill="#111827" />
                      <rect x="80" y="80" width="6" height="6" fill="#111827" />
                    </svg>
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-[11px] text-gray-500 font-medium">Official Merchant VPA:</span>
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-gray-200">
                      <span className="font-mono text-xs font-bold text-gray-800">dummystore@okhdfcbank</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard?.writeText('dummystore@okhdfcbank');
                          setCopiedUpi(true);
                          setTimeout(() => setCopiedUpi(false), 2000);
                        }}
                        className="text-gray-400 hover:text-black p-1"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-400">Accepted across BHIM, Google Pay, PhonePe, Paytm, CRED &amp; Amazon Pay</p>
                  </div>
                </div>

                <button
                  disabled={isProcessing}
                  onClick={() => triggerSuccess('UPI QR Code')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>Simulate "Payment Complete" Scan</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* 2. Card Tab */}
            {activeTab === 'card' && (
              <form onSubmit={handleCardSubmit} className="space-y-3.5">
                <div>
                  <h4 className="text-sm font-black text-gray-900 mb-0.5">Credit or Debit Card</h4>
                  <p className="text-xs text-gray-500">We accept Visa, Mastercard, RuPay &amp; Diners Club</p>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full mt-1 px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 uppercase">Expiry (MM/YY)</label>
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
                      <label className="text-[11px] font-bold text-gray-700 uppercase">CVV</label>
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
                    <label className="text-[11px] font-bold text-gray-700 uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name as printed on card"
                      className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-4 bg-[#111827] hover:bg-black text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
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
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-black text-gray-900 mb-0.5">Select Net Banking Bank</h4>
                  <p className="text-xs text-gray-500">Instant direct debits via RBI authorized payment aggregator</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all ${
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
                  className="w-full bg-[#111827] hover:bg-black text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
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
              <form onSubmit={handleCodSubmit} className="space-y-4">
                <div>
                  <h4 className="text-sm font-black text-gray-900 mb-0.5">Cash On Delivery (COD)</h4>
                  <p className="text-xs text-gray-500">Pay cash or scan courier QR at doorstep upon delivery</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                  <p className="font-semibold">Anti-bot Verification Required:</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">Please type the 4 characters shown below to confirm your COD order.</p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Verification Code</label>
                  <div className="flex items-center gap-3 mt-1.5">
                    {/* Captcha Box */}
                    <div className="px-4 py-2 bg-gray-900 rounded-lg text-lg font-black tracking-widest text-[#facc15] font-mono select-none line-through">
                      {captchaCode}
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="Refresh Captcha"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      maxLength="4"
                      placeholder="Type code"
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
                    <p className="text-red-500 text-xs mt-1 font-semibold">
                      Invalid code. Please enter the characters correctly.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#e12d2d] hover:bg-[#c81e1e] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
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

            {/* Footer Trust Guarantee */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>PCI-DSS Level 1 Compliant • 100% Buyer Protection Guaranteed</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
