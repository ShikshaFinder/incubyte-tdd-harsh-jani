import React, { useState } from "react";

type SweetFormProps = {
  onSubmit: (data: {
    name: string;
    category: string;
    price: number;
    quantity: number;
  }) => void;
  loading?: boolean;
};

export default function SweetForm({ onSubmit, loading }: SweetFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, category, price, quantity });
    setName("");
    setCategory("");
    setPrice(0);
    setQuantity(0);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-10 flex flex-col gap-8 border border-gray-200 w-full max-w-2xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
        Add New Sweet
      </h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <label
            htmlFor="name"
            className="w-full sm:w-32 sm:text-right font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Ladoo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <label
            htmlFor="category"
            className="w-full sm:w-32 sm:text-right font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="NUT based">NUT based</option>
            <option value="milk based">milk based</option>
            <option value="vegetable based (vegan)">
              vegetable based (vegan)
            </option>
            <option value="premium">premium</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <label
            htmlFor="price"
            className="w-full sm:w-32 sm:text-right font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            placeholder="e.g. 10.00"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="flex-1 border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            min={0}
            step={0.01}
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <label
            htmlFor="quantity"
            className="w-full sm:w-32 sm:text-right font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            placeholder="e.g. 50"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="flex-1 border rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            min={0}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white rounded-lg py-3 px-8 font-semibold hover:bg-purple-700 text-lg shadow mt-4 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Sweet"}
      </button>
    </form>
  );
}
