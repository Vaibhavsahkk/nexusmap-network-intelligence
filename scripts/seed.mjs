import { faker } from '@faker-js/faker';
import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.COGNODB_URI;
const user = process.env.COGNODB_USER || 'cognodb';
const password = process.env.COGNODB_PASSWORD;

if (!uri || !password) {
  console.error('❌ Missing COGNODB_URI or COGNODB_PASSWORD in .env.local');
  process.exit(1);
}

// Deterministic seed for reproducible graph structure
faker.seed(42);

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  disableLosslessIntegers: true,
});

const getAvatarUrl = (name) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=00d2ff,8b5cf6,10b981`;

async function seed() {
  console.log('🌱 Starting NexusMap Watts-Strogatz Seed Script...');
  const session = driver.session();

  try {
    // 1. Wipe Database Clean
    console.log('🧹 Clearing existing graph data...');
    await session.run('MATCH (n) DETACH DELETE n');

    // 2. Create Indexes
    console.log('⚡ Creating indexes...');
    await session.run('CREATE INDEX person_id IF NOT EXISTS FOR (p:Person) ON (p.id)');
    await session.run('CREATE INDEX person_name IF NOT EXISTS FOR (p:Person) ON (p.name)');
    await session.run('CREATE INDEX company_id IF NOT EXISTS FOR (c:Company) ON (c.id)');
    await session.run('CREATE INDEX skill_name IF NOT EXISTS FOR (s:Skill) ON (s.name)');

    // 3. Generate Static Entities
    console.log('🏢 Creating Companies (40), Skills (50), Universities (20), Locations (15), Industries (12), Events (20)...');
    
    const companies = Array.from({ length: 40 }, (_, i) => ({
      id: `comp-${i + 1}`,
      name: i === 0 ? 'Stripe' : i === 1 ? 'Google' : i === 2 ? 'Wexa AI' : faker.company.name(),
      domain: faker.internet.domainName(),
      size: faker.helpers.arrayElement(['10-50', '51-200', '201-1000', '1000+']),
      founded: faker.number.int({ min: 2005, max: 2023 }),
    }));

    const skills = [
      'React', 'Next.js', 'Node.js', 'Cypher', 'Neo4j', 'TypeScript', 'Python', 'Machine Learning',
      'System Architecture', 'GraphQL', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'TailwindCSS',
      'Product Design', 'B2B Sales', 'DevOps', 'Data Engineering', 'Go', 'Rust', 'Java', 'C++',
      ...Array.from({ length: 27 }, () => faker.person.jobArea())
    ].slice(0, 50).map((name, i) => ({
      id: `skill-${i + 1}`,
      name,
      category: faker.helpers.arrayElement(['Engineering', 'Product', 'Design', 'Data', 'Business']),
    }));

    const universities = Array.from({ length: 20 }, (_, i) => ({
      id: `univ-${i + 1}`,
      name: i === 0 ? 'IIT Delhi' : i === 1 ? 'BITS Pilani' : i === 2 ? 'Stanford University' : `${faker.location.city()} University`,
      location: faker.location.city(),
    }));

    const locations = Array.from({ length: 15 }, (_, i) => ({
      id: `loc-${i + 1}`,
      city: faker.location.city(),
      country: faker.location.country(),
    }));

    const industries = [
      'Artificial Intelligence', 'FinTech', 'Enterprise Software', 'Cybersecurity', 'Cloud Infrastructure',
      'E-Commerce', 'HealthTech', 'EdTech', 'CleanTech', 'Developer Tools', 'BioTech', 'Logistics'
    ].map((name, i) => ({ id: `ind-${i + 1}`, name }));

    const events = Array.from({ length: 20 }, (_, i) => ({
      id: `event-${i + 1}`,
      name: `${faker.company.catchPhraseAdjective()} Tech Summit ${2024 - (i % 3)}`,
      type: 'Conference',
    }));

    // Insert Auxiliary Nodes
    await session.run(
      `UNWIND $companies AS c CREATE (comp:Company {id: c.id, name: c.name, domain: c.domain, size: c.size, founded: c.founded})`,
      { companies }
    );
    await session.run(
      `UNWIND $skills AS s CREATE (sk:Skill {id: s.id, name: s.name, category: s.category})`,
      { skills }
    );
    await session.run(
      `UNWIND $universities AS u CREATE (univ:University {id: u.id, name: u.name, location: u.location})`,
      { universities }
    );
    await session.run(
      `UNWIND $locations AS l CREATE (loc:Location {id: l.id, city: l.city, country: l.country})`,
      { locations }
    );
    await session.run(
      `UNWIND $industries AS i CREATE (ind:Industry {id: i.id, name: i.name})`,
      { industries }
    );
    await session.run(
      `UNWIND $events AS e CREATE (ev:Event {id: e.id, name: e.name, type: e.type})`,
      { events }
    );

    // 4. Create 150 People (Including Root User "You")
    console.log('👥 Creating 150 People nodes (with Root User)...');
    const people = Array.from({ length: 150 }, (_, i) => {
      const isRoot = i === 0;
      const name = isRoot ? 'You (Current User)' : faker.person.fullName();
      return {
        id: isRoot ? 'root-user-id' : `person-${i + 1}`,
        name,
        title: isRoot ? 'Founder & Product Lead' : faker.person.jobTitle(),
        email: isRoot ? 'user@nexusmap.io' : faker.internet.email(),
        bio: faker.person.bio(),
        avatarUrl: getAvatarUrl(name),
        linkedinUrl: `https://linkedin.com/in/${faker.helpers.slugify(name)}`,
        twitterHandle: `@${faker.internet.username()}`,
        isRoot,
      };
    });

    await session.run(
      `UNWIND $people AS p
       CREATE (pers:Person {
         id: p.id, name: p.name, title: p.title, email: p.email,
         bio: p.bio, avatarUrl: p.avatarUrl, linkedinUrl: p.linkedinUrl,
         twitterHandle: p.twitterHandle, isRoot: p.isRoot
       })`,
      { people }
    );

    // 5. Generate Watts-Strogatz Small-World Connections (600 KNOWS Edges)
    console.log('🕸️ Generating Watts-Strogatz Small-World lattice (600 KNOWS edges)...');
    const knowsEdgesMap = new Map();
    const addEdge = (p1, p2, source) => {
      if (p1 === p2) return;
      const key = p1 < p2 ? `${p1}_${p2}` : `${p2}_${p1}`;
      if (!knowsEdgesMap.has(key)) {
        knowsEdgesMap.set(key, {
          sourceId: p1 < p2 ? p1 : p2,
          targetId: p1 < p2 ? p2 : p1,
          strength: faker.number.int({ min: 3, max: 10 }),
          since: `${faker.number.int({ min: 2018, max: 2024 })}-${String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0')}`,
          source: source || faker.helpers.arrayElement(['work', 'university', 'event', 'linkedin']),
        });
      }
    };

    // Step A: Ring Lattice (K=4 neighbors per node)
    const nPeople = people.length;
    for (let i = 0; i < nPeople; i++) {
      for (let offset = 1; offset <= 2; offset++) {
        const neighborIdx = (i + offset) % nPeople;
        addEdge(people[i].id, people[neighborIdx].id, 'work');
      }
    }

    // Step B: 5 Super-Connector Hubs (18-25 connections each)
    const hubIndices = [0, 15, 45, 80, 120]; // 0 is root user
    for (const hubIdx of hubIndices) {
      const hubId = people[hubIdx].id;
      for (let k = 0; k < 20; k++) {
        const targetIdx = faker.number.int({ min: 0, max: nPeople - 1 });
        addEdge(hubId, people[targetIdx].id, 'work');
      }
    }

    // Step C: Random Shortcuts (Rewiring)
    while (knowsEdgesMap.size < 600) {
      const p1 = people[faker.number.int({ min: 0, max: nPeople - 1 })].id;
      const p2 = people[faker.number.int({ min: 0, max: nPeople - 1 })].id;
      addEdge(p1, p2, 'event');
    }

    const knowsEdges = Array.from(knowsEdgesMap.values()).slice(0, 600);

    await session.run(
      `UNWIND $knowsEdges AS e
       MATCH (p1:Person {id: e.sourceId})
       MATCH (p2:Person {id: e.targetId})
       CREATE (p1)-[:KNOWS {strength: e.strength, since: e.since, source: e.source}]->(p2)`,
      { knowsEdges }
    );

    // 6. Connect Secondary Relationships (WORKED_AT, HAS_SKILL, STUDIED_AT, LOCATED_IN)
    console.log('🔗 Connecting secondary relationships (WORKED_AT, HAS_SKILL, etc.)...');
    
    // WORKED_AT (200 relationships)
    const workedAt = [];
    for (let i = 0; i < 200; i++) {
      workedAt.push({
        personId: people[i % nPeople].id,
        companyId: companies[i % companies.length].id,
        role: faker.person.jobTitle(),
        isCurrent: i < 150,
      });
    }
    await session.run(
      `UNWIND $workedAt AS w
       MATCH (p:Person {id: w.personId})
       MATCH (c:Company {id: w.companyId})
       CREATE (p)-[:WORKED_AT {role: w.role, isCurrent: w.isCurrent}]->(c)`,
      { workedAt }
    );

    // HAS_SKILL (300 relationships)
    const hasSkill = [];
    for (let i = 0; i < 300; i++) {
      hasSkill.push({
        personId: people[i % nPeople].id,
        skillId: skills[i % skills.length].id,
        proficiency: faker.helpers.arrayElement(['expert', 'advanced', 'intermediate']),
      });
    }
    await session.run(
      `UNWIND $hasSkill AS hs
       MATCH (p:Person {id: hs.personId})
       MATCH (s:Skill {id: hs.skillId})
       CREATE (p)-[:HAS_SKILL {proficiency: hs.proficiency}]->(s)`,
      { hasSkill }
    );

    // STUDIED_AT (100 relationships)
    const studiedAt = Array.from({ length: 100 }, (_, i) => ({
      personId: people[i % nPeople].id,
      universityId: universities[i % universities.length].id,
      degree: faker.helpers.arrayElement(['B.Tech', 'B.S.', 'M.S.', 'Ph.D.', 'MBA']),
      field: faker.helpers.arrayElement(['Computer Science', 'Electrical Eng', 'Economics', 'Design']),
    }));
    await session.run(
      `UNWIND $studiedAt AS st
       MATCH (p:Person {id: st.personId})
       MATCH (u:University {id: st.universityId})
       CREATE (p)-[:STUDIED_AT {degree: st.degree, field: st.field}]->(u)`,
      { studiedAt }
    );

    // LOCATED_IN (100 relationships)
    const locatedIn = Array.from({ length: 100 }, (_, i) => ({
      personId: people[i % nPeople].id,
      locationId: locations[i % locations.length].id,
    }));
    await session.run(
      `UNWIND $locatedIn AS loc
       MATCH (p:Person {id: loc.personId})
       MATCH (l:Location {id: loc.locationId})
       CREATE (p)-[:LOCATED_IN]->(l)`,
      { locatedIn }
    );

    // IN_INDUSTRY (40 relationships)
    const inIndustry = companies.map((c, i) => ({
      companyId: c.id,
      industryId: industries[i % industries.length].id,
    }));
    await session.run(
      `UNWIND $inIndustry AS ind
       MATCH (c:Company {id: ind.companyId})
       MATCH (i:Industry {id: ind.industryId})
       CREATE (c)-[:IN_INDUSTRY]->(i)`,
      { inIndustry }
    );

    // ATTENDED (80 relationships)
    const attended = Array.from({ length: 80 }, (_, i) => ({
      personId: people[i % nPeople].id,
      eventId: events[i % events.length].id,
    }));
    await session.run(
      `UNWIND $attended AS att
       MATCH (p:Person {id: att.personId})
       MATCH (e:Event {id: att.eventId})
       CREATE (p)-[:ATTENDED]->(e)`,
      { attended }
    );

    // 7. Verify Summary Counts
    const nodeCountRes = await session.run('MATCH (n) RETURN count(n) AS totalNodes');
    const edgeCountRes = await session.run('MATCH ()-[r]->() RETURN count(r) AS totalEdges');

    const totalNodes = nodeCountRes.records[0].get('totalNodes');
    const totalEdges = edgeCountRes.records[0].get('totalEdges');

    console.log(`\n🎉 SEED COMPLETE PERFECTLY!`);
    console.log(`   Total Nodes Created: ${totalNodes}`);
    console.log(`   Total Edges Created: ${totalEdges}`);
    console.log(`   Root User ID: root-user-id\n`);

  } catch (err) {
    console.error('❌ Seeding Failed:', err);
    process.exit(1);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();
