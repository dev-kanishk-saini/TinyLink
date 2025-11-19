import validUrl from "valid-url";
import { findByCode, createLink, listLinks, deleteByCode } from "../db/links.js";
import { generateUniqueCode } from "../utils/codegen.js";


export async function createLinkHandler(req, res) {
let { url, code } = req.body || {};
console.log(req);
if (!url) return res.status(400).json({ error: "Missing url" });


if (!validUrl.isUri(url)) {
return res.status(400).json({ error: "Invalid URL" });
}


if (code) {
// validate code format
if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
return res.status(400).json({ error: "Code must match [A-Za-z0-9]{6,8}" });
}
const existing = await findByCode(code);
if (existing) return res.status(409).json({ error: "Code already exists" });
} else {
// auto-generate unique code
code = await generateUniqueCode(async (candidate) => {
const e = await findByCode(candidate);
return !!e;
});
}


const row = await createLink(code, url);
return res.json(row);
}


export async function listLinksHandler(req, res) {
const rows = await listLinks();
res.json(rows);
console.log("Function triggered!");
}


export async function getLinkHandler(req, res) {
const code = req.params.code;
const row = await findByCode(code);
if (!row) return res.status(404).json({ error: "Not found" });
res.json(row);
}


export async function deleteLinkHandler(req, res) {
const code = req.params.code;
await deleteByCode(code);
res.json({ success: true });
}