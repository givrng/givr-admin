import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tokenInput, setTokenInput] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    login(tokenInput.trim());
    navigate("/verify", { replace: true });
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
      <form onSubmit={onSubmit} className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-blue-700">Passwordless Sign-In</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">Admin access</h1>
        <p className="mt-1 text-sm text-slate-500">
          Enter your login token to sign in. Your role is extracted from the JWT payload.
        </p>

        <label htmlFor="token" className="mt-4 block text-sm font-medium text-slate-700">
          JWT token
        </label>
        <textarea
          id="token"
          required
          rows={5}
          value={tokenInput}
          onChange={(event) => setTokenInput(event.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm"
          placeholder="Paste JWT here"
        />

        <button type="submit" className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          Sign in
        </button>
      </form>
    </main>
  );
}
