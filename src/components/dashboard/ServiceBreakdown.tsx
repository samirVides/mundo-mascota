import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ServiceCategory } from '../../types';

interface ServiceBreakdownProps {
  data: {
    name: string;
    value: number;
    category: ServiceCategory;
  }[];
}

const COLORS = {
  [ServiceCategory.CLINIC]: '#4F7CAC',
  [ServiceCategory.HOTEL]: '#7CAC4F',
  [ServiceCategory.SPA]: '#F4845F'
};

const ServiceBreakdown: React.FC<ServiceBreakdownProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Breakdown</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.category]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`$${value}`, 'Revenue']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        {Object.entries(COLORS).map(([category, color]) => (
          <div key={category} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
            <span className="text-sm text-gray-600">
              {category.charAt(0) + category.slice(1).toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBreakdown;