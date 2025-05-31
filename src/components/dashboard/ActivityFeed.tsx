import React from 'react';
import { Calendar, Stethoscope, Scissors, MessageSquare } from 'lucide-react';
import { ServiceCategory } from '../../types';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: ServiceCategory;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const getCategoryIcon = (category: ServiceCategory) => {
  switch (category) {
    case ServiceCategory.CLINIC:
      return <Stethoscope size={16} className="text-blue-600" />;
    case ServiceCategory.HOTEL:
      return <Calendar size={16} className="text-green-600" />;
    case ServiceCategory.SPA:
      return <Scissors size={16} className="text-orange-600" />;
    default:
      return <MessageSquare size={16} className="text-purple-600" />;
  }
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex">
            <div className="mt-1">
              <div className="p-2 rounded-full bg-gray-100">
                {getCategoryIcon(activity.category)}
              </div>
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-800">{activity.title}</h4>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityFeed;