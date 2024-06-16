'use server';
import { doc } from '../../services/google-spreadsheet';
import config from '../../utils/poll-config';

export default async function getAllVotes() {
  try {
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const allValues = config.map((value) => {
      const { name, id } = value;
      return {
        name: name,
        count: Number(rows[0].get(id)),
      };
    });

    const total = allValues.reduce((values, value) => values + value.count, 0);
    const max = Math.max(...allValues.map((item) => item.count));

    const results = allValues.map((result, index) => {
      const { name, count } = result;
      return {
        value: name,
        count: count,
        percent: Number((count * 100) / total).toFixed(1),
        max: max,
      };
    });

    return {
      total: total,
      results: results,
    };
  } catch (error) {
    console.error(error);
    return {
      total: 0,
      results: [],
    };
  }
}
