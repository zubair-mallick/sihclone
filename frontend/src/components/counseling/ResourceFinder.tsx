"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Spinner from "@/app/loader";
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
import { resourceFinderSchema } from "@/types/ResourceFinderSchema";
import { getResources } from "./actions";

// Card-like format for displaying group information
const GroupCard = ({
  groupName,
  description,
  link,
  members,
}: {
  groupName: string;
  description: string;
  link: string;
  members: string;
}) => (
  <div className="p-4 mb-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {groupName}
      </a>
    </h3>
    <p className="mb-2 text-gray-300">{description}</p>
    <p className="text-gray-400">Members: {members}</p>
  </div>
);

// Card-like format for displaying material information
const MaterialCard = ({
  name,
  link,
  details,
  type,
}: {
  name: string;
  details: string;
  link: string;
  type: string;
}) => (
  <div className="p-4 mb-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </h3>
    <p className="mb-2 text-gray-300">{details}</p>
    <p className="text-gray-400">Type: {type}</p>
  </div>
);

const ResourceFinder = () => {
  const { isPending, data, mutate, error } = useMutation({
    mutationFn: async (prompt: string) => {
     const result = await getResources(prompt)
      const parsedData = resourceFinderSchema.parse(result);
      if (!parsedData)
        throw new AxiosError("No resources found for the provided input.");

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
  console.log(error);
  function onSubmit(values: searchQueryType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    mutate(values.search);
  }

  // const handleExamSubmit = async (e) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     if (data.groups.length === 0 && data.materials.length === 0) {
  //       setError("No resources found for the provided input.");
  //     } else {
  //       setResources(data);
  //     }
  // };
  return (
    <div className="p-6">
      <div className="">
        <h2 className="max-w-4xl mb-8 title">Resource Finder</h2>
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
        {data && !isPending && !error && (
          <div className="grid grid-cols-1 gap-6 p-4 mt-10 border-2 rounded-lg border-zinc-500">
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Groups</h3>
              {data.groups.map((group, index) => (
                <GroupCard
                  key={index}
                  groupName={group.name}
                  description={group.description}
                  link={group.link}
                  members={group.members}
                />
              ))}
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Materials</h3>
              {data.materials.map((material, index) => (
                <MaterialCard
                  key={index}
                  name={material.name}
                  link={material.link}
                  details={material.description}
                  type={material.type}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl mx-auto mt-10 text-left"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the Resource Finder?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-200">
              The
              <span className="font-semibold text-white">Resource Finder</span>
              is a valuable tool designed to assist you in locating educational
              resources, discussion groups, and study materials relevant to your
              exams or interests. By providing comprehensive information about
              various resources, this tool helps you find the best options to
              support your learning journey.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Why Use the Resource Finder?</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-400">
              Whether you’re preparing for an upcoming exam or exploring new
              study materials, the
              <span className="font-semibold">Resource Finder</span> offers
              tailored information based on your specific needs. It helps you
              discover <span className="font-semibold">discussion groups</span>,
              <span className="font-semibold">study materials</span>, and other
              resources that can enhance your learning experience.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            How Does It Assist in Finding Resources?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-400">
              The Resource Finder uses a structured approach to present various
              resources and groups related to your exam or field of interest. It
              categorizes information into easily accessible cards, making it
              simpler for you to identify and access the resources you need.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResourceFinder;
