"use client";

import Link from "next/link";

export default function LinksTable({ links, onDelete }) {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!links.length) {
    return <div className="bg-white p-6 rounded shadow text-gray-600">No links yet. Create one above.</div>;
  }

  async function copyText(text) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } else {
      alert("Clipboard not supported");
    }
  }

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Code</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Target URL</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Clicks</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Last Clicked</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {links.map(l => (
            <tr key={l.code}>
              <td className="px-4 py-3 whitespace-nowrap font-mono text-sm">{l.code}</td>
              <td className="px-4 py-3 max-w-xl truncate">{l.url}</td>
              <td className="px-4 py-3">{l.clicks}</td>
              <td className="px-4 py-3">{l.last_clicked ? new Date(l.last_clicked).toLocaleString() : "—"}</td>
              <td className="px-4 py-3 space-x-2">
                <a className="text-blue-600 hover:underline" href={`${BASE}/${l.code}`} target="_blank" rel="noreferrer">Open</a>
              <Link 
  href={`/code/${l.code}`} 
  className="text-indigo-600 hover:underline"
>
  Stats
</Link>
                <button onClick={() => copyText(`${BASE}/${l.code}`)} className="text-gray-600 hover:underline">Copy</button>
                <button onClick={() => onDelete(l.code)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
