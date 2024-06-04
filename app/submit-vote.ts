'use server';
import { redirect } from 'next/navigation';
import { doc } from '../services/google-spreadsheet';

export default async function submitVote(id: string) {
  if (!id) {
    redirect('/?error=true');
  }

  try {
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    await sheet.loadCells('A1:D2');

    const {
      _worksheet: { _headerValues },
    } = rows[0];

    const cellIndex = _headerValues.findIndex((item) => item == id);
    const cellValue = sheet.getCell(1, cellIndex);
    cellValue.value += 1;

    await sheet.saveUpdatedCells();
  } catch (error) {
    redirect('/?error=true');
  }
  redirect('/results');
}
