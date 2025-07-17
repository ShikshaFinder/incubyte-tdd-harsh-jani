# Sweet Shop Management System

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🚀 Live Demo
[Try the Sweet Shop Management System](https://incubyte-tdd-harsh-jani-3kuy.vercel.app/)

---

## 📋 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Default Credentials](#default-credentials)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

---

## Features
- **Add Sweets**: Create new sweet entries with name, category, price, and quantity
- **Purchase Management**: Track and process sweet purchases with stock validation
- **Restock Operations**: Easily restock inventory with custom quantities
- **Delete Functionality**: Remove sweets from inventory when needed
- **Advanced Search**: Filter sweets by name, category, and price range
- **Sorting Options**: Sort by name, category, price, or quantity (ascending/descending)
- **Secure Authentication**: Single-user login with bcrypt and JWT tokens
- **Protected API Routes**: All endpoints require authentication
- **Test-Driven Development**: Comprehensive testing with Jest + Supertest
- **Modern UI**: Responsive design with Tailwind CSS

## Technologies Used

### **Next.js 14+**
- Server-side rendering for better SEO and performance
- API routes for backend functionality
- Built-in TypeScript support
- Optimized development experience

### **Tailwind CSS**
- Utility-first CSS framework for rapid UI development
- Responsive design out of the box
- Customizable design system
- Reduced CSS bundle size

### **Prisma (ORM)**
- Type-safe database queries
- Auto-generated TypeScript types
- Database migrations and schema management
- Connection pooling and query optimization
- Support for multiple databases (PostgreSQL, MySQL, SQLite)

### **Neon Database (PostgreSQL)**
- Serverless PostgreSQL with automatic scaling
- Built-in connection pooling
- Global distribution for low latency
- Automatic backups and point-in-time recovery

### **Jest & Supertest**
- Comprehensive testing framework
- API endpoint testing
- Mocking and assertion utilities
- Coverage reporting

### **JWT Authentication**
- Stateless authentication
- Secure token-based sessions
- Cookie-based token storage

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShikshaFinder/incubyte-tdd-harsh-jani.git
   cd incubyte-tdd-harsh-jani
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   - Create a `.env` file in the root directory
   - Add the following content:
   ```env
   DATABASE_URL='postgresql://neondb_owner:npg_f5QLkhpe2uAE@ep-silent-heart-a7kgwlte-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
   JWT_SECRET="your-super-secret-jwt-key-here"
   ```

4. **Push the schema to your database:**
   ```bash
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Run tests:**
   ```bash
   npm test
   ```

7. **Run tests with coverage:**
   ```bash
   npx jest --coverage
   ```

## Default Credentials
- **Email:** `admin@test.com`
- **Password:** `testpassword`

## Usage
- Visit [`/login`](#) to sign in.
- After login, access [`/sweets`](#) to manage sweets.
- Add, restock, and purchase sweets from the dashboard.
- Use the logout button to securely sign out.

## API Endpoints
- `POST /api/auth/login` — Login (email, password)
- `POST /api/auth/logout` — Logout (clears cookie)
- `GET /api/sweets` — List sweets (auth required)
- `POST /api/sweets` — Add sweet (auth required)
- `PATCH /api/sweets/[id]/restock` — Restock sweet (auth required)
- `PATCH /api/sweets/[id]/purchase` — Purchase sweet (auth required)

## Screenshots

### Dashboard
![Dashboard Screenshot](public/dashboard.jpg)

### Test Coverage
![Test Coverage](public/coverage.png)

### Test Results
![Test Results](public/test.png)


## Contact
- **Email:** janiharsh794@gmail.com
- **Phone:** +91 7984140706

For questions please contact 7984140706.

## License
MIT
