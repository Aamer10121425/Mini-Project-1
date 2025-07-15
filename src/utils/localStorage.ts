import { FoodItem } from '../types/food';

const STORAGE_KEY = 'food-expiry-tracker-items';

export const loadFoodItems = (): FoodItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading food items:', error);
    return [];
  }
};

export const saveFoodItems = (items: FoodItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving food items:', error);
  }
};

export const addFoodItem = (item: FoodItem): void => {
  const items = loadFoodItems();
  items.push(item);
  saveFoodItems(items);
};

export const deleteFoodItem = (id: string): void => {
  const items = loadFoodItems();
  const filtered = items.filter(item => item.id !== id);
  saveFoodItems(filtered);
};

export const updateFoodItem = (updatedItem: FoodItem): void => {
  const items = loadFoodItems();
  const index = items.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    items[index] = updatedItem;
    saveFoodItems(items);
  }
};