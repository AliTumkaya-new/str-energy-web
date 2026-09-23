const fs = require('fs');

const content = fs.readFileSync('./src/lib/insights.ts', 'utf8');

const articles = content.split(/"slug":\s*"/g).slice(1);

console.log('=== INSIGHT ARTICLES WORD COUNT AUDIT (24 ARTICLES) ===');
let allAbove300 = true;
let allAbove500 = true;

articles.forEach((art, idx) => {
  const slug = art.split('"')[0];
  const trMatches = art.match(/"tr":\s*"([^"]+)"/g) || [];
  const enMatches = art.match(/"en":\s*"([^"]+)"/g) || [];
  
  const trWords = trMatches.map(m => m.replace(/"tr":\s*"/, '').replace(/"$/, '')).join(' ').split(/\s+/).length;
  const enWords = enMatches.map(m => m.replace(/"en":\s*"/, '').replace(/"$/, '')).join(' ').split(/\s+/).length;

  if (trWords < 300 || enWords < 300) allAbove300 = false;
  if (trWords < 500 || enWords < 500) allAbove500 = false;

  console.log(`[${idx+1}] ${slug}`);
  console.log(`    TR words: ~${trWords} ${trWords >= 500 ? '✅ (Recommended >=500)' : trWords >= 300 ? '⚠️ (300-500)' : '❌ (<300)'}`);
  console.log(`    EN words: ~${enWords} ${enWords >= 500 ? '✅ (Recommended >=500)' : enWords >= 300 ? '⚠️ (300-500)' : '❌ (<300)'}`);
});

console.log(`\nAll >= 300 words: ${allAbove300 ? '✅ YES' : '❌ NO'}`);
console.log(`All >= 500 words: ${allAbove500 ? '✅ YES' : '⚠️ MOST'}`);
