"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TreeDiagram from "./TreeDiagram/TreeDiagram";
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
import { searchQuerySchema, searchQueryType } from "@/types/PromptTextareaSchema";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/app/loader";
import { generateTreeData } from "@/app/education/actions";
import { useMutation } from "@tanstack/react-query";

// Define the type for the data
type TreeNode = {
  name: string;
  details?: string;
  links?: string[];
  children?: TreeNode[];
};

const EducationalRoadmapMaker = () => {
  const form = useForm<searchQueryType>({
    resolver: zodResolver(searchQuerySchema),
    defaultValues: {
      search: "",
    },
  });

  const { isPending, data, mutate } = useMutation<TreeNode, unknown, string>({
    mutationFn: async (interests: string) => {
      return await generateTreeData(interests);
    },
    onError: (error: any) => {
      console.error(error);
      toast({
        title: "Internal error",
        description: "Something went wrong! Try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (values: searchQueryType) => {
    mutate(values.search); // Trigger the mutation when submitting the form
  };

  return (
    <div className="p-6">
      <h1 className="max-w-4xl mb-8 title">AI Roadmap Maker</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                  <p className="font-semibold text-sm text-red-500">
                    {form.formState.errors.search.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>

      {isPending && <Spinner />}

      {data && <TreeDiagram data={data} />} {/* Use correct typing for data */}

      {/* FAQ Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto text-left"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the Education Section?</AccordionTrigger>
            <AccordionContent>
              <p className="text-white">
                The <span className="font-semibold text-white">Education Section</span> provides comprehensive guidance to help you navigate your educational journey. Whether you're seeking to explore career paths or refine your academic focus, our tools are designed to support you in making informed decisions.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How Does the Career Suggestor Work?</AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                The <span className="font-semibold">Career Suggestor</span> helps you discover potential career paths tailored to your interests and existing knowledge. Input your details to receive personalized career suggestions that align with your aspirations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What is the Educational Roadmap Maker?</AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                The <span className="font-semibold">Educational Roadmap Maker</span> is a tool to assist you in planning your educational journey. It helps you map out your academic goals and strategies based on your career objectives and interests.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default EducationalRoadmapMaker;
