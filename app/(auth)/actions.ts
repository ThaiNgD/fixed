"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}

export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
  return { status: "success", user: data?.user || null };
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputss
  const credentials = {
    email: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  console.log(credentials);
  const { error, data: account } =
    await supabase.auth.signInWithPassword(credentials);

  if (error) {
    // redirect("/error");
    return {
      error: error?.message,
      user: null,
    };
  } else if (account?.user?.identities?.length === 0) {
    return {
      error:
        "This email is already registered with another provider. Please use a different email or sign in with the associated provider.",
      user: null,
    };
  }

  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", credentials?.email)
    .limit(1)
    .single();

  console.log(existingUser);

  if (!existingUser) {
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        email: credentials?.email,
        username: account?.user?.user_metadata?.username,
      });

    if (profileError) {
      return {
        error: profileError.message,
        user: null,
      };
    }
  }

  revalidatePath("/", "layout");
  return {
    error: null,
    user: account?.user,
  };
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

export const signInWithGitHub = async () => {
  const origin = (await headers()).get("origin") || "";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    console.error("GitHub sign-in error:", error);
    return;
  } else if (data.url) {
    redirect(data.url);
  }
};
