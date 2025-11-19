// generate a random code of length between 6 and 8 from A-Za-z0-9
export function generateCode(length = 6) {
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let result = "";
for (let i = 0; i < length; i++) result += chars[Math.floor(Math.random() * chars.length)];
return result;
}


export function generateUniqueCode(checkFn) {
// tries a few times to generate unique code
return (async function tryGen() {
for (let attempt = 0; attempt < 5; attempt++) {
const len = Math.random() > 0.5 ? 6 : 7; // 6 or 7 chars
const code = generateCode(len);
const exists = await checkFn(code);
if (!exists) return code;
}
// as fallback, produce an 8-char code
let code = generateCode(8);
while (await checkFn(code)) {
code = generateCode(8);
}
return code;
})();
}