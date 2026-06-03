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
import { toast } from "sonner";
import { forgotPassword } from "../actions";

const formSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters.")
    .max(64, "Username must be at most 64 characters."),
});

export default function Page() {
  const form = useForm({
    defaultValues: {
      username: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const formData = new FormData();
      formData.append("username", value.username);
      const result = await forgotPassword(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          "Password reset instructions have been sent to your email.",
        );
      }
    },
  });

  return (
    <Card className="w-full h-fit sm:max-w-lg">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your username or email address to reset your password.
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
            Confirm
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
