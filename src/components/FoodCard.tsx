import React, { useState } from 'react';
import { FoodItem } from '../types/food';
import { getExpiryStatus } from '../utils/getExpiryStatus';

interface FoodCardProps {
  food: FoodItem;
  onDelete: (id: string) => void;
  onEdit: (updatedFood: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onDelete, onEdit }) => {
  const { status, daysLeft } = getExpiryStatus(food.expiryDate);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFood, setEditedFood] = useState<FoodItem>(food);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedFood({ ...editedFood, [name]: value });
  };

  const handleSave = () => {
    onEdit(editedFood);
    setIsEditing(false);
  };

  return (
    <div className="border rounded p-4 shadow space-y-2">
      {isEditing ? (
        <>
          <input
            name="name"
            value={editedFood.name}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
          <input
            name="expiryDate"
            type="date"
            value={editedFood.expiryDate}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
          <input
            name="category"
            value={editedFood.category || ''}
            onChange={handleChange}
            placeholder="Category"
            className="border p-1 rounded w-full"
          />
          <input
            name="quantity"
            type="number"
            value={editedFood.quantity || 1}
            onChange={handleChange}
            placeholder="Quantity"
            className="border p-1 rounded w-full"
          />
          <input
            name="unit"
            value={editedFood.unit || ''}
            onChange={handleChange}
            placeholder="Unit"
            className="border p-1 rounded w-full"
          />
          <input
            name="location"
            value={editedFood.location || ''}
            onChange={handleChange}
            placeholder="Location"
            className="border p-1 rounded w-full"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold">{food.name}</h2>
          <p className="text-sm text-gray-600">Expires: {food.expiryDate}</p>
          <p className={`text-sm ${status === 'Expired' ? 'text-red-500' : 'text-green-600'}`}>
            {status} ({daysLeft} days left)
          </p>
          <p>Category: {food.category}</p>
          <p>Quantity: {food.quantity} {food.unit}</p>
          <p>Location: {food.location}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => onDelete(food.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};
