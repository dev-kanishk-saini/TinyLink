


"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Copy, Trash2, ExternalLink, BarChart2 } from "lucide-react"; // icons

export default function LinksTableDark({ links = [] }) {
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  async function handleDelete(code) {
    if (!confirm(`Delete link ${code}?`)) return;

    await fetch(`${API_BASE}/api/links/${code}`, { method: "DELETE" });
    router.refresh();
  }

  async function copyToClipboard(text) {
    await navigator.clipboard.writeText(text);
    const el = document.createElement("div");
    el.textContent = "Copied!";
    el.className =
      "fixed right-6 bottom-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg";
    document.body.appendChild(el);
    setTimeout(() => document.body.removeChild(el), 1200);
  }

  if (!links.length)
    return (
      <div className="card p-6 text-slate-400 text-center">
        No links yet. Create your first short link.
      </div>
    );

  return (
  

    <div className="card p-6 overflow-x-auto">
  
 
 <table className="min-w-full divide-y table-auto border border-white rounded-lg overflow-hidden">
    <thead className="bg-slate-800 text-slate-400 text-sm uppercase">
      <tr>
 <th className="px-8 py-5 text-left" style={{ width: '150px' }}>Code</th>
<th className="px-8 py-5 text-left" style={{ width: '400px' }}>Target URL</th>
<th className="px-8 py-5 text-left" style={{ width: '100px' }}>Clicks</th>
<th className="px-8 py-5 text-left" style={{ width: '200px' }}>Last Clicked</th>
<th className="px-8 py-5 text-left" style={{ width: '250px' }}>Actions</th>

      </tr>
    </thead>

    <tbody className="divide-y divide-slate-700">
      {links.map((l) => (
        <tr
          key={l.code}
          className="hover:bg-slate-900 hover:shadow-md transition-all duration-150"
        >
          <td className="px-8 py-5 font-mono text-base text-white text-center">{l.code}</td>

          <td className="px-8 py-5 max-w-4xl truncate text-slate-200 text-base text-center">
            {l.url}
          </td>

          <td className="px-8 py-5 text-slate-300 font-medium text-base text-center">{l.clicks}</td>

          <td className="px-8 py-5 text-slate-300 text-base text-center">
            {l.last_clicked
              ? new Date(l.last_clicked).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
              : "—"}
          </td>

          <td className="px-8 py-5 flex flex-wrap gap-4 items-center justify-center">
            <a
              href={`${API_BASE}/${l.code}`}
              target="_blank"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-500"
              title="Open link"
            >
              <ExternalLink size={18} /> Open
            </a>

            <Link
              href={`/code/${l.code}`}
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-500"
              title="Stats"
            >
              <BarChart2 size={18} /> Stats
            </Link>

            <button
              onClick={() => copyToClipboard(`${BASE}/${l.code}`)}
              className="flex items-center gap-2 text-slate-300 hover:text-green-400"
              title="Copy link"
            >
              <Copy size={18} /> Copy
            </button>

            <button
              onClick={() => handleDelete(l.code)}
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
              title="Delete link"
            >
              <Trash2 size={18} /> Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table> 
   
    
   
</div>
 

  );
}
