"use client";
import FileinfoCard from "../common/FileInfoCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { shareSchema } from "@/lib/schema/shareSchema";
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
import { Models } from "node-appwrite";
import { Dispatch, SetStateAction, useState } from "react";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { shareFile } from "@/actions/file.actions";

const ShareForm = ({
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
  const form = useForm<z.infer<typeof shareSchema>>({
    resolver: zodResolver(shareSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof shareSchema>) {
    setLoading(true);
    const email = values.email;
    try {
      await shareFile({ file, email, path });
      toast({
        title: "File shared successfully",
        description: "File shared with user with email: " + email,
      });
    } catch (error) {
      toast({
        title: "Error sharing file",
        description:
          error?.toString() || "An error occurred while sharing the file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <FileinfoCard file={file} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Share file with other users:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
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
            {loading ? <Loader className="animate-spin" /> : "Share Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShareForm;
