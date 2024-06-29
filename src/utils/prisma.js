import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

if (!global.prismaGlobal) {
  global.prismaGlobal = prismaClientSingleton();
}

const prisma = global.prismaGlobal;

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  global.prismaGlobal = prisma;
}