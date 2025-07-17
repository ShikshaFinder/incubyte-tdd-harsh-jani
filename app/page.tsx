import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Sweet Shop
          </h1>
          <h2 className="text-xl sm:text-2xl text-gray-600 font-medium">
            Management System
          </h2>
        </div>

        <p className="text-lg text-gray-700 max-w-2xl">
          A full-stack management system for sweet shops built with Next.js 14+,
          Tailwind CSS, Prisma (PostgreSQL), and secure authentication.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/login"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-pink-600 to-purple-600 text-white gap-2 hover:from-pink-700 hover:to-purple-700 font-medium text-sm sm:text-base h-12 px-6 sm:px-8"
          >
            🍬 Login to Dashboard
          </Link>
          <a
            className="rounded-full border border-solid border-gray-300 transition-colors flex items-center justify-center hover:bg-gray-50 font-medium text-sm sm:text-base h-12 px-6 sm:px-8 text-gray-700"
            href="https://github.com/yourusername/sweet-shop-management"
            target="_blank"
            rel="noopener noreferrer"
          >
            📖 View Source
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">🍭 Manage Sweets</h3>
            <p className="text-gray-600 text-sm">
              Add, restock, and track inventory of your sweet collection.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">🔐 Secure Access</h3>
            <p className="text-gray-600 text-sm">
              Single-user authentication with bcrypt and JWT tokens.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">📊 Real-time Updates</h3>
            <p className="text-gray-600 text-sm">
              Instant updates and modern UI with Tailwind CSS.
            </p>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-gray-500">
        <span>Built with Next.js 14+ & Prisma</span>
        <span>•</span>
        <span>PostgreSQL Database</span>
        <span>•</span>
        <span>Tailwind CSS</span>
      </footer>
    </div>
  );
}
