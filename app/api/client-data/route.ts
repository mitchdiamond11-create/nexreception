import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });

  const { data: client, error } = await supabaseAdmin
    .from("clients")
    .select("*")
    .eq("email", email)
    .limit(1)
    .maybeSingle();

  if (error || !client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: callLogs } = client.vapi_assistant_id
    ? await supabaseAdmin
        .from("call_logs")
        .select("*")
        .eq("assistant_id", client.vapi_assistant_id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return NextResponse.json({ client, callLogs: callLogs || [] });
}
