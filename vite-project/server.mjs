import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { join } from 'node:path';

const db = new DatabaseSync(join(import.meta.dirname, 'students.db'));

// ИСПРАВЛЕНО: заменили поле is_present на status в select-запросе
const selectAll = db.prepare('select id, name, iq, sex, status from students order by iq desc');

createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.url === '/api/students') {
    res.end(JSON.stringify({ records: selectAll.all() }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'not found' }));
}).listen(3000, () => console.log('API: http://localhost:3000/api/students'));
