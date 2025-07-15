import React from 'react';
import { AlertTriangle, Bell, X } from 'lucide-react';
import { FoodItem } from '../types/food';
import { getExpiryStatus } from '../utils/dateUtils';

interface NotificationBarProps {
  foodItems: FoodItem[];
  onClose: () => void;
  isVisible: boolean;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({ foodItems, onClose, isVisible }) => {
  const expiringItems = foodItems.filter(item => {
    const { status } = getExpiryStatus(item.expiryDate);
    return status === 'expiring';
  });

  const expiredItems = foodItems.filter(item => {
    const { status } = getExpiryStatus(item.expiryDate);
    return status === 'expired';
  });

  if (!isVisible || (expiringItems.length === 0 && expiredItems.length === 0)) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
        
        <div className="flex items-center gap-2 mb-3">
          <Bell className="text-amber-500" size={20} />
          <h3 className="font-semibold text-gray-800">Food Expiry Alerts</h3>
        </div>

        {expiredItems.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-500" size={16} />
              <span className="text-sm font-medium text-red-700">Expired Items</span>
            </div>
            <div className="space-y-1">
              {expiredItems.map(item => (
                <div key={item.id} className="text-sm text-gray-600">
                  {item.name} - {Math.abs(getExpiryStatus(item.expiryDate).daysLeft)} days ago
                </div>
              ))}
            </div>
          </div>
        )}

        {expiringItems.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-amber-500" size={16} />
              <span className="text-sm font-medium text-amber-700">Expiring Soon</span>
            </div>
            <div className="space-y-1">
              {expiringItems.map(item => (
                <div key={item.id} className="text-sm text-gray-600">
                  {item.name} - {getExpiryStatus(item.expiryDate).daysLeft} days left
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};