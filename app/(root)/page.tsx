"use client";
import { signOut } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been signed out",
    });
  };
  return (
    <div>
      <Button onClick={async () => await handleSignOut()}>Sign Out</Button>
    </div>
  );
}
