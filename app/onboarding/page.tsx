"use client";
import { useState } from "react";

const STEPS = ["Business", "Services", "Calls", "Personality", "Done"];

const industries = [
  "HVAC & Heating","Plumbing","Electrical","Roofing","Law Firm",
  "Dental Office","Med Spa","Real Estate","Auto Repair","Landscaping",
  "Pest Control","Cleaning Service","Chiropractic","Insurance","Contractor",
  "Salon & Spa","Restaurant","Other"
];

const tones = [
  { id: "professional", label: "Professional", desc: "Formal and business-like" },
  { id: "friendly", label: "Friendly", desc: "Warm and conversational" },
  { id: "energetic", label: "Energetic", desc: "Upbeat and enthusiastic" },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    phone: "",
    email: "",
    services: "",
    hours: "",
    timezone: "",
    missedCallAction: "",
    urgentAction: "",
    bookingEnabled: false,
    receptionistName: "",
    tone: "friendly",
    language: "English",
  });

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080C10;
          --bg2: #0E1318;
          --bg3: #141B22;
          --border: rgba(255,255,255,0.07);
          --border-bright: rgba(255,255,255,0.14);
          --accent: #00C896;
          --accent-dim: rgba(0,200,150,0.12);
          --text: #F0F4F8;
          --text-muted: #6B7A8D;
          --text-mid: #9BAABB;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        .ob-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 24px 80px;
        }

        .ob-logo {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
          margin-bottom: 48px;
          align-self: flex-start;
          max-width: 620px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }

        .ob-logo span { color: var(--accent); }

        .ob-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 48px;
          width: 100%;
          max-width: 620px;
        }

        .ob-steps {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 40px;
        }

        .ob-step-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid var(--border-bright);
          color: var(--text-muted);
          background: var(--bg3);
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .ob-step-dot.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #000;
        }

        .ob-step-dot.done {
          background: rgba(0,200,150,0.15);
          border-color: var(--accent);
          color: var(--accent);
        }

        .ob-step-line {
          flex: 1;
          height: 1px;
          background: var(--border);
          transition: background 0.2s;
        }

        .ob-step-line.done { background: var(--accent); opacity: 0.4; }

        .ob-step-title {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .ob-step-sub {
          font-size: 15px;
          color: var(--text-mid);
          margin-bottom: 32px;
          font-weight: 300;
        }

        .ob-field {
          margin-bottom: 20px;
        }

        .ob-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-mid);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .ob-input {
          width: 100%;
          background: var(--bg3);
          border: 1px solid var(--border-bright);
          border-radius: 10px;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s;
        }

        .ob-input:focus { border-color: var(--accent); }
        .ob-input::placeholder { color: var(--text-muted); }

        textarea.ob-input {
          resize: vertical;
          min-height: 100px;
          line-height: 1.6;
        }

        select.ob-input {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7A8D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }

        .ob-industry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 8px;
        }

        .ob-industry-btn {
          background: var(--bg3);
          border: 1px solid var(--border-bright);
          border-radius: 8px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--text-mid);
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
        }

        .ob-industry-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .ob-industry-btn.selected {
          background: var(--accent-dim);
          border-color: var(--accent);
          color: var(--accent);
        }

        .ob-tone-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .ob-tone-btn {
          background: var(--bg3);
          border: 1px solid var(--border-bright);
          border-radius: 10px;
          padding: 16px;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
        }

        .ob-tone-btn:hover { border-color: var(--border-bright); }

        .ob-tone-btn.selected {
          background: var(--accent-dim);
          border-color: var(--accent);
        }

        .ob-tone-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 4px;
        }

        .ob-tone-desc {
          font-size: 12px;
          color: var(--text-muted);
        }

        .ob-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg3);
          border: 1px solid var(--border-bright);
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .ob-toggle-label {
          font-size: 15px;
          color: var(--text);
        }

        .ob-toggle-desc {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .toggle {
          position: relative;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }

        .toggle input { opacity: 0; width: 0; height: 0; }

        .toggle-slider {
          position: absolute;
          inset: 0;
          background: var(--border-bright);
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .toggle-slider::before {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          top: 3px;
          left: 3px;
          transition: transform 0.2s;
        }

        .toggle input:checked + .toggle-slider { background: var(--accent); }
        .toggle input:checked + .toggle-slider::before { transform: translateX(20px); }

        .ob-actions {
          display: flex;
          gap: 12px;
          margin-top: 36px;
        }

        .ob-btn-back {
          flex: 1;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid var(--border-bright);
          background: transparent;
          color: var(--text-mid);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ob-btn-back:hover { border-color: var(--border-bright); color: var(--text); }

        .ob-btn-next {
          flex: 2;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: var(--accent);
          color: #000;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .ob-btn-next:hover { opacity: 0.88; }

        .ob-done {
          text-align: center;
          padding: 20px 0;
        }

        .ob-done-icon {
          width: 72px;
          height: 72px;
          background: var(--accent-dim);
          border: 1px solid rgba(0,200,150,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto 24px;
        }

        .ob-done h2 {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .ob-done p {
          font-size: 16px;
          color: var(--text-mid);
          font-weight: 300;
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto 32px;
        }

        .ob-summary {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          text-align: left;
          margin-bottom: 28px;
        }

        .ob-summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
        }

        .ob-summary-row:last-child { border-bottom: none; }
        .ob-summary-key { color: var(--text-muted); }
        .ob-summary-val { color: var(--text); font-weight: 500; }

        .ob-btn-launch {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: var(--accent);
          color: #000;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .ob-btn-launch:hover { opacity: 0.88; }

        @media (max-width: 600px) {
          .ob-card { padding: 28px 20px; }
          .ob-tone-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ob-wrap">
        <a href="/" className="ob-logo">Nex<span>Reception</span></a>

        <div className="ob-card">
          {/* Progress */}
          <div className="ob-steps">
            {STEPS.slice(0, -1).map((s, i) => (
              <>
                <div key={s} className={`ob-step-dot ${i === step ? "active" : i < step ? "done" : ""}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                {i < STEPS.length - 2 && (
                  <div key={`line-${i}`} className={`ob-step-line ${i < step ? "done" : ""}`} />
                )}
              </>
            ))}
          </div>

          {/* STEP 0 — Business */}
          {step === 0 && (
            <>
              <div className="ob-step-title">Tell us about your business</div>
              <div className="ob-step-sub">This is how your AI receptionist will introduce itself.</div>

              <div className="ob-field">
                <label className="ob-label">Business name</label>
                <input className="ob-input" placeholder="e.g. Smith Plumbing Co." value={form.businessName} onChange={e => update("businessName", e.target.value)} />
              </div>

              <div className="ob-field">
                <label className="ob-label">Your email</label>
                <input className="ob-input" type="email" placeholder="you@yourbusiness.com" value={form.email} onChange={e => update("email", e.target.value)} />
              </div>

              <div className="ob-field">
                <label className="ob-label">Your phone number</label>
                <input className="ob-input" placeholder="(555) 000-0000" value={form.phone} onChange={e => update("phone", e.target.value)} />
              </div>

              <div className="ob-field">
                <label className="ob-label">Industry</label>
                <div className="ob-industry-grid">
                  {industries.map(ind => (
                    <button key={ind} className={`ob-industry-btn ${form.industry === ind ? "selected" : ""}`} onClick={() => update("industry", ind)}>
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ob-actions">
                <button className="ob-btn-next" onClick={next}>Continue →</button>
              </div>
            </>
          )}

          {/* STEP 1 — Services */}
          {step === 1 && (
            <>
              <div className="ob-step-title">What do you offer?</div>
              <div className="ob-step-sub">Your receptionist will use this to answer questions about your business.</div>

              <div className="ob-field">
                <label className="ob-label">Your services</label>
                <textarea className="ob-input" placeholder="e.g. We offer emergency plumbing, pipe repairs, drain cleaning, water heater installation and bathroom remodeling." value={form.services} onChange={e => update("services", e.target.value)} />
              </div>

              <div className="ob-field">
                <label className="ob-label">Business hours</label>
                <textarea className="ob-input" style={{minHeight:"80px"}} placeholder="e.g. Monday–Friday 8am–6pm, Saturday 9am–2pm, closed Sunday. 24/7 emergency line available." value={form.hours} onChange={e => update("hours", e.target.value)} />
              </div>

              <div className="ob-field">
                <label className="ob-label">Timezone</label>
                <select className="ob-input" value={form.timezone} onChange={e => update("timezone", e.target.value)}>
                  <option value="">Select timezone</option>
                  <option>Eastern Time (ET)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                  <option>Pacific Time (PT)</option>
                  <option>Alaska Time (AKT)</option>
                  <option>Hawaii Time (HT)</option>
                </select>
              </div>

              <div className="ob-actions">
                <button className="ob-btn-back" onClick={back}>← Back</button>
                <button className="ob-btn-next" onClick={next}>Continue →</button>
              </div>
            </>
          )}

          {/* STEP 2 — Call handling */}
          {step === 2 && (
            <>
              <div className="ob-step-title">How should calls be handled?</div>
              <div className="ob-step-sub">Tell your receptionist what to do in different situations.</div>

              <div className="ob-toggle-row">
                <div>
                  <div className="ob-toggle-label">Enable appointment booking</div>
                  <div className="ob-toggle-desc">AI books appointments during calls</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={form.bookingEnabled} onChange={e => update("bookingEnabled", e.target.checked)} />
                  <span className="toggle-slider" />
                </label>
              </div>

              <div className="ob-field">
                <label className="ob-label">When someone wants a quote or callback</label>
                <textarea className="ob-input" style={{minHeight:"80px"}} placeholder="e.g. Collect their name, phone number, and describe the issue. Tell them someone will call back within 2 hours." value={form.missedCallAction} onChange={e => update("missedCallAction", e.target.value)} />
              </div>

              <div className="ob-field">
                <label className="ob-label">For urgent or emergency calls</label>
                <textarea className="ob-input" style={{minHeight:"80px"}} placeholder="e.g. Ask if it's a true emergency. If yes, text the owner at (555) 000-0000 immediately and let the caller know someone will call back within 15 minutes." value={form.urgentAction} onChange={e => update("urgentAction", e.target.value)} />
              </div>

              <div className="ob-actions">
                <button className="ob-btn-back" onClick={back}>← Back</button>
                <button className="ob-btn-next" onClick={next}>Continue →</button>
              </div>
            </>
          )}

          {/* STEP 3 — Personality */}
          {step === 3 && (
            <>
              <div className="ob-step-title">Give your receptionist a personality</div>
              <div className="ob-step-sub">This is how callers will experience your business.</div>

              <div className="ob-field">
                <label className="ob-label">Receptionist name</label>
                <input className="ob-input" placeholder="e.g. Alex, Sarah, Jordan..." value={form.receptionistName} onChange={e => update("receptionistName", e.target.value)} />
              </div>

              <div className="ob-field">
                <label className="ob-label">Tone</label>
                <div className="ob-tone-grid">
                  {tones.map(t => (
                    <button key={t.id} className={`ob-tone-btn ${form.tone === t.id ? "selected" : ""}`} onClick={() => update("tone", t.id)}>
                      <div className="ob-tone-label">{t.label}</div>
                      <div className="ob-tone-desc">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="ob-field">
                <label className="ob-label">Language</label>
                <select className="ob-input" value={form.language} onChange={e => update("language", e.target.value)}>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>English & Spanish</option>
                  <option>French</option>
                  <option>Mandarin</option>
                </select>
              </div>

              <div className="ob-actions">
                <button className="ob-btn-back" onClick={back}>← Back</button>
                <button className="ob-btn-next" onClick={next}>Launch my receptionist →</button>
              </div>
            </>
          )}

          {/* STEP 4 — Done */}
          {step === 4 && (
            <div className="ob-done">
              <div className="ob-done-icon">🎉</div>
              <h2>You&apos;re all set!</h2>
              <p>Your AI receptionist is being configured. We&apos;ll email you within 24 hours with your dedicated phone number and next steps.</p>

              <div className="ob-summary">
                <div className="ob-summary-row">
                  <span className="ob-summary-key">Business</span>
                  <span className="ob-summary-val">{form.businessName || "—"}</span>
                </div>
                <div className="ob-summary-row">
                  <span className="ob-summary-key">Industry</span>
                  <span className="ob-summary-val">{form.industry || "—"}</span>
                </div>
                <div className="ob-summary-row">
                  <span className="ob-summary-key">Receptionist</span>
                  <span className="ob-summary-val">{form.receptionistName || "—"}</span>
                </div>
                <div className="ob-summary-row">
                  <span className="ob-summary-key">Tone</span>
                  <span className="ob-summary-val" style={{textTransform:"capitalize"}}>{form.tone}</span>
                </div>
                <div className="ob-summary-row">
                  <span className="ob-summary-key">Booking</span>
                  <span className="ob-summary-val">{form.bookingEnabled ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="ob-summary-row">
                  <span className="ob-summary-key">Email</span>
                  <span className="ob-summary-val">{form.email || "—"}</span>
                </div>
              </div>

              <button className="ob-btn-launch" onClick={() => window.location.href = "/"}>
                Back to home
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
