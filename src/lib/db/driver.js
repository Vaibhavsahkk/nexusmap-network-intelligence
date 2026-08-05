import neo4j from 'neo4j-driver';

const globalForNeo4j = globalThis;

/**
 * Returns a singleton instance of the Neo4j driver across serverless invocations.
 * Configured specifically for CognoDB Cloud and Vercel edge/serverless execution limits.
 */
export function getDriver() {
  if (!globalForNeo4j.__neo4jDriver) {
    const uri = process.env.COGNODB_URI;
    const user = process.env.COGNODB_USER || 'cognodb';
    const password = process.env.COGNODB_PASSWORD;

    if (!uri || !password) {
      throw new Error(
        'Database connection credentials missing. Set COGNODB_URI and COGNODB_PASSWORD in .env.local.'
      );
    }

    globalForNeo4j.__neo4jDriver = neo4j.driver(
      uri,
      neo4j.auth.basic(user, password),
      {
        maxConnectionPoolSize: 5,             // Low connection pool to respect serverless concurrency
        connectionAcquisitionTimeout: 3000,    // Fail fast if pool is exhausted
        connectionTimeout: 5000,               // 5s timeout to prevent hanging Vercel serverless functions
        maxTransactionRetryTime: 3000,
        disableLosslessIntegers: true,        // Auto-converts Cypher integers to standard JS Numbers
      }
    );
  }
  return globalForNeo4j.__neo4jDriver;
}

/**
 * Helper to run a parameterised Cypher query and safely auto-close session.
 * @param {string} cypher - openCypher query string
 * @param {Object} params - Parameter object (NO raw string concatenation)
 */
export async function executeQuery(cypher, params = {}) {
  const driver = getDriver();
  const session = driver.session();
  try {
    const result = await session.run(cypher, params);
    return result.records;
  } catch (error) {
    console.error('Database Query Failure:', error.message);
    throw error;
  } finally {
    await session.close();
  }
}
