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

import { signup } from '@/lib/actions/auth';
import { useActionState } from 'react';

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Signing up...' : 'Sign Up'}
    </Button>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div className='w-full max-w-md'>
        <FieldSet>
          <FieldGroup>
            {state?.error?.formErrors && state.error.formErrors.length > 0 && (
              <FieldError>{state.error.formErrors[0]}</FieldError>
            )}
            <Field>
              <FieldLabel htmlFor='username'>Username</FieldLabel>
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='Detective_Raphaël_Ambrosius_Costeau'
                required
              />
              {state?.error?.fieldErrors?.username ? (
                <FieldError>{state.error.fieldErrors.username}</FieldError>
              ) : (
                <FieldDescription>
                  Choose a unique username for your account.
                </FieldDescription>
              )}
            </Field>
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
                <FieldDescription>Enter your email.</FieldDescription>
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
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
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
                Already have an account?{' '}
                <Link href={'/login'} className='text-amber-800'>
                  Login instead.
                </Link>
              </p>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </form>
  );
}
