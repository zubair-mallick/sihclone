export const responseSchemaCareerRecommendations = {
    type: "object",
    properties: {
      careerRecommendations: {
        type: "array",
        description: "A list of recommended careers based on the provided knowledge and interests.",
        items: {
          type: "object",
          properties: {
            careerTitle: {
              type: "string",
              description: "The title of the recommended career."
            },
            description: {
              type: "string",
              description: "A brief description of the recommended career."
            },
            whyRecommended: {
              type: "string",
              description: "Explanation of why this career is recommended based on the user's input."
            }
          },
          required: ["careerTitle", "description", "whyRecommended"]
        }
      }
    },
    required: ["careerRecommendations"]
  };
  