"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { renameSchema } from "@/lib/schema/renameSchema";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { renameFile } from "@/actions/file.actions";
import { Models } from "node-appwrite";
import { Dispatch, SetStateAction, useState } from "react";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RenameForm = ({
  file,
  setIsOpen,
}: {
  file: Models.Document;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // Get Pathname
  const path = usePathname();
  // Loading state
  const [loading, setLoading] = useState(false);
  // Define Toast
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof renameSchema>>({
    resolver: zodResolver(renameSchema),
    defaultValues: {
      name: file.name,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof renameSchema>) {
    setLoading(true);
    const name = values.name;
    try {
      await renameFile({ file, name, path });
      toast({
        title: "File renamed successfully",
        description: "Your file has been renamed to " + name,
      });
    } catch (error) {
      toast({
        title: "Error renaming file",
        description:
          error?.toString() || "An error occurred while renaming the file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter new file name"
                  {...field}
                  className="rounded-full p-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full rounded-full bg-brand-red-1 px-4 py-2 hover:bg-brand-red-1 text-white"
        >
          {loading ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default RenameForm;
