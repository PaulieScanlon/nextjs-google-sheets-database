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

    rows[0].set(id, Number(rows[0].get(id)) + 1);
    await rows[0].save();
  } catch (error) {
    console.log(error);
    redirect('/?error=true');
  }
  redirect('/results');
}
