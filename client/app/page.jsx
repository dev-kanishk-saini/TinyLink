// "use client";

// import { useEffect, useState } from "react";
// import LinkForm from "../componets/LinkForm.jsx";
// import LinksTable from "../componets/LinksTable.jsx";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function Page() {
//   const [links, setLinks] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function fetchLinks() {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${API_BASE}/api/links`);
//       if (!res.ok) throw new Error("Failed to fetch links");
//       const data = await res.json();
//       setLinks(data);
//     } catch (err) {
//       setError(err.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchLinks();
//   }, []);

//   async function handleCreate({ url, code }) {
//     const payload = { url };
//     if (code) payload.code = code;
//     const res = await fetch(`${API_BASE}/api/links`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });
//     if (!res.ok) {
//       const err = await res.json().catch(() => ({}));
//       throw new Error(err.error || "Failed to create link");
//     }
//     await fetchLinks();
//   }

//   async function handleDelete(code) {
//     if (!confirm(`Delete link "${code}"?`)) return;
//     await fetch(`${API_BASE}/api/links/${code}`, { method: "DELETE" });
//     await fetchLinks();
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

//       <LinkForm onCreate={handleCreate} />

//       <div className="mt-6">
//         {loading && <div className="text-gray-600">Loading links...</div>}
//         {error && <div className="text-red-600">{error}</div>}
//         {links && <LinksTable links={links} onDelete={handleDelete} />}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import LinkFormDark from "../componets/LinkFormDark.jsx";
import LinksTableDark from "../componets/LinksTableDark.jsx";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Page() {
  const [links, setLinks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchLinks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/links`);
      if (!res.ok) throw new Error("Unable to fetch links");
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      setError(err.message || "Error");
      setLinks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  async function handleCreate({ url, code }) {
    const payload = { url };
    if (code) payload.code = code;
    const res = await fetch(`${API_BASE}/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to create link");
    }
    await fetchLinks();
  }

  async function handleDelete(code) {
    if (!confirm(`Delete link ${code}?`)) return;
    await fetch(`${API_BASE}/api/links/${code}`, { method: "DELETE" });
    await fetchLinks();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <div className="text-sm text-slate-400">Dark professional dashboard</div>
      </div>

      <div className="card p-4">
        <LinkFormDark onCreate={handleCreate} />
      </div>

      <div>
        {loading && <div className="text-slate-400">Loading links...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {links && <LinksTableDark links={links} onDelete={handleDelete} />}
      </div>
    </div>
  );
}
