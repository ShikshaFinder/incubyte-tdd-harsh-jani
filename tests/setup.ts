// Jest setup file
process.env.JWT_SECRET = "test-secret";
process.env.DATABASE_URL || "postgresql://test:test@localhost:5432/test_db";

// Increase timeout for all tests
jest.setTimeout(30000);

// Mock Prisma client for tests
jest.mock("@/lib/prisma", () => ({
  prisma: {},
}));
