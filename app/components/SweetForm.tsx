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
      className="bg-white rounded shadow p-4 flex flex-col gap-3 border border-gray-200 w-full max-w-md"
    >
      <h2 className="text-lg font-bold mb-2">Add New Sweet</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="border rounded px-3 py-2"
        min={0}
        step={0.01}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border rounded px-3 py-2"
        min={0}
        required
      />
      <button
        type="submit"
        className="bg-purple-600 text-white rounded py-2 font-semibold hover:bg-purple-700 mt-2"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Sweet"}
      </button>
    </form>
  );
}
