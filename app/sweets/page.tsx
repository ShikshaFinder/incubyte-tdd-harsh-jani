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

  async function handleRestock(id: number) {
    const amount = prompt("Restock amount?", "5");
    if (!amount) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/sweets/${id}/restock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: Number(amount) }),
      });
      if (!res.ok) throw new Error("Failed to restock");
      await fetchSweets();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePurchase(id: number) {
    const amount = prompt("Purchase amount?", "1");
    if (!amount) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/sweets/${id}/purchase`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: Number(amount) }),
      });
      if (!res.ok) throw new Error("Failed to purchase");
      await fetchSweets();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteSweet(id: number) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/sweets/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete sweet");
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
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row flex-wrap gap-2 w-full max-w-5xl items-end bg-white p-4 rounded shadow border border-gray-200 mb-2"
      >
        <input
          type="text"
          placeholder="Search Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border rounded px-2 py-1 flex-1 min-w-0"
        />
        <input
          type="text"
          placeholder="Search Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border rounded px-2 py-1 flex-1 min-w-0"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded px-2 py-1 w-full sm:w-auto"
          min={0}
          step={0.01}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded px-2 py-1 w-full sm:w-auto"
          min={0}
          step={0.01}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1 w-full sm:w-auto"
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-2 py-1 w-full sm:w-auto"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold w-full sm:w-auto"
          disabled={loading}
        >
          Search
        </button>
      </form>
      <SweetForm onSubmit={handleAddSweet} loading={loading} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {loading && <div className="text-blue-500 text-sm">Loading...</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mt-6">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            onRestock={handleRestock}
            onPurchase={handlePurchase}
            onDelete={handleDeleteSweet}
          />
        ))}
      </div>
    </div>
  );
}
