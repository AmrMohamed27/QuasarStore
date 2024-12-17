import SignupForm from "@/components/forms/SignupForm";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="flex min-h-screen lg:items-center justify-center px-16 lg:px-32 w-full">
      <div className="flex flex-col gap-16 w-full">
        {/* Heading */}
        <h1 className="font-bold text-4xl lg:text-6xl max-lg:text-center">
          Create an account
        </h1>
        {/* Form */}
        <SignupForm />
        {/* Footer */}
        <div className="text-center w-full flex items-center justify-center gap-2">
          <p className="text-center">Already have an account?</p>
          <span className="text-brand-red-1">
            <Link href="/signin">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
