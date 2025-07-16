import React, { useState } from 'react';

interface AddFoodFormProps {
  onItemAdded?: () => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !expiryDate) {
      alert('Please fill in the required fields.');
      return;
    }

    const newItem = {
      name,
      expiryDate,
      category,
      quantity,
      unit,
      location,
      addedDate: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Item added:', data);
        setName('');
        setExpiryDate('');
        setCategory('');
        setQuantity(1);
        setUnit('');
        setLocation('');
        onItemAdded?.();
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
        required
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Unit (e.g., kg, L)"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Location (e.g., Fridge)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
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

