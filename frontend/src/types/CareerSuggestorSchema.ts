import { z } from "zod";

export const careerSuggestorSchema = z.object({
  careerRecommendations: z.array(
    z.object({
      careerTitle: z.string(),
      description: z.string(),
      whyRecommended: z.string(),
    })
  ),
});

export type careerSuggestorType = z.infer<typeof careerSuggestorSchema>;

export const searchQuerySchema = z.object({
  search: z.string().min(3),
});

export type searchQueryType = z.infer<typeof searchQuerySchema>;
