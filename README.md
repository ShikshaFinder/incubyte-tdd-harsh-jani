# Sweet Shop Management System

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🚀 Live Demo
[Try the Sweet Shop Management System](https://incubyte-tdd-harsh-jani-3kuy.vercel.app/sweets)

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
- Add, restock, and purchase sweets
- Secure single-user login (server-side, bcrypt, JWT cookie)
- Protected API routes
- TDD with Jest + Supertest
- Modern UI with Tailwind CSS

## Technologies Used
- **Next.js 14+**
- **Tailwind CSS**
- **Prisma** (PostgreSQL)
- **Jest** & **Supertest** (TDD)
- **JWT** (Authentication)
- **TypeScript**

## Setup

1. **Clone the repo and install dependencies:**
   ```bash
   npm install
   ```
2. **Configure your database:**
   - Create a `.env` file in the root:
     ```env
     DATABASE_URL="postgresql://username:password@localhost:5432/sweet_shop_db"
     JWT_SECRET="your-super-secret-jwt-key-here"
     ```
   - Replace with your actual PostgreSQL credentials.
3. **Push the schema to your database:**
   ```bash
   npx prisma db push
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Run tests:**
   ```bash
   npm test
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
_Add screenshots of the login page and dashboard here._

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## Contact
For questions or support, please open an issue or contact the maintainer at [your-email@example.com].

## License
MIT
