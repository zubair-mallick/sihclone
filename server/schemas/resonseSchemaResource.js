export const responseschema = {
    type: "object",
    properties: {
      groups: {
        type: "array",
        description: "A list of discussion or support groups.",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Name of the group." },
            description: { type: "string", description: "Description of the group." },
            members: { type: "string", description: "Number of members in the group." },
            link: { type: "string", description: "URL link to the group." }
          },
          required: ["name", "description", "members", "link"]
        }
      },
      materials: {
        type: "array",
        description: "A list of materials related to the exams.",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Name of the material." },
            description: { type: "string", description: "Description of the material." },
            type: { type: "string", description: "Type of the material (e.g., Guide, Practice, Sample Paper). " },
            link: { type: "string", description: "URL link to the material make sure this is accurate if no accurate link thrn return empty string" }
          },
          required: ["name", "description", "type", "link"]
        }
      }
    },
    required: ["groups", "materials"]
  }