"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav>
      <a href="/" className="logo">Nex<span>Reception</span></a>
      <ul className="nav-links">
        <li><a href="#how">How it works</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        {isSignedIn ? (
          <>
            <li><a href="/dashboard/client" className="nav-cta">My Dashboard</a></li>
            <li>
              <SignOutButton redirectUrl="/">
                <button style={{background:"transparent",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"8px",padding:"8px 16px",color:"#9BAABB",cursor:"pointer",fontFamily:"inherit",fontSize:"14px"}}>
                  Sign out
                </button>
              </SignOutButton>
            </li>
          </>
        ) : (
          <li><a href="/onboarding" className="nav-cta">Get started</a></li>
        )}
      </ul>
    </nav>
  );
}
