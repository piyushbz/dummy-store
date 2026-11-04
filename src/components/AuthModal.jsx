import React, { useState } from 'react';
import { X, Smartphone, Mail, Lock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DummyMascotIcon } from './BrandLogo';

export default function AuthModal({ isOpen, onClose }) {
  const { setUser } = useShop();
  const [step, setStep] = useState(1); // 1: contact | 2: otp
  const [contact, setContact] = useState('9024556229');
  const [name, setName] = useState('Piyush Rathi');
  const [otp, setOtp] = useState('7788');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!contact.trim()) {
      setError('Please enter a valid mobile number or email');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '7788' && otp.length !== 4) {
      setError('Invalid OTP. Use demo code: 7788');
      return;
    }

    const userData = {
      name: name || 'Demo Shopper',
      phone: contact.includes('@') ? '9024556229' : contact,
      email: contact.includes('@') ? contact : 'piyush@example.com'
    };

    setUser(userData);
    localStorage.setItem('dummystore_user', JSON.stringify(userData));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-[#111827] text-white px-6 py-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto mb-2">
            <DummyMascotIcon />
          </div>

          <h3 className="text-lg font-black tracking-tight">Welcome to DummyStore</h3>
          <p className="text-xs text-gray-400 mt-1">Unlock seamless checkout, wishlist &amp; tracking</p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Piyush Rathi"
                  className="w-full mt-1.5 px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Mobile Number or Email</label>
                <div className="relative mt-1.5">
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter 10-digit mobile or email"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:outline-hidden"
                    required
                  />
                  <Smartphone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 font-semibold">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#e12d2d] hover:bg-[#c81e1e] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Continue &amp; Send OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-gray-400">
                By continuing, you agree to DummyStore's Terms of Use &amp; Privacy Policy.
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center">
                <span className="text-xs text-gray-500">OTP sent to:</span>
                <p className="text-xs font-bold text-gray-900">{contact}</p>
              </div>

              {/* Demo Hint Banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                <span className="text-[11px] font-bold text-amber-800">
                  Demo Verification Code: <strong className="font-mono text-sm font-black text-amber-950">7788</strong>
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase text-center block">
                  Enter 4-Digit OTP
                </label>
                <input
                  type="text"
                  maxLength="4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-40 mx-auto mt-2 px-3 py-2 text-center text-xl font-mono font-bold tracking-widest bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:outline-hidden block"
                  required
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 font-semibold text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#111827] hover:bg-black text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Verify &amp; Sign In</span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] text-gray-500 hover:text-black font-semibold"
                >
                  Change Mobile / Email
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
