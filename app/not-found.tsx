import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center p-8">
      <h1 className="text-6xl font-bold text-pink-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="mb-6 text-pink-800">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <span className="inline-block px-6 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition">
          Go to Homepage
        </span>
      </Link>
    </div>
  );
}
