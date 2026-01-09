'use server';

import { createClient } from '@/lib/supabase/server';
import PoemCreator from '@/app/(main)/create/PoemCreator';

export default async function CreatePage() {
  const supabase = await createClient();

  const { data: words, error } = await supabase
    .from('words')
    .select('id, text')
    .limit(20);

  if (error) {
    return (
      <div className='flex flex-col gap-6'>
        <h1 className='text-3xl font-bold'>Create a Poem</h1>
        <p className='text-red-500'>Error loading words: {error.message}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-3xl font-bold'>Create a Poem</h1>

      <PoemCreator words={words} />
    </div>
  );
}
