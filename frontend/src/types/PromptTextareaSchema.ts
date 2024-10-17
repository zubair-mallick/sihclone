import { z } from "zod";

export const searchQuerySchema = z.object({
  search: z.string(),
});

export type searchQueryType = z.infer<typeof searchQuerySchema>;
