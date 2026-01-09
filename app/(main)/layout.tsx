import { logout } from '@/lib/actions/auth';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='min-h-screen bg-background'>
      <nav className='border-b'>
        <div className='flex h-16 items-center px-4 container mx-auto'>
          <Link href='/' className='font-semibold text-lg'>
            Monostich
          </Link>

          <div className='ml-auto flex gap-4'>
            {user ? (
              <>
                <Link href='/create' className='text-sm hover:underline'>
                  Create
                </Link>
                <Link href='/profile' className='text-sm hover:underline'>
                  Profile
                </Link>
                <form action={logout} className='text-sm'>
                  <button className='cursor-pointer hover:underline'>
                    Log Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href='/login' className='text-sm hover:underline'>
                  Log In
                </Link>
                <Link href='/signup' className='text-sm hover:underline'>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className='container mx-auto py-6'>{children}</main>
    </div>
  );
}
