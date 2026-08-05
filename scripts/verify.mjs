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

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  disableLosslessIntegers: true,
});

async function verify() {
  console.log('🔍 Verifying CognoDB Connection...');
  const session = driver.session();
  try {
    const nodeRes = await session.run('MATCH (n) RETURN count(n) AS nodeCount');
    const edgeRes = await session.run('MATCH ()-[r]->() RETURN count(r) AS edgeCount');

    const nodeCount = nodeRes.records[0].get('nodeCount');
    const edgeCount = edgeRes.records[0].get('edgeCount');

    console.log('✅ Connected to CognoDB Cloud successfully!');
    console.log(`   URI: ${uri}`);
    console.log(`   Nodes in DB: ${nodeCount}`);
    console.log(`   Edges in DB: ${edgeCount}`);
  } catch (err) {
    console.error('❌ Connection verification failed:', err.message);
    process.exit(1);
  } finally {
    await session.close();
    await driver.close();
  }
}

verify();
