import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (message?.type !== "end-of-call-report") {
      return NextResponse.json({ received: true });
    }

    const call = message.call;
    const transcript = message.transcript || "";
    const summary = message.summary || "";
    const callerPhone = call?.customer?.number || "";
    const assistantId = call?.assistantId || "";

    const artifact = message.artifact || {};
    const structuredData =
      artifact.structuredOutputs ||
      artifact.structuredData ||
      message.analysis?.structuredData ||
      message.analysis?.structuredOutputs ||
      {};

    let lead: any = {};
    for (const key of Object.keys(structuredData)) {
      const entry = structuredData[key];
      if (entry && typeof entry === "object") {
        const fields = entry.result || entry.value || entry;
        if (fields.caller_name || fields.callback_number || fields.budget) {
          lead = fields;
          break;
        }
      }
    }
    if (!lead.caller_name && (structuredData.caller_name || structuredData.budget)) {
      lead = structuredData;
    }

    const callerName = lead.caller_name || "Unknown";
    const callbackNumber = lead.callback_number || callerPhone;

    await supabaseAdmin.from("call_logs").insert({
      assistant_id: assistantId,
      caller_phone: callerPhone,
      caller_name: callerName,
      callback_number: callbackNumber,
      buy_or_sell: lead.buy_or_sell || null,
      budget: lead.budget || null,
      areas: lead.areas || null,
      timeline: lead.timeline || null,
      transcript,
      summary,
      created_at: new Date().toISOString(),
    });

    const { data: client } = await supabaseAdmin
      .from("clients")
      .select("zapier_webhook, business_name, industry")
      .eq("vapi_assistant_id", assistantId)
      .single();

    if (client?.zapier_webhook) {
      await fetch(client.zapier_webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caller_name: callerName,
          callback_number: callbackNumber,
          buy_or_sell: lead.buy_or_sell || "",
          budget: lead.budget || "",
          areas: lead.areas || "",
          timeline: lead.timeline || "",
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
