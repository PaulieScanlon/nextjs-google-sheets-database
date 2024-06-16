'use client';
import { useState } from 'react';
import config from '../utils/poll-config';

import submitVote from './submit-vote';

export default function Page({ searchParams }) {
  const { error } = searchParams;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = (id: string) => {
    submitVote(id);
    setIsSubmitting(true);
  };

  return (
    <>
      <h1>Vote</h1>
      <ul>
        {config.map((item, index) => {
          const { name, id } = item;

          return (
            <li key={index}>
              <button onClick={() => handleClick(id)} disabled={isSubmitting}>
                <span>{name}</span>
              </button>
            </li>
          );
        })}

        {error ? <p>Server error</p> : null}
      </ul>
    </>
  );
}
