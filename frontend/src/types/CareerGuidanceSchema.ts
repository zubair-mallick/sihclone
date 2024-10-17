import { z } from "zod";

export const careerGuidanceSchema = z
  .object({
    relevantExams: z
      .array(
        z
          .object({
            examTitle: z.string().describe("The title of the exam."),
            description: z.string().describe("Description of the exam."),
          })
          .strict()
      )
      .describe("A list of relevant exams for the career guidance."),

    scholarships: z
      .array(
        z
          .object({
            scholarshipTitle: z
              .string()
              .describe("The title of the scholarship."),
            description: z.string().describe("Description of the scholarship."),
          })
          .strict()
      )
      .describe("A list of scholarships related to the career guidance."),

    prerequisites: z
      .array(
        z
          .object({
            prerequisiteTitle: z
              .string()
              .describe("The title of the prerequisite."),
            description: z
              .string()
              .describe("Description of the prerequisite."),
          })
          .strict()
      )
      .describe("A list of prerequisites needed for the career guidance."),

    programs: z
      .array(
        z
          .object({
            programTitle: z.string().describe("The title of the program."),
            description: z.string().describe("Description of the program."),
          })
          .strict()
      )
      .describe("A list of programs related to the career guidance."),
  })
  .strict()
  .describe("The schema for career guidance response.");
