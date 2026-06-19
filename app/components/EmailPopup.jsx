"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import SubscribeForm from "./SubscribeForm";  // ← import your existing form

const EMAIL_POPUP_KEY = "email_popup_seen";

export default function EmailPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(EMAIL_POPUP_KEY);
    if (!seen) {
      const timer = setTimeout(() => setOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(EMAIL_POPUP_KEY, "true");
    setOpen(false);
  };

  const handleSuccess = () => {
    localStorage.setItem(EMAIL_POPUP_KEY, "true");
    // Optionally show a short thank-you message, then close
    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Join our newsletter
          </DialogTitle>
          <DialogDescription className="text-center">
            Get the latest design insights, tips, and exclusive offers straight to your inbox.
          </DialogDescription>
        </DialogHeader>

        {/* Your existing form, with onSuccess callback */}
        <SubscribeForm onSuccess={handleSuccess} />

        <p className="text-xs text-center text-muted-foreground mt-3">
          No spam, unsubscribe anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
}