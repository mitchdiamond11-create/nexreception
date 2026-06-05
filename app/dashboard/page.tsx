"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";

const mockClients = [
  {
    id: 1,
    business: "Smith Plumbing Co.",
    industry: "Plumbing",
    phone: "(631) 555-0101",
    email: "john@smithplumbing.com",
    status: "active",
    calls: 24,
    leads: 8,
    joined: "Jun 1, 2026",
  },
  {
    id: 2,
    business: "Long Island HVAC",
    industry: "HVAC & Heating",
    phone: "(516) 555-0182",
    email: "info@lihvac.com",
    status: "active",
    calls: 41,
    leads: 15,
    joined: "May 28, 2026",
  },
  {
    id: 3,
    business: "Coastal Law Group",
    industry: "Law Firm",
    phone: "(631) 555-0143",
    email: "contact@coastallaw.com",
    status: "pending",
    calls: 0,
    leads: 0,
    joined: "Jun 4, 2026",
  },
];

export default function Dashboard() {
  const { user } = useUser();

  const totalCalls = mockClients.reduce((a, c) => a + c.calls, 0);
  const totalLeads = mockClients.reduce((a, c) => a + c.leads, 0);
  const activeClients = mockClients.filter((c) => c.status === "active").length;

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

        .dash-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 68px;
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
        }

        .dash-logo {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
        }

        .dash-logo span { color: var(--accent); }

        .dash-user {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: var(--text-mid);
        }

        .dash-signout {
          background: transparent;
          border: 1px solid var(--border-bright);
          border-radius: 8px;
          padding: 6px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: var(--text-mid);
          cursor: pointer;
          transition: all 0.2s;
        }

        .dash-signout:hover { border-color: var(--accent); color: var(--accent); }

        .dash-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px;
        }

        .dash-header {
          margin-bottom: 36px;
        }

        .dash-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .dash-sub {
          font-size: 15px;
          color: var(--text-mid);
          font-weight: 300;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 24px;
        }

        .stat-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 10px;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--accent);
        }

        .stat-desc {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .clients-table {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .table-head {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
          padding: 14px 24px;
          border-bottom: 1px solid var(--border);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          font-weight: 500;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border);
          align-items: center;
          transition: background 0.15s;
        }

        .table-row:last-child { border-bottom: none; }
        .table-row:hover { background: var(--bg3); }

        .client-name {
          font-weight: 500;
          font-size: 15px;
          margin-bottom: 2px;
        }

        .client-email {
          font-size: 12px;
          color: var(--text-muted);
        }

        .table-cell {
          font-size: 14px;
          color: var(--text-mid);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-active {
          background: rgba(0,200,150,0.12);
          color: var(--accent);
          border: 1px solid rgba(0,200,150,0.25);
        }

        .status-pending {
          background: rgba(250,168,58,0.12);
          color: #FAA83A;
          border: 1px solid rgba(250,168,58,0.25);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .dash-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }

        .btn-add {
          background: var(--accent);
          color: #000;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s;
        }

        .btn-add:hover { opacity: 0.88; }

        @media (max-width: 768px) {
          .dash-nav { padding: 0 20px; }
          .dash-wrap { padding: 24px 20px; }
          .table-head { display: none; }
          .table-row { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>

      <nav className="dash-nav">
        <a href="/" className="dash-logo">Nex<span>Reception</span></a>
        <div className="dash-user">
          <span>{user?.emailAddresses[0]?.emailAddress}</span>
<<SignOutButton redirectUrl="/">
  <button className="dash-signout">Sign out</button>
</SignOutButton>
        </div>
      </nav>

      <div className="dash-wrap">
        <div className="dash-header">
          <div className="dash-title">Dashboard</div>
          <div className="dash-sub">Welcome back{user?.firstName ? `, ${user.firstName}` : ""}. Here's what's happening.</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Active clients</div>
            <div className="stat-value">{activeClients}</div>
            <div className="stat-desc">Receptionists live</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total calls</div>
            <div className="stat-value">{totalCalls}</div>
            <div className="stat-desc">This month</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Leads captured</div>
            <div className="stat-value">{totalLeads}</div>
            <div className="stat-desc">This month</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Monthly revenue</div>
            <div className="stat-value">${activeClients * 197}</div>
            <div className="stat-desc">Recurring</div>
          </div>
        </div>

        <div className="dash-actions">
          <a href="/onboarding" className="btn-add">+ Add new client</a>
        </div>

        <div className="section-title">Your clients</div>

        <div className="clients-table">
          <div className="table-head">
            <div>Business</div>
            <div>Industry</div>
            <div>Calls</div>
            <div>Leads</div>
            <div>Joined</div>
            <div>Status</div>
          </div>

          {mockClients.map((client) => (
            <div key={client.id} className="table-row">
              <div>
                <div className="client-name">{client.business}</div>
                <div className="client-email">{client.email}</div>
              </div>
              <div className="table-cell">{client.industry}</div>
              <div className="table-cell">{client.calls}</div>
              <div className="table-cell">{client.leads}</div>
              <div className="table-cell">{client.joined}</div>
              <div>
                <span className={`status-badge ${client.status === "active" ? "status-active" : "status-pending"}`}>
                  <span className="status-dot" />
                  {client.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
