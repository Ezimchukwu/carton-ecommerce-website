
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "bg-background border border-border shadow-lg rounded-md",
          title: "text-foreground font-semibold",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        }
      }}
    />
  );
}
