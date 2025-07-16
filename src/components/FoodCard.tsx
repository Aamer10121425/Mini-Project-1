import React, { useState } from 'react';
import { getExpiryStatus } from '../utils/getExpiryStatus'; // or wherever it's defined
import { FoodItem } from '../types/food';

export interface FoodCardProps {
  food: FoodItem;
  onDelete: (id: string) => void;
  onEdit: (updatedFood: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onDelete, onEdit }) => {
  const { status, daysLeft } = getExpiryStatus(food.expiryDate);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...food });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-2">
      <h2 className="text-lg font-semibold">{food.name}</h2>
      <p>Expires in: {daysLeft} days ({status})</p>
      <p>Quantity: {food.quantity} {food.unit}</p>
      <p>Category: {food.category}</p>
      <p>Location: {food.location}</p>

      <div className="flex gap-2 mt-2">
        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:underline">
          Edit
        </button>
        <button onClick={() => onDelete(food.id)} className="text-red-500 hover:underline">
          Delete
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow space-y-3 w-80">
            <h3 className="text-xl font-bold">Edit Food</h3>

            <input
              name="name"
              value={editData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="expiryDate"
              value={editData.expiryDate}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="quantity"
              value={editData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              type="number"
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="unit"
              value={editData.unit}
              onChange={handleChange}
              placeholder="Unit"
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="category"
              value={editData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border px-2 py-1 rounded"
            />
            <input
              name="location"
              value={editData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border px-2 py-1 rounded"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsEditing(false)} className="text-gray-500">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-3 py-1 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
