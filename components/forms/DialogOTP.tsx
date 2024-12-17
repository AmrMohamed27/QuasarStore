import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendEmailOTP, verifySecret } from "@/actions/user.actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { DialogProps } from "@/types";

const DialogOTP = ({
  isDialogOpen,
  setIsDialogOpen,
  email,
  isLoading,
  setIsLoading,
  accountId,
}: DialogProps) => {
  // OTP Resend function
  const resendOTP = async () => {
    try {
      await sendEmailOTP(email);
      toast({
        title: "OTP Sent",
        description: `Check your email: ${email}`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // router
  const router = useRouter();
  // OTP Value
  const [otpValue, setOtpValue] = useState<string>("");
  // OTP change handler
  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };
  // toast
  const { toast } = useToast();
  // Handle verify OTP
  const handleVerifyOTP = async (accountId: string, OTP: string) => {
    setIsLoading(true);
    try {
      const sessionId = await verifySecret(accountId, OTP);
      if (sessionId) {
        router.push("/");
      }
    } catch {
      toast({
        title: "Invalid OTP",
        description: "Please try again with a different OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // handle submit otp
  const handleSubmit = async () => {
    if (accountId) {
      await handleVerifyOTP(accountId, otpValue);
    } else {
      toast({
        title: "accountId not found",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        className={`min-w-[720px] flex flex-col gap-8 items-center`}
      >
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle className="font-semibold text-2xl">
            Enter OTP
          </DialogTitle>
          <DialogDescription>
            We&apos;ve sent a code to {email}
          </DialogDescription>
        </DialogHeader>
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={(value) => handleOtpChange(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator className="mx-4" />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button
          className="w-full bg-brand-red-1 rounded-full py-6 text-foreground"
          onClick={async () => {
            await handleSubmit();
          }}
        >
          {isLoading ? <Loader className="animate-spin" /> : "Submit"}
        </Button>
        <span>
          Didn&apos;t get a code?
          <span
            className="ml-2 hover:cursor-pointer text-brand-red-1"
            onClick={async () => await resendOTP()}
          >
            Click to resend
          </span>
        </span>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOTP;
