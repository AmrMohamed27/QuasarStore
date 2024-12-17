"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signupSchema } from "@/lib/schema/signupSchema";
import { useState } from "react";
import { createAccount } from "@/actions/user.actions";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import DialogOTP from "./DialogOTP";

const SignupForm = () => {
  // Loading State & Error Message
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Account Id State
  const [accountId, setAccountId] = useState<string | null>(null);

  // OTP Dialog Open State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      fullName: "",
    },
  });
  // Toast
  const { toast } = useToast();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setIsLoading(true);
    const { email, fullName } = values;
    try {
      const { exists, userId } = await createAccount(fullName, email);
      if (exists) {
        toast({
          title: "Account already exists",
          description: "Please try again with a different email",
          variant: "destructive",
        });
        return;
      }
      setIsDialogOpen(true);
      setAccountId(userId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // form values
  const email = form.watch("email");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  className="px-4 py-8 rounded-xl shadow-drop-1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Email"
                  className="px-4 py-8 rounded-xl shadow-drop-1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-full w-full py-8 bg-brand-red-1 text-lg font-semibold text-white"
        >
          {isLoading ? <Loader className="animate-spin" /> : "Create Account"}
        </Button>
        <DialogOTP
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          email={email}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          accountId={accountId}
        />
      </form>
    </Form>
  );
};

export default SignupForm;
