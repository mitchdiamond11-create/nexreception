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

    // Pull structured data extracted by Vapi
    const structured =
      message.analysis?.structuredOutputs ||
      message.analysis?.structuredData ||
      {};

    // DEBUG: log keys to find where structured outputs live
    console.log("MESSAGE KEYS:", Object.keys(message));
    console.log("ANALYSIS:", JSON.stringify(message.analysis));
    console.log("STRUCTURED OUTPUTS:", JSON.stringify(message.analysis?.structuredOutputs));
    console.log("CALL ANALYSIS:", JSON.stringify(message.call?.analysis));
    console.log("ARTIFACT:", JSON.stringify(message.artifact ? Object.keys(message.artifact) : null));

    // structuredOutputs can be keyed by output id; flatten to find lead_info
    let lead: any = {};
    if (structured.lead_info) {
      lead = structured.lead_info;
    } else {
      // search nested objects for our fields
      for (const key of Object.keys(structured)) {
        const val = structured[key];
        if (val && typeof val === "object" && (val.caller_name || val.callback_number)) {
          lead = val;
          break;
        }
      }
    }

    const callerName = lead.caller_name || "Unknown";
    const callbackNumber = lead.callback_number || callerPhone;

    // Save call log to Supabase
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

    // Find client by assistant and get their Zapier webhook
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
