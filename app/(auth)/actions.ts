"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  } else {
    redirect("/auth/sign-in");
  }
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

export const forgotPassword = async (formData: FormData) => {
  const supabase = await createClient();
  const loginIdentifier = formData.get("username") as string;
  const origin = (await headers()).get("origin") || "";

  if (!loginIdentifier) {
    return { error: "Please provide an email or username." };
  }

  let targetEmail = loginIdentifier;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier);

  if (!isEmail) {
    const { data: profile, error: lookupError } = await supabase
      .from("profiles")
      .select("email")
      .eq("username", loginIdentifier)
      .single();

    if (lookupError || !profile?.email) {
      console.error("User not found via username lookup");
      return { error: "No account found with that username." };
    }

    targetEmail = profile.email;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
    redirectTo: `${origin}/reset-password`,
  });

  console.log(error);

  if (error) {
    console.error("Error sending password reset email:", error);
    return { error: error.message };
  }

  return { error: null };
};

export const resetPassword = async (formData: FormData, code: string) => {
  const supabase = await createClient();
  const password = formData.get("password") as string;

  const { error: CodeError } = await supabase.auth.exchangeCodeForSession(code);
  if (CodeError) {
    console.error("Invalid or expired access token:", CodeError);
    return {
      error:
        "Invalid or expired token. Please try resetting your password again.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });
  if (error) {
    console.error("Error resetting password:", error);
    return {
      error: error.message,
    };
  }
  return {
    error: null,
  };
};
