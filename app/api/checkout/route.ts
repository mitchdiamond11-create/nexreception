import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS = {
  starter: {
    name: "NexReception Starter",
    amount: 19700,
    description: "Up to 200 calls/month, 24/7 call answering, lead capture & email alerts",
  },
  professional: {
    name: "NexReception Professional",
    amount: 29700,
    description: "Up to 600 calls/month, appointment booking, CRM integration",
  },
  business: {
    name: "NexReception Business",
    amount: 44700,
    description: "Unlimited calls, full dashboard, priority support",
  },
};

export async function POST(req: NextRequest) {
  try {
    const { plan, email, businessName } = await req.json();
    const planData = PLANS[plan as keyof typeof PLANS] || PLANS.professional;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      ...(email && email.includes("@") ? { customer_email: email } : {}),
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            product_data: {
              name: planData.name,
              description: planData.description,
            },
            unit_amount: planData.amount,
          },
          quantity: 1,
        },
      ],
      success_url: "https://nexreception.vercel.app/onboarding?success=true",
      cancel_url: "https://nexreception.vercel.app/onboarding",
      metadata: { businessName, plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
