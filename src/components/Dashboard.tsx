import React, { useEffect, useState } from 'react';
import AddFoodForm from './AddFoodForm';
import { FoodCard } from './FoodCard';
import { FoodItem } from '../types/food'; // ✅ Central type with id: string

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([]);

  // ✅ Fetch all food items from Firebase API
  const fetchItems = async () => {
    try {
      const res = await fetch('/api/food');
      const data: FoodItem[] = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  // ✅ Delete from backend AND update UI
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/food/${id}`, {
        method: 'DELETE',
      });

      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  // ✅ Update backend AND update UI
  const handleEdit = async (updatedFood: FoodItem) => {
    try {
      await fetch(`/api/food/${updatedFood.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFood),
      });

      const updatedItems = items.map(item =>
        item.id === updatedFood.id ? updatedFood : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  // ✅ Load items on first render
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
