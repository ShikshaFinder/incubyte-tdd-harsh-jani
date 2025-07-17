// Jest setup file
process.env.JWT_SECRET = "test-secret";
process.env.DATABASE_URL || "postgresql://test:test@localhost:5432/test_db";

// Increase timeout for all tests
jest.setTimeout(30000);

let idCounter = 1;
const sweets: any[] = [];

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
      delete: jest.fn(({ where }) => {
        const idx = sweets.findIndex((s) => s.id === where.id);
        if (idx === -1) throw new Error("Not found");
        const [deleted] = sweets.splice(idx, 1);
        return deleted;
      }),
      findUnique: jest.fn().mockImplementation(({ where }) => {
        // Return null for non-existent IDs (like 99999)
        if (where.id === 99999) {
          return Promise.resolve(null);
        }
        return Promise.resolve({
          id: where.id || 1,
          name: "Test Sweet",
          category: "Test",
          price: 10,
          quantity: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }),
      update: jest.fn().mockImplementation(({ where, data }) => {
        // Return null for non-existent IDs (like 99999)
        if (where.id === 99999) {
          return Promise.resolve(null);
        }
        return Promise.resolve({
          id: where.id || 1,
          name: "Test Sweet",
          category: "Test",
          price: 10,
          quantity: data.quantity || 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }),
    },
  },
}));
