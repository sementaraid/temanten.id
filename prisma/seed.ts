import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from './generated/client';
import bcrypt from 'bcrypt';

const DATABASE_URL = process.env.DATABASE_URL
if(!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const adapter = new PrismaLibSql({
  url: DATABASE_URL
});

const prisma = new PrismaClient({
  adapter
});

async function main() {
  try {
    // Delete existing admin user if exists
    await prisma.user.deleteMany({
      where: {
        email: 'hs1998281@gmail.com',
      },
    });

    // Hash password (password, saltRounds)
    const hashedPassword = await bcrypt.hash('b9258cdc-e7d2-4f19-a3b9-82914d7b6ea0', 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'hs1998281@gmail.com',
        phone: '081367200856',
        whatsapp: '081367200856',
        role: 'admin',
        password: hashedPassword,
      },
    });

    console.log('✅ Admin user created successfully');
    console.log('Email:', admin.email);
    console.log('Password: b9258cdc-e7d2-4f19-a3b9-82914d7b6ea0');
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();