import React, { useState, useEffect } from 'react';
import { Apple, Plus, Bell, X } from 'lucide-react';
import { FoodItem } from './types/food';
import { loadFoodItems, saveFoodItems } from './utils/localStorage';
import { getExpiryStatus } from './utils/dateUtils';
import { FoodCard } from './components/FoodCard';
import { AddFoodForm } from './components/AddFoodForm';
import { NotificationBar } from './components/NotificationBar';
import { RecipeSuggestions } from './components/RecipeSuggestions';
import { Dashboard } from './components/Dashboard';
import { SearchAndFilter } from './components/SearchAndFilter';

function App() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    const items = loadFoodItems();
    setFoodItems(items);
  }, []);

  const handleAddFood = (newFood: FoodItem) => {
    const updatedItems = [...foodItems, newFood];
    setFoodItems(updatedItems);
    saveFoodItems(updatedItems);
  };

  const handleDeleteFood = (id: string) => {
    const updatedItems = foodItems.filter(item => item.id !== id);
    setFoodItems(updatedItems);
    saveFoodItems(updatedItems);
  };

  const handleEditFood = (editedFood: FoodItem) => {
    // For now, we'll just log the edit action
    console.log('Edit food:', editedFood);
  };

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const itemStatus = getExpiryStatus(item.expiryDate).status;
    const matchesStatus = selectedStatus === 'All' || 
      (selectedStatus === 'Fresh' && itemStatus === 'fresh') ||
      (selectedStatus === 'Expiring Soon' && itemStatus === 'expiring') ||
      (selectedStatus === 'Expired' && itemStatus === 'expired');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const hasNotifications = foodItems.some(item => {
    const { status } = getExpiryStatus(item.expiryDate);
    return status === 'expiring' || status === 'expired';
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Apple className="text-emerald-600" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">FoodGuard</h1>
                <p className="text-sm text-gray-600">Smart Food Expiry Tracker</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasNotifications && (
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              )}
              
              <button
                onClick={() => setIsAddFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus size={20} />
                Add Food
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Dashboard */}
          <Dashboard foodItems={foodItems} />

          {/* Recipe Suggestions */}
          <RecipeSuggestions foodItems={foodItems} />

          {/* Search and Filter */}
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          {/* Food Items Grid */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Food Items ({filteredItems.length})
              </h2>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
                  <Apple className="text-gray-400" size={48} />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {foodItems.length === 0 ? 'No food items yet' : 'No items match your filters'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {foodItems.length === 0 
                    ? 'Start by adding your first food item to track its expiry date'
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
                {foodItems.length === 0 && (
                  <button
                    onClick={() => setIsAddFormOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors mx-auto"
                  >
                    <Plus size={20} />
                    Add Your First Food Item
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(food => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onDelete={handleDeleteFood}
                    onEdit={handleEditFood}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Food Form Modal */}
      <AddFoodForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddFood={handleAddFood}
      />

      {/* Notification Bar */}
      <NotificationBar
        foodItems={foodItems}
        isVisible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}

export default App;