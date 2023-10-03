'use client';

import * as React from 'react';
import * as z from "zod";
import { FieldErrors, useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/input"
import { register } from '../auth/authentication';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(50, {
    message: "Username can't be more than 50 characters.",
  }).regex(/^[a-zA-Z0-9.@+\-_]{1,50}$/, {
    message: "Only letters, digits and @/./+/-/_ allowed.",
  }),
  firstName: z.string().max(150, {
    message: "First name can't be more than 150 characters.",
  }),
  lastName: z.string().max(150, {
    message: "Last name can't be more than 150 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  passwordRepeat: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
}).refine(data => data.password === data.passwordRepeat, {
  message: "Password fields do not match.",
  path: ['passwordRepeat']
})

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    register(values).then(result => {
      if(result.success) {
        form.reset();
        router.push('/');
      } else {
        console.log(result.error);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-lg mx-auto">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input placeholder="Username" type='text' {...field} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input placeholder="First name" type='text' {...field} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input placeholder="Last name" type='text' {...field} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input placeholder="example@example.com" type='email' {...field} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input placeholder="Password" type='password' {...field} autoComplete='on' />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordRepeat"
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormControl>
                <Input placeholder="Confirm your password" type='password' {...field} autoComplete='on' />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default RegisterForm;