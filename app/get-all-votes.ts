import { doc } from '../services/google-spreadsheet';

export default async function getAllVotes() {
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
