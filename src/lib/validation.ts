import { z } from 'zod';

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Newsletter schema
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Checkout form schema
export const checkoutSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    postalCode: z.string().min(5, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
  }),
  billingAddress: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    postalCode: z.string().min(5, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
  }),
  paymentMethod: z.enum(['credit_card', 'paypal', 'cash_on_delivery']),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Review form schema (already exists in review store)
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

