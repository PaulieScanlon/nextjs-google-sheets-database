'use client';

import { useState } from 'react';
import submitVote from './submit-vote';
import PollContainer from '../components/poll-container';
import config from '../utils/poll-config';

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { error } = searchParams;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = (id: string) => {
    submitVote(id);
    setIsSubmitting(true);
  };

  return (
    <PollContainer>
      <>
        {config.map((item, index) => {
          const { name, id } = item;

          return (
            <button
              key={index}
              className='flex justify-center text-zinc-200 font-bold border border-zinc-800 text-xs sm:text-sm rounded-full w-full overflow-hidden transition-colors duration-300 hover:bg-primary/10 hover:border-primary/20 disabled:bg-black disabled:cursor-not-allowed disabled:text-zinc-700'
              onClick={() => handleClick(id)}
              disabled={isSubmitting}
            >
              <span className='p-2 sm:p-3'>{name}</span>
            </button>
          );
        })}
      </>

      {error ? <p className='text-sm font-bold text-red-500 mt-2 mb-0 sm:mt-4'>Server error</p> : null}
    </PollContainer>
  );
}
