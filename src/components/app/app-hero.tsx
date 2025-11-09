"use client";

import { cn } from "@/lib/utils";

export default function AppHero({ className }: { className?: string }) {
  return (
    <section className={cn("mb-12 text-center relative z-10", className)}>
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl'></div>
      <h2 className='text-3xl md:text-4xl font-bold mb-2 relative z-10'>
        Blockchain App Deployer
      </h2>
      <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary relative z-10'>
        Deploy Your DApp in Minutes
      </h1>
      <p className='text-gray-300 max-w-2xl mx-auto mb-8 relative z-10'>
        Connect your wallet, and we'll deploy your application using our
        pre-configured Git repository. Launch your DApp on the blockchain with
        just a few clicks.
      </p>
    </section>
  );
}
