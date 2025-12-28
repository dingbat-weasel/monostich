export default function SignupPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2 text-center'>
        <h1 className='text-2xl font-semibold'>Create Account</h1>
        <p className='text-sm text-muted-foreground'>
          Sign up to start creating poems
        </p>
      </div>
      {/* Auth form will go here */}
      <p className='text-sm text-muted-foreground'>
        Placeholder - auth coming soon
      </p>
    </div>
  );
}
