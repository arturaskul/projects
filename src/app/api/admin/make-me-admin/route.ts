import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

async function getUserFromCookiesOrBearer(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return user;

  const authHeader = req.headers.get("authorization") ?? "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1];
  if (!token) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  const supabaseTokenClient = createSupabaseClient<Database>(url, anon, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const {
    data: { user: tokenUser },
  } = await supabaseTokenClient.auth.getUser();

  return tokenUser ?? null;
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const user = await getUserFromCookiesOrBearer(req);

  if (!user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const token = body?.token;

  const expected = process.env.ADMIN_BOOTSTRAP_TOKEN;

  if (expected) {
    if (typeof token !== "string" || token !== expected) {
      return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }
  } else {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: "ADMIN_BOOTSTRAP_TOKEN is required in production" },
        { status: 403 }
      );
    }

    const { data: existingAdmin, error: adminCheckError } = await supabase
      .from("profiles")
      .select("id")
      .eq("is_admin", true)
      .limit(1);

    if (adminCheckError) {
      return NextResponse.json({ ok: false, error: adminCheckError.message }, { status: 500 });
    }

    if (existingAdmin && existingAdmin.length > 0) {
      return NextResponse.json({ ok: false, error: "Admin already exists" }, { status: 403 });
    }
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? null,
      is_admin: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
