import React, { useState } from 'react';
import { Button } from '../ui/button';
import { 
  LoadingSpinner, 
  ModernLoader, 
  PulseLoader, 
  DotsLoader, 
  ProgressLoader,
  LoadingCard,
  LoadingProductGrid,
  LoadingDashboard
} from './loading-spinner';
import { 
  SuccessToast, 
  ErrorToast, 
  LoadingToast,
  useToast 
} from '../ui/modern-toast';

function LoaderToastDemo() {
  const [progress, setProgress] = useState(0);
  const [showToasts, setShowToasts] = useState({
    success: false,
    error: false,
    loading: false
  });
  const { toast } = useToast();

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const showToast = (type) => {
    switch (type) {
      case 'success':
        toast.success({
          title: 'Operation completed successfully!',
        });
        break;
      case 'destructive':
        toast.destructive({
          title: 'Something went wrong. Please try again.',
        });
        break;
      case 'warning':
        toast.warning({
          title: 'Please check your input and try again.',
        });
        break;
      case 'info':
        toast.info({
          title: 'New features are now available!',
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Modern Loader & Toast Demo</h1>
        
        {/* Loading Spinners Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Loading Spinners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Basic Spinner</h3>
              <LoadingSpinner size="lg" color="blue" />
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Modern Loader</h3>
              <ModernLoader text="Loading..." />
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Pulse Loader</h3>
              <PulseLoader />
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Dots Loader</h3>
              <DotsLoader />
            </div>
          </div>
        </div>

        {/* Progress Loader Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Progress Loader</h2>
          <ProgressLoader progress={progress} text="Uploading files..." />
          <div className="mt-4 text-center">
            <Button onClick={simulateProgress} className="bg-blue-500 hover:bg-blue-600 text-white">
              Simulate Progress
            </Button>
          </div>
        </div>

        {/* Toast Notifications Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Toast Notifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => showToast('success')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Success Toast
            </Button>
            <Button 
              onClick={() => showToast('destructive')}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Destructive Toast
            </Button>
            <Button 
              onClick={() => showToast('warning')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Warning Toast
            </Button>
            <Button 
              onClick={() => showToast('info')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Info Toast
            </Button>
          </div>
        </div>

        {/* Static Toast Examples */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Static Toast Examples</h2>
          <div className="space-y-4 max-w-sm">
            <SuccessToast 
              message="Product added successfully!" 
              title="Success!"
            />
            <ErrorToast 
              message="Failed to delete product. Please try again." 
              title="Error!"
            />
            <LoadingToast 
              message="Uploading image..." 
              progress={65}
            />
          </div>
        </div>

        {/* Skeleton Loading States */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Skeleton Loading States</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Loading Card</h3>
              <LoadingCard />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Loading Product Grid (Preview)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                    <div className="w-full h-32 bg-gray-200"></div>
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded flex-1"></div>
                        <div className="h-6 bg-gray-200 rounded flex-1"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoaderToastDemo;
