
import { toast as sonnerToast } from "sonner";

// Define toast options type
type ToastOptions = {
  description?: React.ReactNode;
  action?: React.ReactElement;
  // Only include types that Sonner actually supports
  // Sonner supports: success, error, info, warning, loading
};

// Define the shape of toast data for our components
export type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
};

// Wrapper function for Sonner toast
export function toast(title: string, options?: ToastOptions) {
  return sonnerToast(title, options);
}

// Add convenience methods that match Sonner's API
toast.success = (title: string, options?: ToastOptions) => 
  sonnerToast.success(title, options);
toast.error = (title: string, options?: ToastOptions) => 
  sonnerToast.error(title, options);
toast.info = (title: string, options?: ToastOptions) => 
  sonnerToast.info(title, options);
toast.warning = (title: string, options?: ToastOptions) => 
  sonnerToast.warning(title, options);
toast.loading = (title: string, options?: ToastOptions) => 
  sonnerToast.loading(title, options);

// Simple hook to provide the toast function
export function useToast() {
  return {
    toast
  };
}
