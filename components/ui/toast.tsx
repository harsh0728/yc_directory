"use client"

import { Toaster, toast as sonnerToast } from "sonner";

// Export toast function for usage in components
export const toast = sonnerToast;

// Toaster component — must be rendered globally (e.g. in layout.tsx)
export function Toast() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
    />
  );
}
