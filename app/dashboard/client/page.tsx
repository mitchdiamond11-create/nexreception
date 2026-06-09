"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Client = {
  id: string;
  business_name: string;
  industry: string;
  phone: string;
  email: string;
  services: string;
  hours: string;
  timezone: string;
  missed_call_action: string;
  urgent_action: string;
  booking_enabled: boolean;
  receptionist_name: string;
  tone: string;
  language: string;
  status: string;
  plan: string;
  areas_served: string;
  lead_qualification: string;
  vapi_assistant_id: string;
  created_at: string;
};

type CallLog = {
  id: string;
  caller_name: string;
  caller_phone: string;
  summary: string;
  transcript: string;
  created_at: string;
};

const TABS = ["Overview", "Call Logs", "My Receptionist"];

export default function ClientDashboard() {
  const { user } = useUser();
  const [client, setClient] = useState<Client | null>(null);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const email = user?.emailAddresses[0]?.emailAddress;
      if (!email) return;

      const res = await fetch(`/api/client-data?email=${encodeURIComponent(email)}`);
      if (!res.ok) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { client, callLogs } = await res.json();
      setClient(client);
      setCallLogs(callLogs);
      setLoading(false);
    }

    if (user) fetchData();
  }, [user]);

  if (loading) return (
    <>
      <style>{baseStyles}</style>
      <div className="loading-screen">Loading your dashboard...</div>
    </>
  );

  if (notFound) return (
    <>
      <style>{baseStyles}</style>
      <div className="loading-screen">No account found for this email. <a href="/onboarding" style={{color:"var(--accent)"}}>Get started here.</a></div>
    </>
  );

  return (
    <>
      <style>{baseStyles}</style>

      <nav className="dash-nav">
        <a href="/" className="dash-logo">Nex<span>Reception</span></a>
        <div className="dash-user">
          <span>{user?.emailAddresses[0]?.emailAddress}</span>
          <SignOutButton redirectUrl="/">
            <button className="dash-signout">Sign out</button>
          </SignOutButton>
        </div>
      </nav>

      <div className="dash-wrap">
        <div className="dash-header">
          <div className="dash-title">{client?.business_name}</div>
          <div className="dash-sub">
            <span className={`status-badge ${client?.status === "active" ? "status-active" : "status-pending"}`}>
              <span className="status-dot" />
              {client?.status === "active" ? "Active" : "Pending Setup"}
            </span>
            {client?.plan && <span className="plan-chip">{client.plan} plan</span>}
          </div>
        </div>

        <div className="tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              type="button"
              className={`tab-btn ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div className="tab-content">
            <div className="info-grid">
              <InfoCard label="Receptionist Name" value={client?.receptionist_name || "—"} />
              <InfoCard label="Phone Number" value="(631) 502-8210" />
              <InfoCard label="Plan" value={client?.plan || "—"} />
              <InfoCard label="Language" value={client?.language || "—"} />
              <InfoCard label="Tone" value={client?.tone || "—"} />
              <InfoCard label="Booking Enabled" value={client?.booking_enabled ? "Yes" : "No"} />
              <InfoCard label="Total Calls" value={String(callLogs.length)} />
              <InfoCard label="Member Since" value={client?.created_at ? new Date(client.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"} />
            </div>
          </div>
        )}

        {activeTab === "Call Logs" && (
          <div className="tab-content">
            {callLogs.length === 0 ? (
              <div className="empty-state">
                <h3>No calls yet</h3>
                <p>Your receptionist hasn&apos;t received any calls yet.</p>
              </div>
            ) : (
              <div className="calls-list">
                {callLogs.map(log => (
                  <div key={log.id} className="call-card">
                    <div className="call-header" onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}>
                      <div className="call-meta">
                        <div className="call-name">{log.caller_name || "Unknown Caller"}</div>
                        <div className="call-phone">{log.caller_phone || "—"}</div>
                      </div>
                      <div className="call-right">
                        <div className="call-date">{new Date(log.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                        <div className="call-expand">{expandedLog === log.id ? "▲" : "▼"}</div>
                      </div>
                    </div>
                    {log.summary && <div className="call-summary">{log.summary}</div>}
                    {expandedLog === log.id && log.transcript && (
                      <div className="call-transcript">
                        <div className="transcript-label">Transcript</div>
                        <div className="transcript-text">{log.transcript}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "My Receptionist" && (
          <div className="tab-content">
            <div className="config-list">
              <ConfigRow label="Business Name" value={client?.business_name} />
              <ConfigRow label="Industry" value={client?.industry} />
              <ConfigRow label="Services" value={client?.services} />
              <ConfigRow label="Hours" value={client?.hours} />
              <ConfigRow label="Timezone" value={client?.timezone} />
              <ConfigRow label="Areas Served" value={client?.areas_served} />
              <ConfigRow label="Missed Call Action" value={client?.missed_call_action} />
              <ConfigRow label="Urgent Call Action" value={client?.urgent_action} />
              <ConfigRow label="Lead Qualification" value={client?.lead_qualification} />
              <ConfigRow label="Booking Enabled" value={client?.booking_enabled ? "Yes" : "No"} />
              <ConfigRow label="Tone" value={client?.tone} />
              <ConfigRow label="Language" value={client?.language} />
              <ConfigRow label="Receptionist Name" value={client?.receptionist_name} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-card">
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  );
}

function ConfigRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="config-row">
      <div className="config-label">{label}</div>
      <div className="config-value">{value}</div>
    </div>
  );
}

const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #080C10; --bg2: #0E1318; --bg3: #141B22;
    --border: rgba(255,255,255,0.07); --border-bright: rgba(255,255,255,0.14);
    --accent: #00C896; --text: #F0F4F8; --text-muted: #6B7A8D; --text-mid: #9BAABB;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; -webkit-font-smoothing: antialiased; }
  .loading-screen { display: flex; align-items: center; justify-content: center; height: 100vh; color: var(--text-muted); font-size: 15px; }
  .dash-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 68px; background: var(--bg2); border-bottom: 1px solid var(--border); }
  .dash-logo { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: var(--text); text-decoration: none; }
  .dash-logo span { color: var(--accent); }
  .dash-user { display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--text-mid); }
  .dash-signout { background: transparent; border: 1px solid var(--border-bright); border-radius: 8px; padding: 6px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--text-mid); cursor: pointer; transition: all 0.2s; }
  .dash-signout:hover { border-color: var(--accent); color: var(--accent); }
  .dash-wrap { max-width: 900px; margin: 0 auto; padding: 48px; }
  .dash-header { margin-bottom: 32px; }
  .dash-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 10px; }
  .dash-sub { display: flex; align-items: center; gap: 10px; }
  .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 100px; font-size: 12px; font-weight: 500; }
  .status-active { background: rgba(0,200,150,0.12); color: var(--accent); border: 1px solid rgba(0,200,150,0.25); }
  .status-pending { background: rgba(250,168,58,0.12); color: #FAA83A; border: 1px solid rgba(250,168,58,0.25); }
  .status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .plan-chip { background: var(--bg3); border: 1px solid var(--border-bright); border-radius: 100px; padding: 4px 12px; font-size: 12px; color: var(--text-mid); text-transform: capitalize; }
  .tabs { display: flex; gap: 4px; margin-bottom: 28px; border-bottom: 1px solid var(--border); padding-bottom: 0; }
  .tab-btn { background: transparent; border: none; padding: 10px 18px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s; }
  .tab-btn:hover { color: var(--text); }
  .tab-active { color: var(--accent) !important; border-bottom-color: var(--accent) !important; }
  .tab-content { animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  .info-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  .info-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 20px; }
  .info-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 500; margin-bottom: 8px; }
  .info-value { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 600; color: var(--text); }
  .calls-list { display: flex; flex-direction: column; gap: 10px; }
  .call-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .call-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; cursor: pointer; transition: background 0.15s; }
  .call-header:hover { background: var(--bg3); }
  .call-name { font-weight: 500; font-size: 15px; margin-bottom: 2px; }
  .call-phone { font-size: 12px; color: var(--text-muted); }
  .call-right { display: flex; align-items: center; gap: 16px; }
  .call-date { font-size: 13px; color: var(--text-muted); }
  .call-expand { font-size: 11px; color: var(--text-muted); }
  .call-summary { padding: 0 20px 16px; font-size: 14px; color: var(--text-mid); line-height: 1.6; }
  .call-transcript { padding: 16px 20px; border-top: 1px solid var(--border); }
  .transcript-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 500; margin-bottom: 10px; }
  .transcript-text { font-size: 13px; color: var(--text-mid); line-height: 1.8; white-space: pre-wrap; }
  .config-list { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
  .config-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 24px; border-bottom: 1px solid var(--border); gap: 24px; }
  .config-row:last-child { border-bottom: none; }
  .config-label { font-size: 13px; color: var(--text-muted); min-width: 180px; flex-shrink: 0; }
  .config-value { font-size: 14px; color: var(--text); text-align: right; line-height: 1.5; }
  .empty-state { text-align: center; padding: 60px 24px; color: var(--text-muted); }
  .empty-state h3 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 600; color: var(--text-mid); margin-bottom: 8px; }
  .empty-state p { font-size: 14px; }
  @media (max-width: 768px) {
    .dash-nav { padding: 0 20px; }
    .dash-wrap { padding: 24px 20px; }
    .info-grid { grid-template-columns: 1fr 1fr; }
    .config-row { flex-direction: column; gap: 4px; }
    .config-value { text-align: left; }
  }
`;
