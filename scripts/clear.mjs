import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.COGNODB_URI;
const user = process.env.COGNODB_USER || 'cognodb';
const password = process.env.COGNODB_PASSWORD;

if (!uri || !password) {
  console.error('❌ Missing credentials in .env.local');
  process.exit(1);
}

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

async function clear() {
  console.log('🧹 Clearing all nodes and relationships from CognoDB...');
  const session = driver.session();
  try {
    await session.run('MATCH (n) DETACH DELETE n');
    console.log('✅ Database completely wiped.');
  } catch (err) {
    console.error('❌ Wipe failed:', err);
  } finally {
    await session.close();
    await driver.close();
  }
}

clear();
