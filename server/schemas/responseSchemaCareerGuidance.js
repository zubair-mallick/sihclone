export const responseSchemaCareerGuidance = {
    type: "object",
    properties: {
      relevantExams: {
        type: "array",
        description: "A list of relevant exams for the career guidance.",
        items: {
          type: "object",
          properties: {
            examTitle: {
              type: "string",
              description: "The title of the exam."
            },
            description: {
              type: "string",
              description: "Description of the exam."
            }
          },
          required: ["examTitle", "description"]
        }
      },
      scholarships: {
        type: "array",
        description: "A list of scholarships related to the career guidance.",
        items: {
          type: "object",
          properties: {
            scholarshipTitle: {
              type: "string",
              description: "The title of the scholarship."
            },
            description: {
              type: "string",
              description: "Description of the scholarship."
            }
          },
          required: ["scholarshipTitle", "description"]
        }
      },
      prerequisites: {
        type: "array",
        description: "A list of prerequisites needed for the career guidance.",
        items: {
          type: "object",
          properties: {
            prerequisiteTitle: {
              type: "string",
              description: "The title of the prerequisite."
            },
            description: {
              type: "string",
              description: "Description of the prerequisite."
            }
          },
          required: ["prerequisiteTitle", "description"]
        }
      },
      programs: {
        type: "array",
        description: "A list of programs related to the career guidance.",
        items: {
          type: "object",
          properties: {
            programTitle: {
              type: "string",
              description: "The title of the program."
            },
            description: {
              type: "string",
              description: "Description of the program."
            }
          },
          required: ["programTitle", "description"]
        }
      }
    },
    required: ["relevantExams", "scholarships", "prerequisites", "programs"]
  };
  