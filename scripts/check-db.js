require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { Client } = require('pg');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is missing in backend/.env');

  const c = new Client({ connectionString: url });
  await c.connect();

  const db = await c.query('select current_database() as db, current_schema() as schema');
  const tables = await c.query(
    "select table_schema, table_name from information_schema.tables where table_type = 'BASE TABLE' and table_schema = 'public' order by table_name",
  );

  console.log('connected:', db.rows[0]);
  console.log('tables:', tables.rows);
  await c.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

