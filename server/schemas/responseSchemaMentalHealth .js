export const responseSchemaMentalHealth = {
    type: "object",
    properties: {
      response: {
        type: "string",
        description: "The generated response from the AI model."
      }
    },
    required: ["response"]
  };
  