'use server';

import { redirect } from 'next/navigation';

export async function ServerAction(id: string) {
  if (!id) {
    redirect('/?error=true');
  }

  try {
    // rest of the function
  } catch (error) {
    console.log('error: ', error);
    redirect('/?error=true');
  }

  redirect('/?submit=true');
}
