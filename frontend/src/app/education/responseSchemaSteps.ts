import { ResponseSchema } from "@google/generative-ai";

export const responseSchemaSteps: ResponseSchema = {
  type: "object"  as any, // No need to cast as SchemaType
  properties: {
    name: {
      type: "string" as any, // No need to cast as SchemaType
      description: "The name of the root element or milestone."
    },
    details: {
      type: "string" as any, // No need to cast as SchemaType
      description: "Details or description of the node."
    },
    links: {
      type: "array" as any, // No need to cast as SchemaType
      description: "List of links to learning resources related to this node.",
      items: {
        type: "string" as any, // No need to cast as SchemaType
        description: "URL of the learning resource."
      }
    },
    children: {
      type: "array" as any, // No need to cast as SchemaType
      description: "List of child elements, which can be milestones, tasks, or subtasks.",
      items: {
        type: "object" as any, // No need to cast as SchemaType
        properties: {
          name: {
            type: "string" as any, // No need to cast as SchemaType
            description: "The name of the milestone, task, or subtask."
          },
          details: {
            type: "string" as any, // No need to cast as SchemaType
            description: "Details or description of the task or subtask."
          },
          links: {
            type: "array" as any, // Fixed by adding 'as const'
            description: "List of links to learning resources related to this node.",
            items: {
              type: "string" as any, // No need to cast as SchemaType
              description: "URL of the learning resource."
            }
          },
          children: {
            type: "array" as any, // No need to cast as SchemaType
            description: "List of child elements for tasks and milestones, which can be subtasks or tasks.",
            items: {
              type: "object" as any, // No need to cast as SchemaType
              properties: {
                name: {
                  type: "string" as any, // No need to cast as SchemaType

                  description: "The name of the child element (task or subtask)."
                },
                details: {
                  type: "string" as any, // No need to cast as SchemaType
                  description: "Details or description of the child task or subtask."
                },
                links: {
                  type: "array"  as any, // No need to cast as SchemaType
                  description: "List of links to learning resources related to this node.",
                  items: {
                    type: "string"  as any, // No need to cast as SchemaType
                    description: "URL of the learning resource."
                  }
                }
              },
              required: ["name"]
            }
          }
        },
        required: ["name"] // Ensure child elements have a name
      }
    }
  },
  required: ["name", "children"] // Root elements must have name and children
};
