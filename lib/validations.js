import { z } from "zod";

export const contactFormSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const quoteFormSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  phone: z.string().optional(),
  service_interest: z.string().min(1, { message: "Please select a service." }),
  budget_range: z.string().optional(),
  message: z.string().optional(),
});

export const subscriberSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  consent: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms." }) }),
});
