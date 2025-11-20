// import "../app/globals.css";

// export const metadata = {
//   title: "TinyLink",
//   description: "Simple URL Shortener"
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen flex flex-col">
//         <header className="bg-white shadow">
//           <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
//             <div>
//               <h1 className="text-xl font-semibold">TinyLink</h1>
//               <p className="text-sm text-gray-500">Small, simple URL shortener</p>
//             </div>
//             <div className="text-sm text-gray-600">{process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}</div>
//           </div>
//         </header>

//         <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-grow">{children}</main>

//         <footer className="bg-white border-t">
//           <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-500 text-center">
//             Built with ❤️ • TinyLink
//           </div>
//         </footer>
//       </body>
//     </html>
//   );
// }

import "./globals.css";

export const metadata = {
  title: "TinyLink",
  description: "TinyLink dark UI dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <div className="w-full border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

            {/* <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">TL</div>
              <div>
                <div className="text-white text-lg font-semibold">TinyLink</div>
                <div className="text-slate-400 text-xs">Shorten. Share. Track.</div>
              </div>
            </div> */}
            <div className="flex items-center gap-4">
  <div className="w-14 h-14 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
    TL
  </div>
  <div>
    <div className="text-white text-2xl font-semibold">TinyLink</div>
    <div className="text-slate-400 text-base font-medium">Shorten. Share. Track.</div>
  </div>
</div>


            <div className="flex items-center gap-3">
               <a href="http://localhost:5000/healthz" target="_blank" className="btn-ghost">Check Health</a>
              <a href="https://github.com/dev-kanishk-saini/TinyLink" target="_blank" className="btn-ghost">Source</a>
              {/* <a className="btn-primary" href="#">Create</a> */}
            </div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">{children}</main>

        <footer className="border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 text-center">
            TinyLink • Built with care • Dark UI
          </div>
        </footer>
      </body>
    </html>
  );
}

