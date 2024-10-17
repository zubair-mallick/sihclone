"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  searchQuerySchema,
  searchQueryType,
} from "@/types/CareerSuggestorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { careerGuidanceSchema } from "@/types/CareerGuidanceSchema";
import { getCareerGuide } from "@/app/counseling/actions";

// Card-like format for displaying data
const InfoCard = ({
  name,
  description,
  website,
}: {
  name: string;
  description: string;
  website: string;
}) => (
  <div className="p-4 mb-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={website} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

// Spinner
const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

// Main Component
const CareerGuidance = () => {
  const { isPending, data, mutate } = useMutation({
    mutationFn: async (interests: string) => {
      const result = await getCareerGuide(interests)
      const parsedData = careerGuidanceSchema.parse(result);
      return parsedData;
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: "Internal error",
        description: "Something went wrong! Try again later",
        variant: "destructive",
      });
    },
  });
  const form = useForm<searchQueryType>({
    resolver: zodResolver(searchQuerySchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(values: searchQueryType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    mutate(values.search);
  }

  return (
    <div className="p-6">
      <h1 className="max-w-4xl mb-8 title">Career Guidance</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="text-left max-w-3xl mx-auto">
                <FormLabel>Enter your query</FormLabel>
                <FormControl>
                  <Textarea placeholder="Eg: Web development" {...field} />
                </FormControl>
                {form.formState.errors.search && (
                  <p className=" font-semibold text-sm text-red-500 ">
                    {form.formState.errors.search.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {isPending && <Spinner />}

      {!isPending && data && (
        <div className="grid grid-cols-1 gap-6 px-4 py-4 mt-10 border-2 rounded-lg border-zinc-500">
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Relevant Exams
            </h3>
            {data.relevantExams.map((exam, index) => (
              <InfoCard
                key={index}
                name={exam.examTitle}
                description={exam.description}
                website="#"
              />
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">Scholarships</h3>
            {data.scholarships.map((scholarship, index) => (
              <InfoCard
                key={index}
                name={scholarship.scholarshipTitle}
                description={scholarship.description}
                website="#"
              />
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">Prerequisites</h3>
            {data.prerequisites.map((prerequisite, index) => (
              <InfoCard
                key={index}
                name={prerequisite.prerequisiteTitle}
                description={prerequisite.description}
                website="#"
              />
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-white">Programs</h3>
            {data.programs.map((program, index) => (
              <InfoCard
                key={index}
                name={program.programTitle}
                description={program.description}
                website="#"
              />
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-10">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto text-left"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Career Guidance</AccordionTrigger>
            <AccordionContent>
              <p className="text-white">
                Enter your desired career name to receive detailed information
                about the relevant exams, scholarships, prerequisites, and
                programs. This tool helps you understand the steps needed to
                pursue your career goals effectively.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the Career Guidance Tool?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                This tool assists you in planning your educational journey by
                providing information on relevant exams and opportunities
                tailored to your career aspirations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How Can I Use This Tool?</AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                Simply enter the career you are interested in, and the tool will
                provide you with a comprehensive overview of what you need to
                succeed.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CareerGuidance;
