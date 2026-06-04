import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      businessName,
      industry,
      phone,
      email,
      services,
      hours,
      timezone,
      missedCallAction,
      urgentAction,
      bookingEnabled,
      receptionistName,
      tone,
      language,
    } = body;

    const systemPrompt = `You are ${receptionistName || "Alex"}, an AI receptionist for ${businessName}, a ${industry} business.

Your personality is ${tone}. Always be helpful, professional, and represent the business well.

ABOUT THIS BUSINESS:
${services}

BUSINESS HOURS:
${hours} (${timezone})

WHEN A CALLER WANTS A QUOTE OR CALLBACK:
${missedCallAction}

FOR URGENT OR EMERGENCY CALLS:
${urgentAction}

${bookingEnabled ? "You can help callers book appointments. Ask for their preferred date and time." : "You cannot book appointments directly. Take a message and let them know someone will follow up."}

IMPORTANT RULES:
- Always greet callers warmly with "Thank you for calling ${businessName}, this is ${receptionistName || "Alex"}. How can I help you today?"
- Collect caller name and phone number for every call
- Be concise — callers are busy
- If you don't know something, say you'll have someone follow up
- Never make up information about the business
- Always end calls by confirming next steps`;

    const vapiResponse = await fetch("https://api.vapi.ai/assistant", {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: process.env.VAPI_ASSISTANT_ID,
        model: {
          provider: "anthropic",
          model: "claude-haiku-4-5",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
          ],
        },
        name: `${businessName} Receptionist`,
        firstMessage: `Thank you for calling ${businessName}, this is ${receptionistName || "Alex"}. How can I help you today?`,
        language: language || "en",
      }),
    });

    if (!vapiResponse.ok) {
      const error = await vapiResponse.text();
      console.error("Vapi error:", error);
      return NextResponse.json({ error: "Failed to configure agent" }, { status: 500 });
    }

    const agent = await vapiResponse.json();

    return NextResponse.json({
      success: true,
      agentId: agent.id,
      message: `${businessName}'s receptionist is configured!`,
    });

  } catch (error) {
    console.error("Onboard error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}