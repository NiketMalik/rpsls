import type { ReactNode } from "react";

export interface ToastItemProps {
  header?: ReactNode;
  body: ReactNode;
  accent?:
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "danger"
    | "warning";
  show?: boolean;
  autohide?: boolean;
}

declare global {
  interface Window {
    showToast: (item: ToastItemProps) => void;
  }
}
