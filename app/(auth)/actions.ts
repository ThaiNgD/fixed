"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputss
  const data = {
    email: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  console.log(data);
  const result = await supabase.auth.signInWithPassword(data);

  console.log(result);

  const { error } = result;

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const credentials = {
    email: formData.get("gmail") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
  };

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  console.log(error, data);

  if (error) {
    // redirect("/error");
    return {
      error: error?.message,
      user: null,
    };
  } else if (data?.user?.identities?.length === 0) {
    return {
      error:
        "This email is already registered with another provider. Please use a different email or sign in with the associated provider.",
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return {
    error: null,
    user: data?.user,
  };
}
