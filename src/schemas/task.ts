import { z } from "zod";

export const TaskCreate = z.object({
  prompt: z.string().min(1),
  schedule: z.string().min(1),
  isEnabled: z.boolean().optional(),
});

export const TaskUpdate = TaskCreate.extend({
  id: z.string().uuid(),
}).partial();
