import React, { Fragment, useEffect, useState } from 'react';
import { animate, stagger } from 'motion';

import TheNewStackLogo from '../components/the-new-stack-logo';

const config = [
  {
    name: 'Frontend Development',
    id: 'frontend_development'
  },
  {
    name: 'Software Development',
    id: 'software_development'
  },
  {
    name: 'Cloud Services',
    id: 'cloud_services'
  },
  {
    name: 'Machine Learning',
    id: 'machine_learning'
  }
];

const Page = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  const handleClick = async (id) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/create-vote?id=${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      setResults(result);
      setIsSubmitting(false);
      setHasVoted(true);
    } catch (error) {
      setIsSubmitting(false);
      setError({
        error: true,
        message: error.message
      });
    }
  };

  useEffect(() => {
    animate(
      '.result-bar',
      { transform: 'translateX(0)' },
      {
        delay: stagger(0.1),
        duration: 0.5,
        easing: 'ease-out'
      }
    );
  }, [hasVoted]);

  return (
    <section className="border border-zinc-800 rounded-lg px-4 py-6 sm:p-8 max-w-3xl mx-auto">
      <div className="grid gap-4">
        <TheNewStackLogo />
        <p className="m-0 text-zinc-200 text-sm sm:text-lg mb-2 sm:mb-4">
          What type of content are you most interested in? <b>Vote below!</b>
        </p>

        <div className="grid gap-4 sm:gap-6 mb-2 sm:mb-4">
          {!hasVoted ? (
            <Fragment>
              {config.map((item, index) => {
                const { name, id } = item;

                return (
                  <button
                    key={index}
                    className="flex justify-center text-zinc-200 font-bold border border-zinc-800 text-xs sm:text-sm rounded-full w-full overflow-hidden transition-colors duration-300 hover:bg-primary/10 hover:border-primary/20 disabled:bg-black disabled:cursor-not-allowed disabled:text-zinc-700"
                    onClick={() => handleClick(id)}
                    disabled={isSubmitting || error}
                  >
                    <span className="p-2 sm:p-3">{name}</span>
                  </button>
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              {results.data.map((result, index) => {
                const { percent, isMax } = result;
                const name = config[index].name;
                return (
                  <div
                    key={index}
                    className={`relative flex items-center justify-between text-zinc-200 text-xs sm:text-sm ${
                      isMax ? 'font-bold' : ''
                    } rounded-lg w-full overflow-hidden`}
                  >
                    <span
                      className={`result-bar absolute top-0 left-0 h-full ${isMax ? 'bg-primary/90' : 'bg-zinc-800'} rounded-lg z-0 -translate-x-full`}
                      style={{
                        width: `${percent}%`
                      }}
                    />
                    <span className="p-2 sm:p-3 z-10">{name}</span>
                    <span className="p-2 sm:p-3 z-10">{`${percent}%`}</span>
                  </div>
                );
              })}
            </Fragment>
          )}
        </div>
        {hasVoted ? <p className="m-0 text-sm text-zinc-400">{`${results.total} votes`}</p> : null}
        {error ? <p className="m-0 text-sm font-bold text-red-500">{error.message}</p> : null}
      </div>
    </section>
  );
};

export default Page;
