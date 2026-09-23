const fs = require('fs');

const insightsContent = fs.readFileSync('./src/lib/insights.ts', 'utf8');

const descRegex = /"slug":\s*"([^"]+)",[\s\S]*?"description":\s*{\s*"tr":\s*"([^"]+)",\s*"en":\s*"([^"]+)"\s*}/g;
let match;
let count = 0;
let errors = 0;
console.log('=== INSIGHTS META DESCRIPTION AUDIT (24 ARTICLES) ===');
while ((match = descRegex.exec(insightsContent)) !== null) {
  count++;
  const slug = match[1];
  const tr = match[2];
  const en = match[3];
  const trOk = tr.length >= 156;
  const enOk = en.length >= 156;
  if (!trOk || !enOk) errors++;
  console.log(`[${count}] ${slug}`);
  console.log(`  TR (${tr.length} chars): ${trOk ? '✅ OK' : '⚠️ SHORT (<156)'}`);
  console.log(`  EN (${en.length} chars): ${enOk ? '✅ OK' : '⚠️ SHORT (<156)'}`);
}

console.log(`\nTotal articles audited: ${count}`);
console.log(`Total errors (<156 chars): ${errors}`);
