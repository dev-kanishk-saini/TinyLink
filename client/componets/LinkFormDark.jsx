// "use client";

// import { useState } from "react";

// export default function LinkFormDark({ onCreate }) {
//   const [url, setUrl] = useState("");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function submit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       if (!url) throw new Error("Please enter a URL");
//       await onCreate({ url, code: code || undefined });
//       setUrl("");
//       setCode("");
//     } catch (err) {
//       setError(err.message || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={submit} className="grid gap-4 md:grid-cols-4 items-end">
//       <div className="md:col-span-3">
//         <label className="text-sm text-slate-300">Enter long URL</label>
//         <input
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="https://example.com/very/long/path"
//           className="mt-2 w-full rounded-md bg-surface-700 border border-slate-700 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-blue-600"
//           required
//         />
//         <p className="text-xs text-slate-500 mt-1">We'll create a short link and track clicks.</p>
//       </div>

//       <div>
//         <label className="text-sm text-slate-300">Custom code (optional)</label>
//         <input
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           placeholder="6-8 chars A-Z a-z 0-9"
//           className="mt-2 w-full rounded-md bg-surface-700 border border-slate-700 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-blue-600"
//         />
//       </div>

//       <div className="md:col-span-4 flex gap-3">
//         <button disabled={loading} className="btn-primary">
//           {loading ? "Creating..." : "Create Short Link"}
//         </button>
//         <button
//           type="button"
//           className="btn-ghost"
//           onClick={() => { setUrl(""); setCode(""); setError(""); }}
//         >
//           Reset
//         </button>
//         {error && <div className="text-red-500 ml-auto">{error}</div>}
//       </div>
//     </form>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LinkFormDark() {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlecreate(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { url };
      if (code) payload.code = code;

      const res = await fetch(`${API_BASE}/api/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create link");
      }

      // Refresh the server component instantly
      router.refresh();

      setUrl("");
      setCode("");
    } catch (err) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handlecreate} className="grid gap-4 md:grid-cols-4 items-end">
  <div className="md:col-span-3">
    <label className="text-xl text-slate-300">Enter long URL</label>
    {/* <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="https://example.com/very/long/path"
      className="mt-2 w-full rounded-md bg-surface-700 border border-white px-2 py-3 text-sm text-slate-100 placeholder:text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600"
      required
    /> */}
    <input
  value={url}
  onChange={(e) => setUrl(e.target.value)}
  placeholder="https://example.com/very/long/path"
  className="mt-2 w-full rounded-md bg-surface-700 border border-white px-4 py-4 text-lg text-slate-100 placeholder:text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600"
  required
/>

   
  </div>

  <div>
    <label className="text-xl text-slate-300">Custom code (optional)</label>
    {/* <input
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="6-8 chars A-Z a-z 0-9"
      className="mt-2 w-full rounded-md bg-surface-700 border border-white px-2 py-3 text-sm text-slate-100 placeholder:text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600"
    /> */}
    <input
  value={code}
  onChange={(e) => setCode(e.target.value)}
  placeholder="6-8 chars A-Z a-z 0-9"
  className="mt-2 w-full rounded-md bg-surface-700 border border-white px-4 py-4 text-lg text-slate-100 placeholder:text-base placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600"
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











