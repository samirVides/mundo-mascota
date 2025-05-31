import React, { useState } from 'react';
import { Check, Stethoscope, Hotel, Scissors } from 'lucide-react';
import { ServiceCategory } from '../types';
import { services } from '../data/mockData';

const PricingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(ServiceCategory.CLINIC);

  const getCategoryServices = (category: ServiceCategory) => {
    return services.filter(service => service.category === category && service.available);
  };

  const renderServiceCard = (service: typeof services[0]) => (
    <div key={service.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="text-2xl font-bold text-blue-600 mb-4">${service.price}</div>
      <ul className="space-y-2">
        <li className="flex items-center text-gray-600">
          <Check size={18} className="text-green-500 mr-2" />
          Professional Service
        </li>
        <li className="flex items-center text-gray-600">
          <Check size={18} className="text-green-500 mr-2" />
          Expert Staff
        </li>
        <li className="flex items-center text-gray-600">
          <Check size={18} className="text-green-500 mr-2" />
          Quality Guaranteed
        </li>
      </ul>
      <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
        Book Now
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Our Services and Pricing</h1>
        <p className="text-gray-600">Choose from our wide range of pet care services</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveCategory(ServiceCategory.CLINIC)}
          className={`flex items-center px-6 py-3 rounded-lg font-medium ${
            activeCategory === ServiceCategory.CLINIC
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Stethoscope size={20} className="mr-2" />
          Clinic Services
        </button>
        <button
          onClick={() => setActiveCategory(ServiceCategory.HOTEL)}
          className={`flex items-center px-6 py-3 rounded-lg font-medium ${
            activeCategory === ServiceCategory.HOTEL
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Hotel size={20} className="mr-2" />
          Hotel Services
        </button>
        <button
          onClick={() => setActiveCategory(ServiceCategory.SPA)}
          className={`flex items-center px-6 py-3 rounded-lg font-medium ${
            activeCategory === ServiceCategory.SPA
              ? 'bg-orange-100 text-orange-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Scissors size={20} className="mr-2" />
          Spa Services
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCategoryServices(activeCategory).map(renderServiceCard)}
      </div>
    </div>
  );
};

export default PricingPage;