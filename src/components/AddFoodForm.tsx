import React, { useState } from 'react';

interface AddFoodFormProps {
  onItemAdded?: () => void; // optional prop from parent
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !expiryDate) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch('/api/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, expiryDate })
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Item added:', data);
        setName('');
        setExpiryDate('');
        onItemAdded?.(); // trigger refresh in Dashboard
      } else {
        console.error('Failed to add item');
      }
    } catch (err) {
      console.error('Error adding food:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Food name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddFoodForm;
