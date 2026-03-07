"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "@tanstack/react-form";
import { Github } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import { signup } from "../actions";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username must be at most 20 characters."),
    gmail: z
      .string()
      .email("Please enter a valid email.")
      .refine((val) => val.endsWith("@gmail.com"), {
        message: "Only Gmail addresses are allowed.",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Sets the error to the confirmPassword field
  });

export default function Page() {
  const form = useForm({
    defaultValues: {
      username: "",
      gmail: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("username", value.username);
      formData.append("password", value.password);
      formData.append("gmail", value.gmail);
      formData.append("confirmPassword", value.confirmPassword);
      console.log(Object.fromEntries(formData));
      const result = await signup(formData);

      if (result.error) {
        toast(result.error, { position: "top-right" });
      } else {
        toast(
          "Signup successful! Please check your email to confirm your account.",
          { position: "top-right" },
        );
      }
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
                const errors = field.state.meta.errors;
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <TooltipProvider>
                      <Tooltip open={!!field.state.meta.errors.length}>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="bg-destructive text-wrap text-destructive-foreground font-semibold"
                        >
                          {field.state.meta.errors.map((item, index) => (
                            <p key={index} className="m-0">
                              {item?.message}
                            </p>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Field>
                );
              }}
            />
            <form.Field
              name="gmail"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Gmail</FieldLabel>
                    <TooltipProvider>
                      <Tooltip open={!!field.state.meta.errors.length}>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="bg-destructive text-wrap text-destructive-foreground font-semibold"
                        >
                          {field.state.meta.errors.map((item, index) => (
                            <p key={index} className="m-0">
                              {item?.message}
                            </p>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
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
                    <TooltipProvider>
                      <Tooltip open={!!field.state.meta.errors.length}>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="bg-destructive text-wrap text-destructive-foreground font-semibold"
                        >
                          {field.state.meta.errors.map((item, index) => (
                            <p key={index} className="m-0">
                              {item?.message}
                            </p>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Field>
                );
              }}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <TooltipProvider>
                      <Tooltip open={!!field.state.meta.errors.length}>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="bg-destructive text-wrap text-destructive-foreground font-semibold"
                        >
                          {field.state.meta.errors.map((item, index) => (
                            <p key={index} className="m-0">
                              {item?.message}
                            </p>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button
            type="button"
            className=""
            variant="outline"
            onClick={() => form.handleSubmit()}
          >
            Sign up
          </Button>
          <span className="w-full text-center text-primary underline">or</span>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Login by Github <Github />
          </Button>
          <Button type="button" variant="outline" form="bug-report-form">
            Login by Google
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
