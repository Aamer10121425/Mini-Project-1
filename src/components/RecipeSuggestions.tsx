import React from 'react';
import { ChefHat, Clock, Users, Lightbulb } from 'lucide-react';
import { FoodItem } from '../types/food';
import { getRecipeSuggestions } from '../data/recipes';
import { isExpiringSoon } from '../utils/dateUtils';

interface RecipeSuggestionsProps {
  foodItems: FoodItem[];
}

export const RecipeSuggestions: React.FC<RecipeSuggestionsProps> = ({ foodItems }) => {
  const expiringFoods = foodItems.filter(item => isExpiringSoon(item.expiryDate));
  const foodNames = expiringFoods.map(item => item.name);
  const suggestions = getRecipeSuggestions(foodNames);

  if (suggestions.length === 0 || expiringFoods.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Lightbulb className="text-orange-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Recipe Suggestions</h2>
          <p className="text-sm text-gray-600">Use up your expiring ingredients</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Based on your expiring items:</p>
        <div className="flex flex-wrap gap-2">
          {expiringFoods.map(food => (
            <span key={food.id} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {food.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {suggestions.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <ChefHat className="text-emerald-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{recipe.prepTime}m</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{recipe.servings}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Ingredients:</p>
                <p className="text-sm text-gray-600">{recipe.ingredients.join(', ')}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Instructions:</p>
                <p className="text-sm text-gray-600">{recipe.instructions}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};