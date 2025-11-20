import { query } from "./index.js";


export async function createLink(code, url) {
const res = await query(
`INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *`,
[code, url]
);
return res.rows[0];
}


export async function findByCode(code) {
const res = await query(`SELECT * FROM links WHERE code = $1 LIMIT 1`, [code]);
return res.rows[0];
}


// export async function listLinks() {
// const res = await query(`SELECT * FROM links ORDER BY created_at DESC`);
// return res.rows;
// }

export async function listLinks() {
  const res = await query(`
    SELECT *,
      (created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') AS created_ist,
      (last_clicked AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') AS last_clicked_ist
    FROM links
    ORDER BY created_at DESC
  `);
  return res.rows;
}

export async function deleteByCode(code) {
await query(`DELETE FROM links WHERE code = $1`, [code]);
}


export async function incrementClicks(code) {
await query(`UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1`, [code]);
}