import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  change,
  onClick
}) => {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm p-6 transition-all duration-200
        ${onClick ? 'cursor-pointer hover:shadow-md hover:translate-y-[-2px]' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span 
                className={`text-xs font-medium ${
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      
      {onClick && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end text-blue-600 text-sm font-medium">
          <span>View details</span>
          <ArrowUpRight size={16} className="ml-1" />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;