
"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function CodePage(props) {
  const { code } = use(props.params);
  const [link, setLink] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchOne() {
      try {
        const res = await fetch(`${API_BASE}/api/links/${code}`);
        if (res.status === 404) {
          setError("Not found");
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setLink(data);
      } catch (err) {
        setError(err.message || "Failed to load");
      }
    }
    fetchOne();
  }, [code]);

  if (error) return (
    <div>
      <button onClick={() => router.push("/")} className="text-sm text-blue-400 mb-4">← Back</button>
      <div className="text-red-500">{error}</div>
    </div>
  );

  if (!link) return <div className="text-slate-400">Loading...</div>;

  return (
    <div className="space-y-4">
      <button onClick={() => router.push("/")} className="text-sm text-blue-400">← Back</button>

      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Stats for <span className="font-mono">{link.code}</span></h2>
            <p className="text-slate-400 mt-1">Track clicks and last visit.</p>
          </div>

          <div className="text-right">
            <a className="btn-primary inline-block" href={`${API_BASE}/${link.code}`} target="_blank" rel="noreferrer">Open Link</a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-700 p-4 rounded">
            <div className="text-sm text-slate-400">Clicks</div>
            <div className="text-2xl font-semibold text-white">{link.clicks}</div>
          </div>

          <div className="bg-surface-700 p-4 rounded">
            <div className="text-sm text-slate-400">Created</div>
            <div className="text-sm text-slate-200">{new Date(link.created_at).toLocaleString()}</div>
          </div>

          <div className="bg-surface-700 p-4 rounded">
            <div className="text-sm text-slate-400">Last Clicked</div>
            <div className="text-sm text-slate-200">{link.last_clicked ? new Date(link.last_clicked).toLocaleString() : '—'}</div>
          </div>
        </div>

        <div className="mt-6 text-slate-300">
          <strong>Target URL:</strong> <a className="text-blue-400 hover:underline" href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
        </div>
      </div>
    </div>
  );
}
