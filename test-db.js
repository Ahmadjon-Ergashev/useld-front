const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, 'prisma', 'dev.db');
console.log('Searching for DB at:', dbPath);
if (fs.existsSync(dbPath)) {
  console.log('DB FILE EXISTS!');
  const stats = fs.statSync(dbPath);
  console.log('Size:', stats.size);
} else {
  console.log('DB FILE NOT FOUND!');
  console.log('Directory contents of prisma/:', fs.readdirSync(path.join(__dirname, 'prisma')));
}
