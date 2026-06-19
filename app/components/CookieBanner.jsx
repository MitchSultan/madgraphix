"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no consent choice has been stored
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
    // Optional: activate analytics/tracking scripts here
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
    // Optional: disable tracking scripts
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="p-4 shadow-lg border border-border/60 bg-background">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex-shrink-0">
            <Cookie className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-foreground/80 leading-relaxed">
              We use cookies to improve your experience. By continuing to browse, you agree to our{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-primary">
                Privacy Policy
              </a>.
            </p>
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                variant="default"
                onClick={handleAccept}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDecline}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}