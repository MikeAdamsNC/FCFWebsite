import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Admin login" };

export default function LoginPage() {
  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: 32 }}>
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          background: "var(--paper)",
          border: "1px solid var(--rule)",
          padding: 40,
          borderRadius: 6,
        }}
      >
        <div className="ornament" style={{ marginBottom: 16 }}>
          admin
        </div>
        <h1 style={{ fontSize: 28, marginBottom: 24 }}>Sign in</h1>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
