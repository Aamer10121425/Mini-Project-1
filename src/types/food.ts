// src/types/food.ts
export interface FoodItem {
  id: string;               // ✅ Use string everywhere
  name: string;
  expiryDate: string;
  category?: string;
  quantity?: number;
  unit?: string;
  location?: string;
  addedDate?: string;
}


export interface ExpiryStatus {
  status: 'fresh' | 'expiring' | 'expired';
  daysLeft: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  prepTime: number;
  servings: number;
}