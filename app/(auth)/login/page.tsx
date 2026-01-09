import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2 text-center'>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <p className='text-sm text-muted-foreground'>Sign in to your account</p>
      </div>
      <LoginForm />
    </div>
  );
}
