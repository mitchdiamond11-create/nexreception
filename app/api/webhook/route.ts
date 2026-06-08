import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const plan = session.metadata?.plan;

    if (email) {
      const { error } = await supabaseAdmin
        .from("clients")
        .update({ status: "paid", plan })
        .eq("email", email);

      if (error) console.error("Supabase update error:", error);
      else console.log("Client marked as paid:", email);
    }
  }

  return NextResponse.json({ received: true });
}
