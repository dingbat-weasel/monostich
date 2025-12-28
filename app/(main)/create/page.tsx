import { createClient } from '@/lib/supabase/server';

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
      <p className='text-muted-foreground'>
        Database connection successful. Found {words?.length} words:
      </p>
      <div className='flex flex-wrap gap-2'>
        {words?.map((word) => (
          <div
            key={word.id}
            className='px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm'
          >
            {word.text}
          </div>
        ))}
      </div>
      <p className='text-xs text-muted-foreground'>test</p>
    </div>
  );
}
