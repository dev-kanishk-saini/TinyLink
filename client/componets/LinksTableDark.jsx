// "use client";

// import Link from "next/link";

// export default function LinksTableDark({ links = [], onDelete }) {
//   const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//   const PUBLIC = process.env.NEXT_PUBLIC_API_URL;

//   if (!links.length) {
//     return <div className="card p-6 text-slate-400">No links yet. Create your first short link.</div>;
//   }

//   async function copyToClipboard(text) {
//     if (navigator.clipboard) {
//       await navigator.clipboard.writeText(text);
//       // basic feedback
//       const el = document.createElement('div');
//       el.textContent = 'Copied!';
//       el.className = 'fixed right-6 bottom-6 bg-surface-800 text-white px-3 py-2 rounded shadow';
//       document.body.appendChild(el);
//       setTimeout(() => document.body.removeChild(el), 1200);
//     } else alert('Copy not supported');
//   }

//   return (
//     <div className="card p-4">
//       <div className="table-scroll">
//         <table className="min-w-full divide-y table-auto">
//           <thead className="text-slate-400 text-xs uppercase">
//             <tr>
//               <th className="px-4 py-2 text-left">Code</th>
//               <th className="px-4 py-2 text-left">Target</th>
//               <th className="px-4 py-2 text-left">Clicks</th>
//               <th className="px-4 py-2 text-left">Last Clicked</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {links.map((l) => (
//               <tr key={l.code} className="hover:bg-slate-800">
//                 <td className="px-4 py-3 font-mono text-sm text-white">{l.code}</td>
//                 <td className="px-4 py-3 max-w-xl truncate text-slate-200">{l.url}</td>
//                 <td className="px-4 py-3 text-slate-300">{l.clicks}</td>
//                 <td className="px-4 py-3 text-slate-300">{l.last_clicked ? new Date(l.last_clicked).toLocaleString() : '—'}</td>
//                 <td className="px-4 py-3 flex items-center gap-3">
//                   <a className="text-blue-400 hover:underline text-sm" href={`${PUBLIC}/${l.code}`} target="_blank" rel="noreferrer">Open</a>
//                   <Link href={`/code/${l.code}`} className="text-indigo-400 hover:underline text-sm">Stats</Link>
//                   <button onClick={() => copyToClipboard(`${BASE}/${l.code}`)} className="text-slate-300 text-sm">Copy</button>
//                   <button onClick={() => onDelete(l.code)} className="text-red-500 text-sm">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LinksTableDark({ links = [] }) {
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  async function handleDelete(code) {
    if (!confirm(`Delete link ${code}?`)) return;

    await fetch(`${API_BASE}/api/links/${code}`, {
      method: "DELETE",
    });

    router.refresh(); // Refresh instantly
  }

  async function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  return (
    <div className="card p-4">
      <table className="min-w-full divide-y table-auto">
                  <thead className="text-slate-400 text-xs uppercase">
             <tr>
             <th className="px-4 py-2 text-left">Code</th>
               <th className="px-4 py-2 text-left">Target</th>
               <th className="px-4 py-2 text-left">Clicks</th>
               <th className="px-4 py-2 text-left">Last Clicked</th>
               <th className="px-4 py-2 text-left">Actions</th>
             </tr>
           </thead>
        <tbody className="divide-y">
          {links.map((l) => (
            <tr key={l.code}>
              <td>{l.code}</td>
              <td>{l.url}</td>
              <td>{l.clicks}</td>
              {/* <td>{l.last_clicked ? new Date(l.last_clicked).toLocaleString() : "—"}</td> */}
              <td>
  {l.last_clicked
    ? new Date(l.last_clicked).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    : "—"}
</td>
              <td className="flex gap-3">
                <a
                  href={`${API_BASE}/${l.code}`}
                  target="_blank"
                  className="text-blue-400"
                >
                  Open
                </a>

                <Link href={`/code/${l.code}`} className="text-indigo-400">
                  Stats
                </Link>

                <button onClick={() => copyToClipboard(`${BASE}/${l.code}`)}>
                  Copy
                </button>

                <button onClick={() => handleDelete(l.code)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
