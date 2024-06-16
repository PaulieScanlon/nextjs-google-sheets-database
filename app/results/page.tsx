import Link from 'next/link';

import getAllVotes from './get-all-votes';

export default async function Page() {
  const votes = await getAllVotes();

  return (
    <>
      <Link href='/'>Back</Link>
      <h1>Results</h1>
      <ul>
        {votes.results.map((result, index) => {
          const { value, count, percent, max } = result;

          return (
            <li key={index}>
              <div>
                <span>{value}</span>
                <span>{` ${percent}%`}</span>
              </div>
              <progress value={count} max={max} />
            </li>
          );
        })}
        <p> {`${votes.total} votes`}</p>
      </ul>
    </>
  );
}
