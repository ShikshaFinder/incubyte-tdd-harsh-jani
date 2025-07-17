// Jest setup file
process.env.JWT_SECRET = "test-secret";
process.env.DATABASE_URL || "postgresql://test:test@localhost:5432/test_db";

// Increase timeout for all tests
jest.setTimeout(30000);

// In-memory sweets store for mocking
const sweets: any[] = [];
let idCounter = 1;

// Mock Prisma client for tests
jest.mock("@/lib/prisma", () => ({
  prisma: {
    sweet: {
      findMany: jest.fn((args) => {
        let result = [...sweets];
        if (args?.where) {
          if (args.where.name) {
            result = result.filter((s) =>
              s.name
                .toLowerCase()
                .includes(args.where.name.contains.toLowerCase())
            );
          }
          if (args.where.category) {
            result = result.filter((s) =>
              s.category
                .toLowerCase()
                .includes(args.where.category.contains.toLowerCase())
            );
          }
          if (args.where.price) {
            if (args.where.price.gte !== undefined)
              result = result.filter((s) => s.price >= args.where.price.gte);
            if (args.where.price.lte !== undefined)
              result = result.filter((s) => s.price <= args.where.price.lte);
          }
        }
        if (args?.orderBy) {
          const [key, order] = Object.entries(args.orderBy)[0];
          result.sort((a, b) => {
            if (typeof a[key] === "string") {
              return order === "desc"
                ? b[key].localeCompare(a[key])
                : a[key].localeCompare(b[key]);
            } else {
              return order === "desc" ? b[key] - a[key] : a[key] - b[key];
            }
          });
        }
        return result;
      }),
      create: jest.fn(({ data }) => {
        const sweet = { ...data, id: idCounter++ };
        sweets.push(sweet);
        return sweet;
      }),
    },
  },
}));
