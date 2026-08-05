import test from 'node:test';
import assert from 'node:assert';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { searchNetwork } from '../src/lib/db/queries/search.js';
import { findShortestPath } from '../src/lib/db/queries/path.js';
import { getPersonProfile } from '../src/lib/db/queries/person.js';
import { getCompanyNetwork } from '../src/lib/db/queries/company.js';
import { getGraphData } from '../src/lib/db/queries/graph.js';
import { getNetworkStats } from '../src/lib/db/queries/stats.js';
import { getDriver } from '../src/lib/db/driver.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

test('NexusMap Complete API Layer & Query Test Suite', async (t) => {
  await t.test('1. Database Connectivity & Driver Pool', async () => {
    const driver = getDriver();
    await driver.verifyConnectivity();
    assert.ok(true);
  });

  await t.test('2. Bounded Search Query (1..3 Hops with 4-Tier Ranking)', async () => {
    const results = await searchNetwork('Priya', 5);
    assert(Array.isArray(results));
    if (results.length > 0) {
      assert(typeof results[0].degree === 'number');
      assert(results[0].degree >= 1 && results[0].degree <= 3);
      assert(typeof results[0].mutualCount === 'number');
    }
  });

  await t.test('3. Bounded Shortest Path Query (1..5 Hops)', async () => {
    const pathResult = await findShortestPath('person-10');
    assert.strictEqual(typeof pathResult.found, 'boolean');
    if (pathResult.found) {
      assert(pathResult.hops >= 1 && pathResult.hops <= 5);
      assert(Array.isArray(pathResult.people));
      assert(Array.isArray(pathResult.connections));
    }
  });

  await t.test('4. Full Person Profile Query', async () => {
    const profile = await getPersonProfile('root-user-id');
    assert.ok(profile);
    assert.strictEqual(profile.person.id, 'root-user-id');
    assert(Array.isArray(profile.workHistory));
    assert(Array.isArray(profile.skills));
  });

  await t.test('5. Network Graph Visualization Subgraph Query', async () => {
    const graph = await getGraphData();
    assert(Array.isArray(graph.nodes));
    assert(Array.isArray(graph.links));
  });

  await t.test('6. Network Overview Analytics Stats Query', async () => {
    const stats = await getNetworkStats();
    assert(typeof stats.directCount === 'number');
    assert(typeof stats.reach2Hops === 'number');
    assert(typeof stats.totalReachable === 'number');
  });
});
