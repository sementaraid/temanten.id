import z from "zod";

export const getGuestResponseSchema = z.object({
  slug: z.string()
})

export const createInvitationSchema = z.object({
  invitationId: z.string().uuid(),
  author: z
    .string()
    .min(1)
    .max(50),
  message: z
    .string()
    .min(1)
    .max(1000)
})

export const createSessionSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .email('Invalid email format')
    .trim()
    .toLowerCase(),
  password: z
    .string({ error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

export const createGuestResponseSchema = z.object({
  invitationId: z.string().uuid(),
  author: z
    .string()
    .min(1)
    .max(50),
  message: z
    .string()
    .min(1)
    .max(1000)
})

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z
    .string()
    .min(6, 'Password confirmation is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required'),
  whatsapp: z
    .string()
    .min(1, 'WhatsApp number is required'),
  sameNumber: z
    .boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})