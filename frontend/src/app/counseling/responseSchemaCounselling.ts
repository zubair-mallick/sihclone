export const responseSchemaCounselling: any = {
    type: "object" as any,
    properties: {
      relevantExams: {
        type: "array" as any,
        description: "A list of relevant exams for the career guidance." as any,
        items: {
          type: "object" as any,
          properties: {
            examTitle: {
              type: "string" as any,
              description: "The title of the exam." as any,
            },
            description: {
              type: "string" as any,
              description: "Description of the exam." as any,
            },
          },
          required: ["examTitle", "description"] as any,
        },
      },
      scholarships: {
        type: "array" as any,
        description: "A list of scholarships related to the career guidance." as any,
        items: {
          type: "object" as any,
          properties: {
            scholarshipTitle: {
              type: "string" as any,
              description: "The title of the scholarship." as any,
            },
            description: {
              type: "string" as any,
              description: "Description of the scholarship." as any,
            },
          },
          required: ["scholarshipTitle", "description"] as any,
        },
      },
      prerequisites: {
        type: "array" as any,
        description: "A list of prerequisites needed for the career guidance." as any,
        items: {
          type: "object" as any,
          properties: {
            prerequisiteTitle: {
              type: "string" as any,
              description: "The title of the prerequisite." as any,
            },
            description: {
              type: "string" as any,
              description: "Description of the prerequisite." as any,
            },
          },
          required: ["prerequisiteTitle", "description"] as any,
        },
      },
      programs: {
        type: "array" as any,
        description: "A list of programs related to the career guidance." as any,
        items: {
          type: "object" as any,
          properties: {
            programTitle: {
              type: "string" as any,
              description: "The title of the program." as any,
            },
            description: {
              type: "string" as any,
              description: "Description of the program." as any,
            },
          },
          required: ["programTitle", "description"] as any,
        },
      },
    },
    required: ["relevantExams", "scholarships", "prerequisites", "programs"] as any,
  };
  