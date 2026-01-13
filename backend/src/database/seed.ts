import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { User, UserRole } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import dataSource from './data-source';

config();

async function seed() {
  const connection = await dataSource.initialize();

  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await connection.getRepository(Project).clear();
    await connection.getRepository(User).clear();

    // Seed users
    const userRepository = connection.getRepository(User);
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedUserPassword = await bcrypt.hash('user123', 10);

    const adminUser = userRepository.create({
      email: 'admin@example.com',
      password: hashedAdminPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
    });

    const regularUser = userRepository.create({
      email: 'user@example.com',
      password: hashedUserPassword,
      name: 'Regular User',
      role: UserRole.USER,
    });

    await userRepository.save([adminUser, regularUser]);
    console.log('✓ Users seeded');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await connection.destroy();
  }
}

seed()
  .then(() => {
    console.log('Seeding process finished.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding process failed:', error);
    process.exit(1);
  });

