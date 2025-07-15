export interface FoodItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  location: string;
  addedDate: string;
  notes?: string;
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