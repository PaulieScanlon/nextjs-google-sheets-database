import PollContainer from '../../components/poll-container';
import ResultsBar from '../../components/results-bar';
import config from '../../utils/poll-config';

// import getAllVotes from './get-all-votes';

export default async function Page() {
  // const votes = await getAllVotes();

  return (
    <PollContainer>
      <h1>Results</h1>
      {/* <>
        {votes.results.map((result, index) => {
          const { percent, isMax } = result;
          const name = config[index].name;
          return (
            <div
              key={index}
              className={`relative flex items-center justify-between text-zinc-200 text-xs sm:text-sm ${
                isMax ? 'font-bold' : ''
              } rounded-lg w-full overflow-hidden`}
            >
              <ResultsBar percent={percent} isMax={isMax} />
              <span className='p-2 sm:p-3 z-10'>{name}</span>
              <span className='p-2 sm:p-3 z-10'>{`${percent}%`}</span>
            </div>
          );
        })}
      </>
      <p className='text-sm text-zinc-400 mt-2 mb-0 sm:mt-4'>{`${votes.total} votes`}</p> */}
    </PollContainer>
  );
}
