const base = process.env.BASE_URL ?? "http://localhost:3000";
const endpoints = ["/api/health", "/api/demo/state", "/api/demo/state?stage=after", "/api/scores/company-mx-001", "/api/documents/verify?hash=demo-hash"];
for (const endpoint of endpoints) {
  const url = `${base}${endpoint}`;
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) { console.error(`FAIL ${url}`); console.error(text); process.exitCode = 1; }
  else { console.log(`OK   ${url}`); }
}
