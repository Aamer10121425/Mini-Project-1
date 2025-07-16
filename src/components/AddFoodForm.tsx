import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
      await addDoc(collection(db, 'foodItems'), newItem);
      setName('');
      setExpiryDate('');
      setCategory('');
      setQuantity(1);
      setUnit('');
      setLocation('');
      onItemAdded?.();
    } catch (err) {
      console.error('Error adding food:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" required />
      <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="border p-2 rounded w-full" required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded w-full" />
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="border p-2 rounded w-full" />
      <input type="text" placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="border p-2 rounded w-full" />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Item</button>
    </form>
  );
};

export default AddFoodForm;