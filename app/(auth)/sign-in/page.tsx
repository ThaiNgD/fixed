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
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { login, signInWithGitHub } from "../actions";

const formSchema = z.object({
  password: z
    .string()
    .min(5, "Bug password must be at least 5 characters.")
    .max(32, "Bug password must be at most 32 characters."),
  username: z
    .string()
    .min(6, "Username must be at least 6 characters.")
    .max(64, "Username must be at most 64 characters."),
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

      if (result.error) {
        alert(result.error);
      }
      if (result.user) {
        window.location.href = "/home";
      }
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleLoginByGithub = () => {
    startTransition(async () => {
      await signInWithGitHub();
    });
  };

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
                      placeholder="Please enter your username or email address"
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
                      placeholder="Please enter your password"
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
        <Field className="m-auto" orientation="vertical">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.handleSubmit()}
          >
            Log in
          </Button>
        </Field>
        <Field orientation="vertical">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleLoginByGithub()}
            disabled={isPending}
          >
            {isPending ? <>Loading...</> : <>Login by Github</>}
          </Button>
        </Field>
        <Field orientation="vertical">
          <Button
            type="button"
            variant="link"
            className="hover:cursor-pointer items-start !py-0 hover:text-[#8d9b6a]"
            onClick={() => redirect("/forgot-password")}
          >
            Forgot password
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
