import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(80, "name"),
  email: z.string().trim().email("email").max(160, "email"),
  message: z.string().trim().min(10, "message").max(5000, "message"),
})

export type ContactPayload = z.infer<typeof contactSchema>
