import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-16 lg:px-32 w-full">
      <div className="flex flex-col gap-16 w-full">
        {/* Heading */}
        <h1 className="font-bold text-6xl">Sign in</h1>
        {/* Form */}
        <LoginForm />
        {/* Footer */}
        <div className="text-center w-full flex items-center justify-center gap-2">
          <p className="text-center">Don&apos;t have an account?</p>
          <span className="text-brand-red-1">
            <Link href="/signup">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
