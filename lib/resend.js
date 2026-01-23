import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
export const EMAIL_TO = process.env.INTERNAL_NOTIFICATION_EMAIL;

if (!process.env.RESEND_API_KEY) {
  console.warn('Missing RESEND_API_KEY environment variable');
}
