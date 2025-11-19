"use client";

import { useState } from "react";

export default function LinkForm({ onCreate }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onCreate({ url, code: code || undefined });
      setUrl("");
      setCode("");
    } catch (err) {
      setError(err.message || "Failed to create link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Long URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/path"
            className="mt-1 block w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Custom Code (optional)</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6-8 chars, A-Z a-z 0-9"
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Creating..." : "Shorten"}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </form>
  );
}
