export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID;

export const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value, ...rest }) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

// Specificcrm events
export const trackLeadGenerated = (params) => {
  event({
    action: 'generate_lead',
    ...params
  });
};

export const trackSignUp = (params) => {
  event({
    action: 'sign_up',
    ...params
  });
};

export const trackContact = (params) => {
  event({
    action: 'contact',
    ...params
  });
};

export const trackQuoteRequest = (params) => {
  event({
    action: 'quote_request',
    ...params
  });
};
