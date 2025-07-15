import React from 'react';
import { Calendar, MapPin, Package, Trash2, Edit3 } from 'lucide-react';
import { FoodItem } from '../types/food';
import { getExpiryStatus, formatDate } from '../utils/dateUtils';

interface FoodCardProps {
  food: FoodItem;
  onDelete: (id: string) => void;
  onEdit: (food: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onDelete, onEdit }) => {
  const { status, daysLeft } = getExpiryStatus(food.expiryDate);

  const getStatusColor = () => {
    switch (status) {
      case 'expired':
        return 'bg-red-50 border-red-200';
      case 'expiring':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'expired':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>;
      case 'expiring':
        return <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">Expiring Soon</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Fresh</span>;
    }
  };

  const getDaysText = () => {
    if (status === 'expired') {
      return `Expired ${Math.abs(daysLeft)} days ago`;
    } else if (status === 'expiring') {
      return `${daysLeft} days left`;
    } else {
      return `${daysLeft} days left`;
    }
  };

  return (
    <div className={`p-4 rounded-xl border-2 ${getStatusColor()} transition-all duration-200 hover:shadow-lg group`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg">{food.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">{food.category}</span>
            {getStatusBadge()}
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(food)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(food.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>Expires: {formatDate(food.expiryDate)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package size={14} />
          <span>{food.quantity} {food.unit}</span>
        </div>

        {food.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={14} />
            <span>{food.location}</span>
          </div>
        )}

        <div className="pt-2 border-t border-gray-200">
          <span className={`text-sm font-medium ${
            status === 'expired' ? 'text-red-600' : 
            status === 'expiring' ? 'text-amber-600' : 
            'text-green-600'
          }`}>
            {getDaysText()}
          </span>
        </div>

        {food.notes && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-500 italic">{food.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};