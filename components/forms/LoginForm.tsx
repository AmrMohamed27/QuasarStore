"use client";
import { signinSchema } from "@/lib/schema/signinSchema";
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
import DialogOTP from "./DialogOTP";
import { useState } from "react";
import { signInUser } from "@/actions/user.actions";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

const LoginForm = () => {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    setIsLoading(true);
    const { email } = values;
    try {
      const { accountId: userId, error } = await signInUser(email);
      if (error) {
        toast({
          title: "Error signing in",
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
  // Loading State & Error Message
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Account Id State
  const [accountId, setAccountId] = useState<string | null>(null);

  // OTP Dialog Open State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Email variable
  const email = form.watch("email");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
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
          {isLoading ? <Loader className="animate-spin" /> : "Sign In"}
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

export default LoginForm;
