import React, { useEffect, useState } from 'react';
import AddFoodForm from './AddFoodForm';
import { FoodCard } from './FoodCard';
import { FoodItem } from '../types/food';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

const Dashboard: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([]);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'foodItems'));
    const data = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as FoodItem[];
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'foodItems', id));
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handleEdit = async (updatedItem: FoodItem) => {
  const { id, ...dataToUpdate } = updatedItem; // ✅ remove `id` field
  const itemRef = doc(db, 'foodItems', id);
  await updateDoc(itemRef, dataToUpdate); // ✅ update only Firestore-safe fields

  setItems((prev) =>
    prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  );
};

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

