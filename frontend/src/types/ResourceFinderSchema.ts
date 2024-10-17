import { z } from "zod";

export const resourceFinderSchema = z
  .object({
    groups: z
      .array(
        z
          .object({
            name: z.string().describe("Name of the group."),
            description: z.string().describe("Description of the group."),
            members: z.string().describe("Number of members in the group."),
            link: z.string().describe("URL link to the group."),
          })
          .strict()
      )
      .describe("A list of discussion or support groups."),

    materials: z
      .array(
        z
          .object({
            name: z.string().describe("Name of the material."),
            description: z.string().describe("Description of the material."),
            type: z
              .string()
              .describe(
                "Type of the material (e.g., Guide, Practice, Sample Paper)."
              ),
            link: z
              .string()
              .describe(
                "URL link to the material; ensure this is accurate, if no accurate link, return an empty string."
              ),
          })
          .strict()
      )
      .describe("A list of materials related to the exams."),
  })
  .strict()
  .describe("Schema for the response containing groups and materials.");
