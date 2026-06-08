import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName, industry, phone, email, services, hours, timezone,
      missedCallAction, urgentAction, bookingEnabled, receptionistName, tone, language,
    } = body;

    const systemPrompt = `You are ${receptionistName || "Alex"}, an AI receptionist for ${businessName}, a ${industry} business. Your personality is ${tone}. Always be helpful, professional, and represent the business well. ABOUT THIS BUSINESS: ${services}. BUSINESS HOURS: ${hours} (${timezone}). WHEN A CALLER WANTS A QUOTE OR CALLBACK: ${missedCallAction}. FOR URGENT OR EMERGENCY CALLS: ${urgentAction}. Always greet callers with: "Thank you for calling ${businessName}, this is ${receptionistName || "Alex"}. How can I help you today?" Collect caller name and phone number for every call. Never make up information about the business.`;

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

    try {
      // Notify Mitch
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "mitchdiamond11@gmail.com",
        subject: `New NexReception signup: ${businessName}`,
        html: `<h2>New client signed up!</h2><p><strong>Business:</strong> ${businessName}</p><p><strong>Industry:</strong> ${industry}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Receptionist:</strong> ${receptionistName}</p><p><strong>Tone:</strong> ${tone}</p>`,
      });

      // Welcome email to client
      if (email && email.includes("@")) {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: `Welcome to NexReception — Your AI receptionist is being set up`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
              <h1 style="color:#00C896;">Welcome to NexReception!</h1>
              <p>Hi there, thanks for signing up. Your AI receptionist is being configured and will be live within 24 hours.</p>
              <h2>Your dedicated phone number</h2>
              <p style="font-size:24px;font-weight:bold;">(631) 502-8210</p>
              <p>Share this number with your customers. Your AI receptionist will answer every call 24/7.</p>
              <h2>What your receptionist is set up to do</h2>
              <ul>
                <li>Answer calls as <strong>${receptionistName || "Alex"}</strong> for <strong>${businessName}</strong></li>
                <li>Greet callers and collect their name and phone number</li>
                <li>Answer questions about your business hours and services</li>
                <li>Handle urgent calls per your instructions</li>
              </ul>
              <h2>How to test it</h2>
              <p>Call <strong>(631) 502-8210</strong> and your AI receptionist will answer. If anything sounds off, just reply to this email and we'll tune it for you.</p>
              <h2>Need changes?</h2>
              <p>Reply to this email anytime and we'll update your receptionist's script, hours, or personality.</p>
              <br/>
              <p>— The NexReception Team</p>
            </div>
          `,
        });
      }
    } catch (emailErr) {
      console.error("Email error:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Receptionist configured!" });

  } catch (error) {
    console.error("Onboard error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
