
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  error?: Error | null;
  title?: string;
  message?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, title, message }) => {
  return (
    <div className="text-center p-8">
      <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">{title || "Error Loading Data"}</h2>
      <p className="text-gray-600 mb-4">{message || error?.toString()}</p>
      <button 
        className="bg-primary text-white px-4 py-2 rounded-md"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorDisplay;
