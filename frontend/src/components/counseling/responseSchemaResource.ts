export const responseschema: any = {
    type: "object" as any,
    properties: {
      groups: {
        type: "array" as any,
        description: "A list of discussion or support groups.",
        items: {
          type: "object" as any,
          properties: {
            name: { type: "string" as any, description: "Name of the group." },
            description: { type: "string" as any, description: "Description of the group." },
            members: { type: "string" as any, description: "Number of members in the group." },
            link: { type: "string" as any, description: "URL link to the group." }
          },
          required: ["name", "description", "members", "link"] as any,
        },
      },
      materials: {
        type: "array" as any,
        description: "A list of materials related to the exams.",
        items: {
          type: "object" as any,
          properties: {
            name: { type: "string" as any, description: "Name of the material." },
            description: { type: "string" as any, description: "Description of the material." },
            type: { type: "string" as any, description: "Type of the material (e.g., Guide, Practice, Sample Paper)." },
            link: { type: "string" as any, description: "URL link to the material make sure this is accurate if no accurate link then return empty string" }
          },
          required: ["name", "description", "type", "link"] as any,
        },
      },
    },
    required: ["groups", "materials"] as any,
  };
  