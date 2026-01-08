import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='flex flex-col gap-4 p-8'>
        <h1 className='text-3xl font-bold'>Navigation Buttons</h1>

        {/* Button styled as a link */}
        <Button asChild>
          <Link href='/create'>Start Creating</Link>
        </Button>

        <Button variant='outline' asChild>
          <Link href='/browse'>Browse Poems</Link>
        </Button>

        <Button variant='secondary' asChild>
          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
