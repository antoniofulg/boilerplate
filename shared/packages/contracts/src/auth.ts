import { z } from 'zod';

/**
 * Request schema for authentication login
 */
export const AuthLoginRequestSchema = z.object({
  emailInstitucional: z
    .string()
    .email()
    .refine(
      (email) => email.toLowerCase().endsWith('@camara.gov.br'),
      'Email must be from institutional domain (@camara.gov.br)'
    )
    .transform((email) => email.toLowerCase()),
  senha: z.string().min(8).trim(),
});

export type AuthLoginRequest = z.infer<typeof AuthLoginRequestSchema>;

/**
 * Session payload returned after successful authentication
 */
export const AuthSessionPayloadSchema = z.object({
  userName: z.string().min(3).max(80),
  role: z.enum(['Presidente', 'Secretário', 'Vereador']),
  chamber: z.string(),
  issuedAt: z.string().datetime(),
});

export type AuthSessionPayload = z.infer<typeof AuthSessionPayloadSchema>;

/**
 * Menu item state for navigation
 */
export const MenuItemStateSchema = z.object({
  label: z.string(),
  route: z.string().regex(/^\/[a-z-]+$/),
  isActive: z.boolean(),
  isDisabled: z.boolean(),
});

export type MenuItemState = z.infer<typeof MenuItemStateSchema>;

