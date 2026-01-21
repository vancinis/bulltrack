import 'dotenv/config';
import dataSource from '../../../../orm.config';
import { seedBulls } from './bull.seed';
import { seedUsers } from './user.seed';

async function runSeeds() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Initialize database connection
    await dataSource.initialize();
    console.log('✓ Database connection established\n');

    // Run seeders in order
    await seedUsers(dataSource);
    console.log('');
    await seedBulls(dataSource);

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    // Ensure database connection is closed
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

runSeeds();
