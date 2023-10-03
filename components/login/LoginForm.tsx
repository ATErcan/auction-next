'use client';

import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/Form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { login } from "../auth/authentication";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(50, {
    message: "Username can't be more than 50 characters.",
  }).regex(/^[a-zA-Z0-9.@+\-_]{1,50}$/, {
    message: "Only letters, digits and @/./+/-/_ allowed.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
})

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.username, values.password)
    .then((result) => {
      if (result.success) {
        form.reset();
        router.push("/");
      } else {
        console.log(result.error);
      }
    })
    .catch((error) => {
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default LoginForm;