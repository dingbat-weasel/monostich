'use server';

import * as z from 'zod';
import * as bcrypt from 'bcrypt';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SignupFormSchema, SignupFormState } from '@/lib/definitions/auth';

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

  const saltRounds = 10;
  const hashed_password = await bcrypt.hashSync(password, saltRounds);

  const { data, error } = await supabase.auth.signUp({
    email,
    password: hashed_password,
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
  redirect('/browse');
}
