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
    .max(1000),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  templateId: z.string().min(1, 'Please select a template'),
  bride: z.object({
    fullName: z.string().min(2, 'Bride full name is required'),
    nickname: z.string().optional(),
    birthOrder: z.string().optional(),
    father: z.string().optional(),
    mother: z.string().optional(),
    instagram: z.string().optional(),
  }),
  groom: z.object({
    fullName: z.string().min(2, 'Groom full name is required'),
    nickname: z.string().optional(),
    birthOrder: z.string().optional(),
    father: z.string().optional(),
    mother: z.string().optional(),
    instagram: z.string().optional(),
  }),
  ceremony: z.object({
    name: z.string().default('Akad Nikah'),
    date: z.string().min(1, 'Ceremony date is required'),
    time: z.string().min(1, 'Ceremony time is required'),
    locationName: z.string().optional(),
    address: z.string().optional(),
    mapsUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  }),
  reception: z.object({
    name: z.string().default('Resepsi'),
    date: z.string().min(1, 'Reception date is required'),
    time: z.string().min(1, 'Reception time is required'),
    locationName: z.string().optional(),
    address: z.string().optional(),
    mapsUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  }),
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