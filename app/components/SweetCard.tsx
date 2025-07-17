import React from "react";

type Sweet = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type SweetCardProps = {
  sweet: Sweet;
  onRestock: (id: number) => void;
  onPurchase: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function SweetCard({
  sweet,
  onRestock,
  onPurchase,
  onDelete,
}: SweetCardProps) {
  function handleRestock() {
    if (window.confirm(`Restock ${sweet.name}?`)) {
      onRestock(sweet.id);
    }
  }
  function handlePurchase() {
    if (window.confirm(`Purchase ${sweet.name}?`)) {
      onPurchase(sweet.id);
    }
  }
  function handleDelete() {
    if (window.confirm(`Delete ${sweet.name}?`)) {
      onDelete(sweet.id);
    }
  }
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-2 border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{sweet.name}</h2>
        <span className="text-xs text-gray-500">{sweet.category}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">
          Price: <b>${sweet.price.toFixed(2)}</b>
        </span>
        <span className="text-sm">
          Stock: <b>{sweet.quantity}</b>
        </span>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
          onClick={handleRestock}
        >
          Restock
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
          onClick={handlePurchase}
          disabled={sweet.quantity === 0}
        >
          Purchase
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
