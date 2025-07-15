import React from 'react';
import { Package, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { FoodItem } from '../types/food';
import { getExpiryStatus } from '../utils/dateUtils';

interface DashboardProps {
  foodItems: FoodItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({ foodItems }) => {
  const totalItems = foodItems.length;
  const freshItems = foodItems.filter(item => getExpiryStatus(item.expiryDate).status === 'fresh').length;
  const expiringItems = foodItems.filter(item => getExpiryStatus(item.expiryDate).status === 'expiring').length;
  const expiredItems = foodItems.filter(item => getExpiryStatus(item.expiryDate).status === 'expired').length;

  const stats = [
    {
      title: 'Total Items',
      value: totalItems,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Fresh Items',
      value: freshItems,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Expiring Soon',
      value: expiringItems,
      icon: AlertTriangle,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    },
    {
      title: 'Expired',
      value: expiredItems,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  const categoryBreakdown = foodItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`p-3 ${stat.color} rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      {Object.keys(categoryBreakdown).length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-blue-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">Category Breakdown</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(categoryBreakdown).map(([category, count]) => (
              <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">{category}</p>
                <p className="text-lg font-bold text-gray-800">{count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};