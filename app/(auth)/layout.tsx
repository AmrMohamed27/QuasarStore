import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex lg:flex-row min-h-screen">
      {/* Left Section */}
      <div className="hidden lg:flex bg-brand-red-1 text-white min-h-screen px-16 py-32 flex-col justify-between max-w-[40%]">
        {/* Logo */}
        <div className="flex flex-row gap-4 items-center">
          <Image
            src="/assets/images/logo-red-white.png"
            alt="QuasarStore Logo"
            width={64}
            height={64}
          />
          <span className="font-medium text-2xl select-none">QuasarStore</span>
        </div>
        {/* Text Block */}
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-4xl leading-[46px]">
            Manage your files the best way
          </h2>
          <p className="">
            Awesome, we&apos;ve created the perfect place for you to store all
            your documents
          </p>
        </div>
        {/* Illustration */}
        <Image
          src="/assets/images/illustration.svg"
          alt="Illustration"
          width={400}
          height={400}
          className="hover:-rotate-2 hover:scale-105 transition-all"
        />
      </div>
      {children}
    </div>
  );
}
