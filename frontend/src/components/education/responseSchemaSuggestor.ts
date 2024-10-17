import { ResponseSchema } from "@google/generative-ai"; // Assuming the ResponseSchema type comes from this package

export const responseSchemaCareerRecommendations: ResponseSchema = {
  type: "object" as any,
  properties: {
    careerRecommendations: {
      type: "array" as any,
      description: "A list of recommended careers based on the provided knowledge and interests.",
      items: {
        type: "object" as any,
        properties: {
          careerTitle: {
            type: "string" as any,
            description: "The title of the recommended career.",
          },
          description: {
            type: "string" as any,
            description: "A brief description of the recommended career.",
          },
          whyRecommended: {
            type: "string" as any,
            description: "Explanation of why this career is recommended based on the user's input.",
          },
        },
        required: ["careerTitle", "description", "whyRecommended"],
      },
    },
  },
  required: ["careerRecommendations"],
};
