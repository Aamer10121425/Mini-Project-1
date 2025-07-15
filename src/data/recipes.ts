import { Recipe } from '../types/food';

export const recipeDatabase: Recipe[] = [
  {
    id: '1',
    name: 'Quick Banana Bread',
    ingredients: ['bananas', 'flour', 'sugar', 'eggs', 'butter'],
    instructions: 'Mix ingredients, bake at 350°F for 60 minutes',
    prepTime: 15,
    servings: 8
  },
  {
    id: '2',
    name: 'Apple Cinnamon Oatmeal',
    ingredients: ['apples', 'oats', 'cinnamon', 'milk'],
    instructions: 'Cook oats with milk, add diced apples and cinnamon',
    prepTime: 10,
    servings: 2
  },
  {
    id: '3',
    name: 'Tomato Basil Pasta',
    ingredients: ['tomatoes', 'pasta', 'basil', 'garlic', 'olive oil'],
    instructions: 'Cook pasta, sauté garlic, add tomatoes and basil',
    prepTime: 20,
    servings: 4
  },
  {
    id: '4',
    name: 'Milk Smoothie Bowl',
    ingredients: ['milk', 'bananas', 'berries', 'honey'],
    instructions: 'Blend ingredients, top with fresh fruits',
    prepTime: 5,
    servings: 1
  },
  {
    id: '5',
    name: 'Cheese Quesadilla',
    ingredients: ['cheese', 'tortillas', 'onions', 'peppers'],
    instructions: 'Layer cheese in tortilla, cook until melted',
    prepTime: 10,
    servings: 2
  },
  {
    id: '6',
    name: 'Vegetable Stir Fry',
    ingredients: ['vegetables', 'soy sauce', 'garlic', 'ginger', 'oil'],
    instructions: 'Heat oil, stir fry vegetables with seasonings',
    prepTime: 15,
    servings: 3
  },
  {
    id: '7',
    name: 'Bread Pudding',
    ingredients: ['bread', 'milk', 'eggs', 'sugar', 'vanilla'],
    instructions: 'Mix ingredients, bake at 325°F for 45 minutes',
    prepTime: 20,
    servings: 6
  },
  {
    id: '8',
    name: 'Chicken Salad',
    ingredients: ['chicken', 'lettuce', 'mayonnaise', 'celery'],
    instructions: 'Mix cooked chicken with vegetables and dressing',
    prepTime: 15,
    servings: 4
  }
];

export const getRecipeSuggestions = (foodNames: string[]): Recipe[] => {
  const suggestions: Recipe[] = [];
  
  foodNames.forEach(foodName => {
    const matchingRecipes = recipeDatabase.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(foodName.toLowerCase()) ||
        foodName.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
    
    matchingRecipes.forEach(recipe => {
      if (!suggestions.find(s => s.id === recipe.id)) {
        suggestions.push(recipe);
      }
    });
  });
  
  return suggestions.slice(0, 3);
};