import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    // Only process end-of-call reports
    if (message?.type !== "end-of-call-report") {
      return NextResponse.json({ received: true });
    }

    const call = message.call;
    const transcript = message.transcript || "";
    const summary = message.summary || "";
    const callerPhone = call?.customer?.number || "";
    const assistantId = call?.assistantId || "";

    // Extract caller name from transcript (basic)
    const nameMatch = transcript.match(/(?:my name is|i'm|i am)\s+([A-Z][a-z]+)/i);
    const callerName = nameMatch ? nameMatch[1] : "Unknown";

    // Save call log to Supabase
    await supabaseAdmin.from("call_logs").insert({
      assistant_id: assistantId,
      caller_phone: callerPhone,
      caller_name: callerName,
      transcript,
      summary,
      created_at: new Date().toISOString(),
    });

    // Find the client by assistant and get their Zapier webhook
    const { data: client } = await supabaseAdmin
      .from("clients")
      .select("zapier_webhook, business_name, industry")
      .eq("vapi_assistant_id", assistantId)
      .single();

    // Fire Zapier webhook if configured
    if (client?.zapier_webhook) {
      await fetch(client.zapier_webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caller_name: callerName,
          caller_phone: callerPhone,
          summary,
          transcript,
          business_name: client.business_name,
          industry: client.industry,
          call_time: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Vapi webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
