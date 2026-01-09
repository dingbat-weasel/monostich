'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

import { login } from '@/lib/actions/auth';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Logging in...' : 'Log In'}
    </Button>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get('redirectedFrom');

  return (
    <form action={action}>
      {/* Hidden input to preserve redirect destination */}
      {redirectedFrom && (
        <input type='hidden' name='redirectTo' value={redirectedFrom} />
      )}
      <div className='w-full max-w-md'>
        <FieldSet>
          <FieldGroup>
            {state?.error?.formErrors && state.error.formErrors.length > 0 && (
              <FieldError>{state.error.formErrors[0]}</FieldError>
            )}
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                id='email'
                name='email'
                type='text'
                placeholder='Harry.DuBois@RCM.gov'
                required
              />
              {state?.error?.fieldErrors?.email ? (
                <FieldError>{state.error.fieldErrors.email}</FieldError>
              ) : (
                <FieldDescription></FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              {state?.error?.fieldErrors?.password ? (
                <FieldError>
                  <ul>
                    {state.error.fieldErrors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </FieldError>
              ) : (
                <FieldDescription></FieldDescription>
              )}

              <Input
                id='password'
                name='password'
                type='password'
                placeholder='••••••••'
                required
              />
            </Field>
            <Field>
              <SubmitButton pending={pending} />
            </Field>
            <Field>
              <p className='text-center'>
                Don&apos;t have an account yet?{' '}
                <Link
                  href={
                    redirectedFrom
                      ? `/signup?redirectedFrom=${redirectedFrom}`
                      : '/signup'
                  }
                  className='text-amber-800'
                >
                  Sign up instead.
                </Link>
              </p>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </form>
  );
}
