import { createClient } from '@/lib/supabase/server';
import PoemCreator from '@/app/(main)/create/PoemCreator';

export default async function CreatePage() {
  const supabase = await createClient();
  const tileCount = 30;

  const { data: tiles, error } = await supabase.rpc('get_random_tiles', {
    count: tileCount,
  });

  if (error) {
    return (
      <div className='flex flex-col gap-6'>
        <h1 className='text-3xl font-bold'>Create a Poem</h1>
        <p className='text-red-500'>Error loading tiles: {error.message}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-3xl font-bold'>Create a Poem</h1>

      <PoemCreator tiles={tiles} />
    </div>
  );
}
