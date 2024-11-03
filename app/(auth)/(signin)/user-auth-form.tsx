'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getRedirectUrl, setAuthorization } from '@/lib';
import { NEXT_PUBLIC_DEFAULT_USER_EMAIL, NEXT_PUBLIC_DEFAULT_USER_PASSWORD } from '@/lib/env';
import { userLogin } from '@/services/common/auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string(),
});

export default function UserAuthForm() {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: NEXT_PUBLIC_DEFAULT_USER_EMAIL,
    password: NEXT_PUBLIC_DEFAULT_USER_PASSWORD,
  };
  const form = useForm<API.UserLoginRequest>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: API.UserLoginRequest) => {
    startTransition(() => {
      userLogin(data).then((res) => {
        setAuthorization(res.data.data?.token!);
        router.replace(getRedirectUrl());
        router.refresh();
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form className='w-full space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Enter your email...'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Enter your password...'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='ml-auto w-full' disabled={loading} type='submit'>
            登录
          </Button>
        </form>
      </Form>
      {/* <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div> */}
      {/* <GithubSignInButton /> */}
    </>
  );
}
