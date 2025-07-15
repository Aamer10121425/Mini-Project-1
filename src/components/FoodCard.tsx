import React, { useState } from 'react';
import { FoodItem } from '../types/food';

interface FoodCardProps {
  food: FoodItem;
  onDelete: (id: string) => void;
  onEdit: (updatedFood: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFood, setEditedFood] = useState<FoodItem>(food);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedFood(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editedFood);
    setIsEditing(false);
  };

  return (
    <div className="border rounded shadow p-4">
      {isEditing ? (
        <div className="space-y-2">
          <input
            className="border p-1 w-full"
            name="name"
            value={editedFood.name}
            onChange={handleChange}
          />
          <input
            className="border p-1 w-full"
            type="date"
            name="expiryDate"
            value={editedFood.expiryDate}
            onChange={handleChange}
          />
          <input
            className="border p-1 w-full"
            name="category"
            value={editedFood.category}
            onChange={handleChange}
          />
          <input
            className="border p-1 w-full"
            name="quantity"
            type="number"
            value={editedFood.quantity}
            onChange={handleChange}
          />
          <input
            className="border p-1 w-full"
            name="unit"
            value={editedFood.unit}
            onChange={handleChange}
          />
          <input
            className="border p-1 w-full"
            name="location"
            value={editedFood.location}
            onChange={handleChange}
          />
          <button
            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold">{food.name}</h2>
          <p>Expires on: {food.expiryDate}</p>
          <p>Category: {food.category}</p>
          <p>Quantity: {food.quantity} {food.unit}</p>
          <p>Location: {food.location}</p>
          <div className="mt-2 space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => onDelete(food.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
