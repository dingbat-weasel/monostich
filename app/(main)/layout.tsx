import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-background'>
      <nav className='border-b'>
        <div className='flex h-16 items-center px-4 container mx-auto'>
          <Link href='/' className='font-semibold text-lg'>
            Monostich
          </Link>
          <div className='ml-auto flex gap-4'>
            <Link href='/create' className='text-sm hover:underline'>
              Create
            </Link>
            <Link href='/my-poems' className='text-sm hover:underline'>
              My Poems
            </Link>
            <Link href='/browse' className='text-sm hover:underline'>
              Browse
            </Link>
          </div>
        </div>
      </nav>
      <main className='container mx-auto py-6'>{children}</main>
    </div>
  );
}
