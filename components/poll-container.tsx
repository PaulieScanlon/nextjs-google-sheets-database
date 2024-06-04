'use client';

import TheNewStackLogo from './the-new-stack-logo';

export default function PollContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className='border border-zinc-800 rounded-lg px-4 py-6 sm:p-8 max-w-3xl mx-auto'>
      <div className='grid gap-4'>
        <TheNewStackLogo />
        <p className='m-0 text-zinc-200 text-sm sm:text-lg '>
          What type of content are you most interested in? <b>Vote below!</b>
        </p>

        <div className='grid gap-4 sm:gap-6'>{children}</div>
      </div>
    </section>
  );
}
