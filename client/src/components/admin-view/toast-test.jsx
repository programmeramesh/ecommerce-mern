import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

function ToastTest() {
  const { toast } = useToast();

  const testToasts = [
    {
      type: 'success',
      icon: CheckCircle,
      label: 'Success Toast',
      action: () => toast.success({
        title: "Success!",
        description: "Your operation completed successfully.",
      })
    },
    {
      type: 'destructive',
      icon: XCircle,
      label: 'Error Toast',
      action: () => toast.destructive({
        title: "Error!",
        description: "Something went wrong. Please try again.",
      })
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      label: 'Warning Toast',
      action: () => toast.warning({
        title: "Warning!",
        description: "Please check your input and try again.",
      })
    },
    {
      type: 'info',
      icon: Info,
      label: 'Info Toast',
      action: () => toast.info({
        title: "Information",
        description: "New features are now available!",
      })
    }
  ];

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Toast Variants Test</h1>
        <p className="text-gray-600 mb-8">Test all toast notification variants to ensure they're working correctly.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testToasts.map((toast, index) => {
            const IconComponent = toast.icon;
            return (
              <Button
                key={index}
                onClick={toast.action}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow"
              >
                <IconComponent className="h-6 w-6" />
                <span>{toast.label}</span>
              </Button>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">Test Instructions:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click each button to test the corresponding toast variant</li>
            <li>• Verify that each toast has the correct styling and colors</li>
            <li>• Check that toasts auto-dismiss after a few seconds</li>
            <li>• Ensure the close button works on each variant</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ToastTest;
