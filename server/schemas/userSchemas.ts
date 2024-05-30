import {z} from 'zod'

export const userRegistrationSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
});