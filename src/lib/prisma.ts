import { PrismaClient } from '@prisma/client'

// Standard Next.js dev-hot-reload guard — without this, every HMR reload
// would open a new PrismaClient/connection pool instead of reusing one.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
