import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = React.createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast } = context;

  const toast = {
    success: (message, options = {}) => addToast({
      type: 'success',
      title: options.title || 'Success',
      message,
      ...options
    }),
    error: (message, options = {}) => addToast({
      type: 'error',
      title: options.title || 'Error',
      message,
      ...options
    }),
    warning: (message, options = {}) => addToast({
      type: 'warning',
      title: options.title || 'Warning',
      message,
      ...options
    }),
    info: (message, options = {}) => addToast({
      type: 'info',
      title: options.title || 'Info',
      message,
      ...options
    }),
    custom: (options) => addToast(options)
  };

  return { toast };
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  const getToastStyles = () => {
    const baseStyles = "transform transition-all duration-300 ease-in-out";
    
    if (isLeaving) {
      return `${baseStyles} translate-x-full opacity-0`;
    }
    
    if (isVisible) {
      return `${baseStyles} translate-x-0 opacity-100`;
    }
    
    return `${baseStyles} translate-x-full opacity-0`;
  };

  const getToastConfig = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-white',
          borderColor: 'border-l-green-500',
          iconColor: 'text-green-500',
          titleColor: 'text-green-800'
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-white',
          borderColor: 'border-l-red-500',
          iconColor: 'text-red-500',
          titleColor: 'text-red-800'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-white',
          borderColor: 'border-l-yellow-500',
          iconColor: 'text-yellow-500',
          titleColor: 'text-yellow-800'
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-white',
          borderColor: 'border-l-blue-500',
          iconColor: 'text-blue-500',
          titleColor: 'text-blue-800'
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-white',
          borderColor: 'border-l-gray-500',
          iconColor: 'text-gray-500',
          titleColor: 'text-gray-800'
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <div className={getToastStyles()}>
      <div className={`
        ${config.bgColor} ${config.borderColor} 
        border-l-4 rounded-lg shadow-lg p-4 
        border border-gray-200
        backdrop-blur-sm
        hover:shadow-xl transition-shadow duration-200
      `}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${config.iconColor}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          
          <div className="ml-3 flex-1">
            {toast.title && (
              <h4 className={`text-sm font-semibold ${config.titleColor} mb-1`}>
                {toast.title}
              </h4>
            )}
            <p className="text-sm text-gray-700">
              {toast.message}
            </p>
            {toast.action && (
              <div className="mt-2">
                <button
                  onClick={toast.action.onClick}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Modern Toast Variants
export function SuccessToast({ message, title = "Success!", onClose }) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
        <div className="ml-3 flex-1">
          <h4 className="text-sm font-semibold text-green-800 mb-1">{title}</h4>
          <p className="text-sm text-green-700">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-green-400 hover:text-green-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function ErrorToast({ message, title = "Error!", onClose }) {
  return (
    <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <h4 className="text-sm font-semibold text-red-800 mb-1">{title}</h4>
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-red-400 hover:text-red-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function LoadingToast({ message = "Loading...", progress }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-800">{message}</p>
          {progress !== undefined && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default { ToastProvider, useToast, SuccessToast, ErrorToast, LoadingToast };
