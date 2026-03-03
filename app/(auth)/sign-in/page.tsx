"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Facebook, Github } from "lucide-react";
import { login } from "../actions";

const formSchema = z.object({
  password: z
    .string()
    .min(5, "Bug password must be at least 5 characters.")
    .max(32, "Bug password must be at most 32 characters."),
  username: z
    .string()
    .min(6, "Username must be at least 6 characters.")
    .max(20, "Username must be at most 20 characters."),
});

export default function Page() {
  const form = useForm({
    defaultValues: {
      password: "",
      username: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const formData = new FormData();
      formData.append("username", value.username);
      formData.append("password", value.password);
      const result = await login(formData);

      console.log(result);
    },
  });

  return (
    <Card className="w-full h-fit sm:max-w-lg">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          You can login this by social media or your own account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="bug-report-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="username"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Username / Gmail
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2.5 center">
        <Field className="m-auto" orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.handleSubmit()}
          >
            Log in
          </Button>
          <Button type="button" variant="outline" form="bug-report-form">
            Sign up
          </Button>
        </Field>
        <Field orientation="vertical">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Login by Github <Github />
          </Button>
          <Button type="button" variant="outline" form="bug-report-form">
            Login by Google
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-white hover:text-blue-600"
            type="button"
            variant="outline"
            form="bug-report-form"
          >
            Login by Facebook <Facebook />
          </Button>
          <Button type="button" variant="outline" form="bug-report-form">
            Login by Github
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
