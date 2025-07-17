"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SweetCard from "../components/SweetCard";
import SweetForm from "../components/SweetForm";

export default function SweetsPage() {
  const [sweets, setSweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const router = useRouter();

  async function fetchSweets(
    filters: {
      name?: string;
      category?: string;
      minPrice?: string;
      maxPrice?: string;
      sortBy?: string;
      sortOrder?: string;
    } = {}
  ) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filters.name) params.append("name", filters.name);
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
      const url = `/api/sweets${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch sweets");
      setSweets(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSweets();
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchSweets({
      name: searchName,
      category: searchCategory,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
    });
  }

  async function handleAddSweet(data: {
    name: string;
    category: string;
    price: number;
    quantity: number;
  }) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add sweet");
      await fetchSweets();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    setError("");
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch (e: any) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center gap-8">
      <div className="flex w-full max-w-5xl justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">Sweet Shop Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 font-semibold"
          disabled={loading}
        >
          Logout
        </button>
      </div>
      <SweetForm onSubmit={handleAddSweet} loading={loading} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {loading && <div className="text-blue-500 text-sm">Loading...</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mt-6">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            onRestock={() => {}}
            onPurchase={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
