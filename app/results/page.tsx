import PollContainer from '../../components/poll-container';
import { doc } from '../../services/google-spreadsheet';
import config from '../../utils/poll-config';

import ResultsBar from '../../components/results-bar';

async function getAllVotes() {
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  await sheet.loadCells('A1:D2');

  const {
    _rawData,
    _worksheet: { _headerValues },
  } = rows[0];

  const total = _rawData.reduce((values, value) => Number(values) + Number(value), 0);
  const max = Math.max(..._rawData.map((item) => item));

  const results = _headerValues.map((result, index) => {
    const count = _rawData[index];
    return {
      value: result,
      count: count,
      percent: Number((count * 100) / total).toFixed(1),
      isMax: count >= max,
    };
  });

  return {
    total: total,
    results: results,
  };
}

export default async function Page() {
  const votes = await getAllVotes();

  return (
    <PollContainer>
      <>
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
      <p className='text-sm text-zinc-400 mt-2 mb-0 sm:mt-4'>{`${votes.total} votes`}</p>
    </PollContainer>
  );
}
