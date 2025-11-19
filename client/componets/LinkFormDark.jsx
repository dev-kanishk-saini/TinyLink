"use client";

import { useState } from "react";

export default function LinkFormDark({ onCreate }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!url) throw new Error("Please enter a URL");
      await onCreate({ url, code: code || undefined });
      setUrl("");
      setCode("");
    } catch (err) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-4 items-end">
      <div className="md:col-span-3">
        <label className="text-sm text-slate-300">Enter long URL</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/path"
          className="mt-2 w-full rounded-md bg-surface-700 border border-slate-700 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-blue-600"
          required
        />
        <p className="text-xs text-slate-500 mt-1">We'll create a short link and track clicks.</p>
      </div>

      <div>
        <label className="text-sm text-slate-300">Custom code (optional)</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6-8 chars A-Z a-z 0-9"
          className="mt-2 w-full rounded-md bg-surface-700 border border-slate-700 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="md:col-span-4 flex gap-3">
        <button disabled={loading} className="btn-primary">
          {loading ? "Creating..." : "Create Short Link"}
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => { setUrl(""); setCode(""); setError(""); }}
        >
          Reset
        </button>
        {error && <div className="text-red-500 ml-auto">{error}</div>}
      </div>
    </form>
  );
}
