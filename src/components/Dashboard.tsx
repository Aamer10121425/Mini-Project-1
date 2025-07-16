import React, { useEffect, useState } from 'react';
import AddFoodForm from './AddFoodForm';
import { FoodCard } from './FoodCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export interface FoodItem {
  id: string;
  name: string;
  expiryDate: string;
  category?: string;
  quantity?: number;
  unit?: string;
  location?: string;
  addedDate?: string;
}

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([]);

  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'foodItems'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FoodItem[];
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Food Dashboard</h1>
      <AddFoodForm onItemAdded={fetchItems} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
