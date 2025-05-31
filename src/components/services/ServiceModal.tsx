import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Service, ServiceCategory, ClinicServiceType, HotelServiceType, SpaServiceType } from '../../types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
  service?: Service;
  title: string;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  service,
  title
}) => {
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    description: '',
    price: 0,
    category: ServiceCategory.CLINIC,
    type: ClinicServiceType.VACCINE,
    available: true
  });
  
  useEffect(() => {
    if (service) {
      setFormData(service);
    }
  }, [service]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as ServiceCategory;
    let type;
    
    switch (category) {
      case ServiceCategory.CLINIC:
        type = ClinicServiceType.VACCINE;
        break;
      case ServiceCategory.HOTEL:
        type = HotelServiceType.LODGING;
        break;
      case ServiceCategory.SPA:
        type = SpaServiceType.GROOMING;
        break;
      default:
        type = ClinicServiceType.VACCINE;
    }
    
    setFormData(prev => ({
      ...prev,
      category,
      type,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Service);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Service Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min={0}
                step={0.01}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={ServiceCategory.CLINIC}>Clinic</option>
                <option value={ServiceCategory.HOTEL}>Hotel</option>
                <option value={ServiceCategory.SPA}>Spa</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {formData.category === ServiceCategory.CLINIC && (
                  <>
                    <option value={ClinicServiceType.VACCINE}>Vaccine</option>
                    <option value={ClinicServiceType.GENERAL_MEDICINE}>General Medicine</option>
                    <option value={ClinicServiceType.SURGERY}>Surgery</option>
                  </>
                )}
                
                {formData.category === ServiceCategory.HOTEL && (
                  <>
                    <option value={HotelServiceType.LODGING}>Lodging</option>
                    <option value={HotelServiceType.RECREATION}>Recreation</option>
                    <option value={HotelServiceType.FEEDING}>Feeding</option>
                    <option value={HotelServiceType.TRANSPORT}>Transport</option>
                  </>
                )}
                
                {formData.category === ServiceCategory.SPA && (
                  <>
                    <option value={SpaServiceType.GROOMING}>Grooming</option>
                    <option value={SpaServiceType.PET_PRODUCTS}>Pet Products</option>
                  </>
                )}
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                name="available"
                checked={formData.available}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                Available
              </label>
            </div>
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;