import React, { useState } from 'react';
import { Check, Star, Stethoscope, Hotel, Scissors } from 'lucide-react';
import { ServiceCategory } from '../types';

const PricingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(ServiceCategory.CLINIC);

  const clinicPackages = [
    {
      name: "Basic Checkup",
      price: 50,
      features: [
        "General health examination",
        "Weight check",
        "Temperature check",
        "Basic consultation"
      ],
      description: "Essential health check for your pet",
      popular: false
    },
    {
      name: "Complete Care",
      price: 120,
      features: [
        "Full health examination",
        "Vaccinations",
        "Deworming",
        "Dental check",
        "Nutrition consultation",
        "Follow-up visit"
      ],
      description: "Comprehensive health care package",
      popular: true
    },
    {
      name: "Premium Health",
      price: 200,
      features: [
        "Complete examination",
        "All vaccinations",
        "Blood work",
        "X-rays if needed",
        "Dental cleaning",
        "3 follow-up visits",
        "24/7 vet consultation"
      ],
      description: "Ultimate health care for your pet",
      popular: false
    }
  ];

  const hotelPackages = [
    {
      name: "Day Care",
      price: 35,
      features: [
        "8 hours of care",
        "2 walks",
        "Feeding service",
        "Play time",
        "Basic grooming"
      ],
      description: "Perfect for busy work days",
      popular: false
    },
    {
      name: "Vacation Stay",
      price: 65,
      features: [
        "24-hour care",
        "3 walks daily",
        "Premium food",
        "Group play time",
        "Basic grooming",
        "Daily photo updates",
        "Vet on call"
      ],
      description: "Comfortable stay while you're away",
      popular: true
    },
    {
      name: "Luxury Resort",
      price: 95,
      features: [
        "Private suite",
        "4 walks daily",
        "Gourmet meals",
        "Individual play time",
        "Spa treatment",
        "Video calls with owner",
        "24/7 care"
      ],
      description: "VIP treatment for your pet",
      popular: false
    }
  ];

  const spaPackages = [
    {
      name: "Basic Grooming",
      price: 45,
      features: [
        "Bath & dry",
        "Brush out",
        "Nail trimming",
        "Ear cleaning",
        "Basic haircut"
      ],
      description: "Essential grooming services",
      popular: false
    },
    {
      name: "Spa Day",
      price: 75,
      features: [
        "Premium bath",
        "De-shedding treatment",
        "Style grooming",
        "Teeth brushing",
        "Paw treatment",
        "Cologne/perfume",
        "Bow/bandana"
      ],
      description: "Complete makeover for your pet",
      popular: true
    },
    {
      name: "Royal Treatment",
      price: 120,
      features: [
        "Luxury bath",
        "Special shampoo",
        "Full grooming",
        "Massage",
        "Facial scrub",
        "Pawdicure",
        "Style cut",
        "Take-home care kit"
      ],
      description: "The ultimate spa experience",
      popular: false
    }
  ];

  const getPackages = () => {
    switch (activeCategory) {
      case ServiceCategory.CLINIC:
        return clinicPackages;
      case ServiceCategory.HOTEL:
        return hotelPackages;
      case ServiceCategory.SPA:
        return spaPackages;
      default:
        return clinicPackages;
    }
  };

  const getCategoryColor = () => {
    switch (activeCategory) {
      case ServiceCategory.CLINIC:
        return 'blue';
      case ServiceCategory.HOTEL:
        return 'green';
      case ServiceCategory.SPA:
        return 'orange';
      default:
        return 'blue';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Service Packages</h1>
        <p className="text-gray-600">Choose the perfect care package for your pet</p>
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
          Clinic Packages
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
          Hotel Packages
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
          Spa Packages
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getPackages().map((pkg, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-xl shadow-sm p-6 border ${
              pkg.popular ? `border-${getCategoryColor()}-200` : 'border-gray-100'
            } hover:shadow-md transition-all duration-200`}
          >
            {pkg.popular && (
              <div className={`absolute top-0 right-6 -translate-y-1/2 bg-${getCategoryColor()}-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                <Star size={14} className="mr-1" />
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-4">{pkg.description}</p>
            <div className="text-3xl font-bold text-gray-800 mb-4">
              ${pkg.price}
              <span className="text-sm text-gray-500 font-normal">/visit</span>
            </div>
            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <Check size={18} className={`text-${getCategoryColor()}-500 mr-2`} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full px-4 py-2 bg-${getCategoryColor()}-600 text-white rounded-lg hover:bg-${getCategoryColor()}-700 transition-colors duration-200`}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;