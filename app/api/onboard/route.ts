import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName, industry, phone, email, services, hours, timezone,
      missedCallAction, urgentAction, bookingEnabled, receptionistName, tone, language,
    } = body;

    const systemPrompt = `You are ${receptionistName || "Alex"}, an AI receptionist for ${businessName}, a ${industry} business.
Your personality is ${tone}. Always be helpful, professional, and represent the business well.
ABOUT THIS BUSINESS: ${services}
BUSINESS HOURS: ${hours} (${timezone})
WHEN A CALLER WANTS A QUOTE OR CALLBACK: ${missedCallAction}
FOR URGENT OR EMERGENCY CALLS: ${urgentAction}
${bookingEnabled ? "You can help callers book appointments." : "You cannot book appointments directly. Take a message and let them know someone will follow up."}
Always greet callers with: "Thank you for calling ${businessName}, this is ${receptionistName || "Alex"}. How can I help you today?"
Collect caller name and phone number for every call. Never make up information about the business.`;

    // Try Vapi but don't let it block the DB save
    try {
      const vapiResponse = await fetch("https://api.vapi.ai/assistant/" + process.env.VAPI_ASSISTANT_ID, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: {
            provider: "anthropic",
            model: "claude-haiku-4-5",
            messages: [{ role: "system", content: systemPrompt }],
          },
          name: `${businessName} Receptionist`,
          firstMessage: `Thank you for calling ${businessName}, this is ${receptionistName || "Alex"}. How can I help you today?`,
        }),
      });
      if (!vapiResponse.ok) {
        const err = await vapiResponse.text();
        console.error("Vapi error:", err);
      }
    } catch (vapiErr) {
      console.error("Vapi failed:", vapiErr);
    }

    // Always save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from("clients")
      .insert({
        business_name: businessName,
        industry,
        phone,
        email,
        services,
        hours,
        timezone,
        missed_call_action: missedCallAction,
        urgent_action: urgentAction,
        booking_enabled: bookingEnabled,
        receptionist_name: receptionistName,
        tone,
        language,
        status: "active",
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Failed to save client", details: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `${businessName}'s receptionist is configured!` });

  } catch (error) {
    console.error("Onboard error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
