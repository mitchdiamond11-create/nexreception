export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

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

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 68px;
          background: rgba(8,12,16,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }

        .logo {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
          letter-spacing: -0.02em;
        }

        .logo span { color: var(--accent); }

        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }

        .nav-links a {
          color: var(--text-mid);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: var(--text); }

        .nav-cta {
          background: var(--accent);
          color: #000 !important;
          padding: 9px 20px;
          border-radius: 8px;
          font-weight: 500 !important;
          font-size: 14px;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .nav-cta:hover { opacity: 0.88; }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(0,200,150,0.13) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent);
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-dim);
          border: 1px solid rgba(0,200,150,0.3);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 13px;
          color: var(--accent);
          font-weight: 500;
          margin-bottom: 28px;
          position: relative;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 6vw, 80px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          max-width: 820px;
          margin-bottom: 24px;
          position: relative;
        }

        h1 em {
          font-style: normal;
          color: var(--accent);
        }

        .hero-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: var(--text-mid);
          max-width: 540px;
          line-height: 1.6;
          font-weight: 300;
          margin-bottom: 44px;
          position: relative;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
        }

        .btn-primary {
          background: var(--accent);
          color: #000;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 14px 30px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.15s;
        }

        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-ghost {
          color: var(--text-mid);
          font-size: 15px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .btn-ghost:hover { color: var(--text); }

        .hero-note {
          margin-top: 20px;
          font-size: 13px;
          color: var(--text-muted);
          position: relative;
        }

        .call-card {
          background: var(--bg2);
          border: 1px solid var(--border-bright);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 360px;
          margin: 48px auto 0;
        }

        .call-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 1px solid rgba(0,200,150,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .call-name {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
        }

        .call-status {
          font-size: 13px;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }

        .call-wave {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 20px;
        }

        .call-wave span {
          display: block;
          width: 3px;
          background: var(--accent);
          border-radius: 2px;
          animation: wave 1.2s ease-in-out infinite;
        }

        .call-wave span:nth-child(1) { animation-delay: 0s; height: 8px; }
        .call-wave span:nth-child(2) { animation-delay: 0.15s; height: 14px; }
        .call-wave span:nth-child(3) { animation-delay: 0.3s; height: 20px; }
        .call-wave span:nth-child(4) { animation-delay: 0.45s; height: 14px; }
        .call-wave span:nth-child(5) { animation-delay: 0.6s; height: 8px; }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }

        .stat-row {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--accent);
          text-align: center;
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 2px;
          text-align: center;
        }

        .logos-section {
          padding: 40px 48px;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          text-align: center;
        }

        .logos-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 24px;
          font-weight: 500;
        }

        .logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
          opacity: 0.45;
        }

        .logo-item {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
        }

        section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 48px;
        }

        .section-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 16px;
        }

        h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
        }

        .section-sub {
          font-size: 18px;
          color: var(--text-mid);
          font-weight: 300;
          max-width: 520px;
          line-height: 1.6;
          margin-bottom: 60px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
        }

        .step {
          background: var(--bg2);
          padding: 36px 32px;
        }

        .step-num {
          font-family: 'Syne', sans-serif;
          font-size: 48px;
          font-weight: 800;
          color: rgba(255,255,255,0.04);
          line-height: 1;
          margin-bottom: 20px;
        }

        .step-icon {
          width: 40px;
          height: 40px;
          background: var(--accent-dim);
          border: 1px solid rgba(0,200,150,0.25);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .step h3 {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .step p {
          font-size: 14px;
          color: var(--text-mid);
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
        }

        .feature-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 32px;
          transition: border-color 0.25s, background 0.25s;
        }

        .feature-card:hover {
          border-color: var(--border-bright);
          background: var(--bg3);
        }

        .feature-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 20px;
          background: var(--accent-dim);
          border: 1px solid rgba(0,200,150,0.2);
        }

        .feature-card h3 {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .feature-card p {
          font-size: 14px;
          color: var(--text-mid);
          line-height: 1.65;
        }

        .industries-section {
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .industries-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 48px;
        }

        .industry-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 40px;
        }

        .tag {
          background: var(--bg3);
          border: 1px solid var(--border-bright);
          border-radius: 100px;
          padding: 10px 20px;
          font-size: 14px;
          color: var(--text-mid);
          transition: all 0.2s;
        }

        .tag:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-dim);
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          align-items: start;
        }

        .plan {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 36px 32px;
          position: relative;
        }

        .plan.featured {
          border-color: var(--accent);
          background: linear-gradient(160deg, rgba(0,200,150,0.07) 0%, var(--bg2) 60%);
        }

        .plan-badge {
          position: absolute;
          top: -13px;
          left: 32px;
          background: var(--accent);
          color: #000;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .plan-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-mid);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .plan-price {
          font-family: 'Syne', sans-serif;
          font-size: 48px;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 6px;
        }

        .plan-price span {
          font-size: 20px;
          font-weight: 400;
          color: var(--text-muted);
          vertical-align: top;
          margin-top: 10px;
          display: inline-block;
        }

        .plan-period {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 28px;
        }

        .plan-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 24px;
        }

        .plan ul {
          list-style: none;
          margin-bottom: 32px;
        }

        .plan ul li {
          font-size: 14px;
          color: var(--text-mid);
          padding: 7px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .plan ul li::before {
          content: '✓';
          color: var(--accent);
          font-weight: 700;
          flex-shrink: 0;
        }

        .btn-plan {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: block;
          text-align: center;
          transition: all 0.2s;
          border: 1px solid var(--border-bright);
          background: transparent;
          color: var(--text);
        }

        .btn-plan:hover { border-color: var(--accent); color: var(--accent); }

        .btn-plan.primary {
          background: var(--accent);
          color: #000;
          border-color: transparent;
        }

        .btn-plan.primary:hover { opacity: 0.88; color: #000; }

        .cta-strip {
          background: var(--bg2);
          border-top: 1px solid var(--border);
        }

        .cta-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        footer {
          border-top: 1px solid var(--border);
          padding: 36px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        footer p { font-size: 13px; color: var(--text-muted); }

        .footer-links { display: flex; gap: 24px; }

        .footer-links a {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links a:hover { color: var(--text); }

        @media (max-width: 768px) {
          nav { padding: 0 20px; }
          .nav-links { display: none; }
          section { padding: 72px 24px; }
          .cta-inner { padding: 72px 24px; flex-direction: column; text-align: center; }
          footer { padding: 28px 24px; flex-direction: column; text-align: center; }
          .logos-section { padding: 32px 24px; }
          .industries-inner { padding: 72px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <a href="#" className="logo">Nex<span>Reception</span></a>
        <ul className="nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="/onboarding" className="nav-cta">Get started</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />

        <div className="hero-badge">
          <div className="badge-dot" />
          AI-powered voice receptionist
        </div>

        <h1>Never Miss a Call.<br /><em>Never Lose a Lead.</em></h1>

        <p className="hero-sub">
          NexReception answers every call for your business — 24/7 — books appointments, captures leads, and only escalates when you truly need to step in.
        </p>

        <div className="hero-actions">
          <a href="/onboarding" className="btn-primary">
            Set up your receptionist →
          </a>
          <a href="#how" className="btn-ghost">
            See how it works ↓
          </a>
        </div>

        <p className="hero-note">No contracts · 14-day free trial · Setup in under 30 minutes</p>

        <div className="call-card">
          <div className="call-avatar">📞</div>
          <div>
            <div className="call-name">NexReception is live</div>
            <div className="call-status">
              <div className="call-wave">
                <span /><span /><span /><span /><span />
              </div>
              Answering now...
            </div>
          </div>
        </div>

        <div className="stat-row">
          <div>
            <div className="stat-num">24/7</div>
            <div className="stat-label">Always answering</div>
          </div>
          <div>
            <div className="stat-num">&lt;2s</div>
            <div className="stat-label">Answer time</div>
          </div>
          <div>
            <div className="stat-num">100%</div>
            <div className="stat-label">Calls handled</div>
          </div>
        </div>
      </div>

      {/* LOGOS */}
      <div className="logos-section">
        <p className="logos-label">Trusted by local businesses across industries</p>
        <div className="logo-row">
          {['HVAC Pros','LawFirst','DentalPlus','RoofCo','MedSpa Studio','PlumbRight'].map(n => (
            <div key={n} className="logo-item">{n}</div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="section-label">How it works</div>
        <h2>Up and running<br />in 30 minutes</h2>
        <p className="section-sub">Fill in a short form about your business. We handle the rest.</p>
        <div className="steps">
          {[
            { num:'01', icon:'📋', title:'Tell us about your business', desc:'Answer a few simple questions — your services, hours, and how you want calls handled. Takes about 5 minutes.' },
            { num:'02', icon:'🤖', title:'Your AI is configured', desc:'We automatically build your receptionist using your info. It knows your business, your tone, and your services.' },
            { num:'03', icon:'📞', title:'Your number goes live', desc:'You get a dedicated phone number. Forward your existing number to it, or use it as your main business line.' },
            { num:'04', icon:'🎯', title:'Leads hit your inbox', desc:'Every call is logged. Appointments are booked. Urgent calls get escalated. You never miss a thing.' },
          ].map(s => (
            <div key={s.num} className="step">
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{paddingTop:0}}>
        <div className="section-label">Features</div>
        <h2>Everything your front<br />desk should do</h2>
        <p className="section-sub">NexReception handles the calls so you can focus on the work.</p>
        <div className="features-grid">
          {[
            { icon:'🌙', title:'24/7 call answering', desc:'Your AI receptionist never sleeps, never takes lunch, and never puts a caller on hold. Every call answered, every time.' },
            { icon:'📅', title:'Appointment booking', desc:'Callers can book directly during the call. NexReception checks your availability in real time and confirms instantly.' },
            { icon:'🎯', title:'Lead capture', desc:'Name, number, need — every caller\'s info is captured and sent to your inbox or CRM automatically after the call.' },
            { icon:'🔁', title:'Smart escalation', desc:'When a call needs a real human, NexReception detects it and texts or emails you immediately so you can call back fast.' },
            { icon:'🗣️', title:'Sounds like your business', desc:'Your receptionist uses your business name, knows your services, and speaks in the tone you choose.' },
            { icon:'📊', title:'Call logs & summaries', desc:'See every call, what was discussed, and what action was taken — all in a simple dashboard updated in real time.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <div className="industries-section">
        <div className="industries-inner">
          <div className="section-label">Who it&apos;s for</div>
          <h2>Built for local businesses<br />that run on phone calls</h2>
          <p className="section-sub" style={{marginBottom:0}}>If your business gets inbound calls, NexReception pays for itself.</p>
          <div className="industry-tags">
            {['HVAC & Heating','Plumbing','Electrical','Roofing','Law Firms','Dental Offices','Med Spas','Real Estate','Auto Repair','Landscaping','Pest Control','Cleaning Services','Chiropractors','Insurance Agents','Contractors','Salons & Spas'].map(t => (
              <div key={t} className="tag">{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-label">Pricing</div>
        <h2>Simple, flat pricing</h2>
        <p className="section-sub">No per-minute charges. No hidden fees. Cancel any time.</p>
        <div className="pricing-grid">
          <div className="plan">
            <div className="plan-name">Starter</div>
            <div className="plan-price"><span>$</span>97</div>
            <div className="plan-period">per month</div>
            <div className="plan-divider" />
            <ul>
              <li>Up to 200 calls/month</li>
              <li>24/7 call answering</li>
              <li>Lead capture & email alerts</li>
              <li>1 business number</li>
              <li>Basic call summaries</li>
            </ul>
            <a href="/onboarding" className="btn-plan">Get started</a>
          </div>

          <div className="plan featured">
            <div className="plan-badge">Most popular</div>
            <div className="plan-name">Professional</div>
            <div className="plan-price"><span>$</span>197</div>
            <div className="plan-period">per month</div>
            <div className="plan-divider" />
            <ul>
              <li>Up to 600 calls/month</li>
              <li>24/7 call answering</li>
              <li>Appointment booking</li>
              <li>CRM / Airtable integration</li>
              <li>Smart escalation alerts</li>
              <li>Full call dashboard</li>
            </ul>
            <a href="/onboarding" className="btn-plan primary">Get started</a>
          </div>

          <div className="plan">
            <div className="plan-name">Business</div>
            <div className="plan-price"><span>$</span>347</div>
            <div className="plan-period">per month</div>
            <div className="plan-divider" />
            <ul>
              <li>Unlimited calls</li>
              <li>Multiple locations / numbers</li>
              <li>Custom voice & personality</li>
              <li>Priority escalation</li>
              <li>Dedicated onboarding support</li>
              <li>White-glove setup</li>
            </ul>
            <a href="/onboarding" className="btn-plan">Get started</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-strip">
        <div className="cta-inner">
          <div>
            <h2>Ready to stop missing calls?</h2>
            <p style={{color:'var(--text-mid)', fontSize:'17px', fontWeight:300}}>Set up your AI receptionist in 30 minutes. 14-day free trial, no credit card needed.</p>
          </div>
          <a href="/onboarding" className="btn-primary">
            Set up NexReception →
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <a href="#" className="logo" style={{fontSize:'16px'}}>Nex<span>Reception</span></a>
        <p>© 2026 NexReception. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </>
  );
}
