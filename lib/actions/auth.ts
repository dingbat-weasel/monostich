'use server';

import * as z from 'zod';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
} from '@/lib/definitions/auth';

export async function signup(state: SignupFormState, formData: FormData) {
  const supabase = await createClient();

  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: z.flattenError(validatedFields.error),
    };
  }

  const { username, email, password } = validatedFields.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
      // redirect after confirm
      // emailRedirectTo: 'https://...'
    },
  });

  if (error) {
    return {
      error: {
        formErrors: [error.message],
        fieldErrors: {},
      },
    };
  }

  // success
  const redirectTo = formData.get('redirectTo') as string | null;
  redirect(redirectTo || '/');
}

export async function login(state: LoginFormState, formData: FormData) {
  const supabase = await createClient();

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: z.flattenError(validatedFields.error),
    };
  }

  const { email, password } = validatedFields.data;

  console.log('🔍 Login Debug:', {
    email,
    redirectTo: formData.get('redirectTo'),
    allFormData: Object.fromEntries(formData.entries()),
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: {
        formErrors: [error.message],
        fieldErrors: {},
      },
    };
  }

  // success
  const redirectTo = formData.get('redirectTo') as string | null;
  redirect(redirectTo || '/');

  // else?
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
