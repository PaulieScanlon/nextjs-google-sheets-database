const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

export default async function handler(req, res) {
  const {
    query: { id }
  } = req;

  try {
    if (!id) {
      throw new Error('Missing id');
    }

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')
    });

    await doc.getInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const raw_data = rows[0]._rawData;
    const header_values = rows[0]._sheet.headerValues;
    const row_value = rows[0][id];

    rows[0][id] = Number(row_value) + 1;
    await rows[0].save();

    const total = raw_data.reduce((values, value) => Number(values) + Number(value), 0);
    const max = Math.max(...raw_data.map((item) => item));

    const results = header_values.map((result, index) => {
      const count = raw_data[index];
      return {
        value: result,
        count: count,
        percent: Number((count * 100) / total).toFixed(1),
        isMax: count >= max
      };
    });

    res.status(200).json({ message: 'A ok!', total: total, data: results });
  } catch (error) {
    res.status(500).json(error);
  }
}
