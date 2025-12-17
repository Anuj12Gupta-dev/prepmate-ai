import { useState } from "react";
import { LockIcon, XIcon, AlertCircleIcon } from "lucide-react";

function PasswordModal({ isOpen, onClose, onSubmit, isCreating }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Validate password
    if (password.length !== 4) {
      setErrors(prev => ({ ...prev, password: "Password must be exactly 4 digits" }));
      return;
    }
    
    // Validate confirm password
    if (confirmPassword.length !== 4) {
      setErrors(prev => ({ ...prev, confirmPassword: "Password must be exactly 4 digits" }));
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return;
    }
    
    onSubmit(password);
  };

  return (
    // Modal Backdrop and Container
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-md mx-4 rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <XIcon className="size-5 text-slate-500" />
        </button>
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5">
          <h3 className="font-semibold text-2xl text-white flex items-center gap-2">
            <LockIcon className="size-6 text-blue-400" />
            Set Session Password
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Enter a 4-digit password to protect your session
          </p>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Password Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  maxLength="4"
                  placeholder="Enter 4-digit password"
                  className={`w-full h-12 px-4 rounded-lg border bg-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.password ? 'border-red-500' : 'border-white/10'}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.replace(/\D/g, ''));
                    // Clear error when user starts typing
                    if (errors.password) {
                      setErrors(prev => ({ ...prev, password: '' }));
                    }
                  }}
                  required
                />
                {errors.password && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                    <AlertCircleIcon className="size-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  maxLength="4"
                  placeholder="Confirm 4-digit password"
                  className={`w-full h-12 px-4 rounded-lg border bg-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'}`}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value.replace(/\D/g, ''));
                    // Clear error when user starts typing
                    if (errors.confirmPassword) {
                      setErrors(prev => ({ ...prev, confirmPassword: '' }));
                    }
                  }}
                  required
                />
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                    <AlertCircleIcon className="size-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Info Note */}
            <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-500/50">
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">Note:</span> Share this password only with participants you want to join your session.
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 p-4 border-t border-white/5">
            <button 
              type="button"
              className="h-10 px-5 rounded-full text-slate-400 hover:bg-white/5 transition-colors" 
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-10 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isCreating}
            >
              Set Password
            </button>
          </div>
        </form>
      </div>
      
      {/* Clickable Backdrop for closing */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
    </div>
  );
}

export default PasswordModal;