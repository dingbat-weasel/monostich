'use client';

export default function PoemCreator({ words }) {
  return (
    <>
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
      <div>
        <div className='min-h-20 bg-slate-300 border flex flex-wrap gap-2 p-4 rounded-lg'>
          Staging
        </div>
        <div className='flex flex-wrap p-4 gap-2 bg-slate-50 min-h-72 rounded-lg'>
          Fridge
        </div>
      </div>
    </>
  );
}
