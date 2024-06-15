'use server';

export default async function someAction(id: string) {
  console.log('id: ', id);

  return {
    id: id,
  };
}
