import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-pink-50 to-purple-100 relative overflow-x-hidden">
      {/* Decorative background pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-purple-100 to-transparent" />
      <main className="flex flex-col gap-[40px] row-start-2 items-center sm:items-start text-center sm:text-left z-10 w-full max-w-5xl">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h1 className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent drop-shadow-md tracking-tight">
            Sweet Shop
          </h1>
          <h2 className="text-2xl sm:text-3xl text-gray-700 font-semibold tracking-wide">
            Management System
          </h2>
        </div>

        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed font-medium">
          A full-stack management system for sweet shops built with{" "}
          <span className="font-semibold text-pink-700">Next.js 14+</span>,
          <span className="font-semibold text-purple-700"> Tailwind CSS</span>,{" "}
          <span className="font-semibold text-pink-700">
            Prisma (PostgreSQL)
          </span>
          , and secure authentication.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/login"
            className="rounded-full border border-solid border-transparent transition-all flex items-center justify-center bg-gradient-to-r from-pink-600 to-purple-600 text-white gap-2 hover:from-pink-700 hover:to-purple-700 font-semibold text-base sm:text-lg h-14 px-8 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            🍬 Login to Dashboard
          </Link>
          <a
            className="rounded-full border border-solid border-gray-300 transition-all flex items-center justify-center hover:bg-gray-100 font-semibold text-base sm:text-lg h-14 px-8 text-gray-700 shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
            href="https://github.com/yourusername/sweet-shop-management"
            target="_blank"
            rel="noopener noreferrer"
          >
            📖 View Source
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 w-full max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
            <h3 className="font-bold text-xl mb-3 text-pink-700 flex items-center gap-2">
              🍭 Manage Sweets
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Add, restock, and track inventory of your sweet collection.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
            <h3 className="font-bold text-xl mb-3 text-purple-700 flex items-center gap-2">
              🔐 Secure Access
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Single-user authentication with bcrypt and JWT tokens.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
            <h3 className="font-bold text-xl mb-3 text-pink-700 flex items-center gap-2">
              📊 Real-time Updates
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Instant updates and modern UI with Tailwind CSS.
            </p>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-gray-500 z-10 text-base font-medium mt-8 border-t border-gray-200 pt-4 w-full max-w-4xl">
        <span>
          Built with{" "}
          <span className="text-pink-700 font-semibold">Next.js 14+</span> &{" "}
          <span className="text-purple-700 font-semibold">Prisma</span>
        </span>
        <span>•</span>
        <span>
          <span className="text-purple-700 font-semibold">PostgreSQL</span>{" "}
          Database
        </span>
        <span>•</span>
        <span>
          <span className="text-pink-700 font-semibold">Tailwind CSS</span>
        </span>
      </footer>
    </div>
  );
}
