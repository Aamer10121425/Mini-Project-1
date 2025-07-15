import React, { useEffect, useState } from 'react';
import AddFoodForm from './AddFoodForm';
import { FoodCard } from './FoodCard';
import { FoodItem } from '../types/food'; // ✅ Central type with id: string

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([]);

  // ✅ Fetch all food items from API
  const fetchItems = async () => {
    try {
      const res = await fetch('/api/food');
      const data: FoodItem[] = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  // ✅ Handle deletion locally
  const handleDelete = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    // Optional: call backend to delete from DB
  };

  // ✅ Handle editing locally
  const handleEdit = (updatedFood: FoodItem) => {
    const updatedItems = items.map(item =>
      item.id === updatedFood.id ? updatedFood : item
    );
    setItems(updatedItems);
    // Optional: call backend to update DB
  };

  // ✅ Load food items on first render
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Food Dashboard</h1>
      <AddFoodForm onItemAdded={fetchItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <FoodCard
            key={item.id}
            food={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
