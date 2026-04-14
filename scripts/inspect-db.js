require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { Client } = require('pg');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL missing');

  const c = new Client({ connectionString: url });
  await c.connect();

  const roomCols = await c.query(
    "select column_name,data_type,udt_name from information_schema.columns where table_schema='public' and table_name='Room' order by ordinal_position",
  );
  console.log('Room columns:', roomCols.rows);

  const attachmentTable = await c.query(
    "select table_name from information_schema.tables where table_schema='public' and table_name='Attachment'",
  );
  console.log('Attachment table exists:', attachmentTable.rows.length > 0);

  if (attachmentTable.rows.length > 0) {
    const attCols = await c.query(
      "select column_name,data_type,udt_name from information_schema.columns where table_schema='public' and table_name='Attachment' order by ordinal_position",
    );
    console.log('Attachment columns:', attCols.rows);
  }

  const migrations = await c.query(
    'select migration_name, started_at, finished_at, rolled_back_at from _prisma_migrations order by started_at desc limit 5',
  );
  console.log('Recent migrations:', migrations.rows);

  await c.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

