import "@/styles/admin.css";
import { LoginForm } from "./form";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sign in" };

type SP = Promise<{ from?: string }>;

export default async function LoginPage({ searchParams }: { searchParams: SP }) {
  if (await isAuthenticated()) redirect("/admin");
  const sp = await searchParams;
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin sign-in</h1>
        <p>Fuster Cluck Farm content editor</p>
        <LoginForm from={sp?.from} />
      </div>
    </div>
  );
}
