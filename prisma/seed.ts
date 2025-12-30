import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from './generated/client';
import bcrypt from 'bcrypt';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaLibSql({ url: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seedUser(name: string, email: string, password: string, role: 'admin' | 'user', phone: string) {
  await prisma.user.deleteMany({ where: { email } });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role, phone, whatsapp: phone },
  });
  
  console.log(`✅ ${role.toUpperCase()} created: ${email}`);
  console.log(`   Password: ${password}\n`);
  return user;
}

async function main() {
  try {
    await seedUser('Herlina Sunaryanto', 'hs1998281@gmail.com', 'b9258cdc-e7d2-4f19-a3b9-82914d7b6ea0', 'admin', '081367200856');
    await seedUser('Tri Marta Putri Hardiyanti', 'trimarta27@gmail.com', 'd2000ffb-89bd-4f81-ad29-a2dc9ce20720', 'user', '081234567890');
  } catch (error) {
    console.error('❌ Error seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();