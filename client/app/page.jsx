

import LinkFormDark from "../componets/LinkFormDark";
import LinksTableDark from "../componets/LinksTableDark";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchLinks() {
  const res = await fetch(`${API_BASE}/api/links`, {
    cache: "no-store", // do not cache — always fresh
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const links = await fetchLinks(); // SSR fetch (super fast)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Create Your Code.</h1>
        {/* <p className="text-sm text-slate-400">Dark professional dashboard</p> */}
         <p className="text-sm text-slate-500 mt-1">
      We'll create a short link and track clicks.
    </p>
      </div>

      <div className="card p-4">
        <LinkFormDark />
      </div>
 <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">DashBoard.</h1>
        {/* <p className="text-sm text-slate-400">Dark professional dashboard</p> */}
      </div>

      <LinksTableDark links={links} />
    </div>
  );
}
