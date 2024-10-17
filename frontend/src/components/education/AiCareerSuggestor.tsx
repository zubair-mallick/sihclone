"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/app/loader";
import {
  careerSuggestorSchema,
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
import { getCareerRecommendations } from "./actions";

const SuggestionBox = ({
  careerTitle,
  description,
  whyRecommended,
}: {
  careerTitle: string;
  description: string;
  whyRecommended: string;
}) => (
  <div className="p-4 mb-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400">{careerTitle}</h3>
    <p className="mb-2 text-gray-300">{description}</p>
    <p className="italic text-gray-400">{whyRecommended}</p>
  </div>
);

// Main Component
const CareerSuggestionerAI = () => {
  const { isPending, data, mutate } = useMutation({
    mutationFn: async (interests: string) => {
      const result = await getCareerRecommendations(interests);
      // Assuming the result contains the correct data format, parse and validate it
      const parsedData = careerSuggestorSchema.parse(result);
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
      <h1 className="max-w-4xl mb-8 title">AI Career Suggestion </h1>
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

      {!isPending && data && data.careerRecommendations && (
        <div className="px-4 py-4 mt-10 border-2 rounded-lg border-zinc-500">
          {data.careerRecommendations.map((suggestion, index) => (
            <SuggestionBox key={index} {...suggestion} />
          ))}
        </div>
      )}

      {/* faq */}
      <div className="mt-10">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto text-left "
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the Education Section?</AccordionTrigger>
            <AccordionContent>
              <p className="text-white">
                The
                <span className="font-semibold text-white">
                  Education Section
                </span>
                provides comprehensive guidance to help you navigate your
                educational journey. Whether you&apos;re seeking to explore
                career paths or refine your academic focus, our tools are
                designed to support you in making informed decisions.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              How Does the Career Suggestor Work?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                The <span className="font-semibold">Career Suggestor</span>
                helps you discover potential career paths tailored to your
                interests and existing knowledge. Input your details to receive
                personalized career suggestions that align with your
                aspirations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What is the carrer sugestor ai?</AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                It is a tool to assist you in planning your educational journey.
                It will help you map out your academic goals and strategies
                based on your career objectives and interests.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CareerSuggestionerAI;
