import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
      isVerified: true,
    },
  },
});

export default prisma;
