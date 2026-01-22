import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../../../modules/user/entities/user.entity';

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  console.log('Seeding users...');

  // Check if admin exists
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@seed28.com' },
  });

  if (existingAdmin) {
    console.log('  ℹ Admin user already exists, skipping...');
    return;
  }

  // Create admin
  const hashedPassword = await bcrypt.hash('seed28', 10);
  const admin = userRepository.create({
    email: 'admin@seed28.com',
    password: hashedPassword,
    firstName: 'Admin',
    lastName: 'Seed28',
  });

  await userRepository.save(admin);
  console.log('  ✓ Admin user created (admin@seed28.com / seed28)');
}
