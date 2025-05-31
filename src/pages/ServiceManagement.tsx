import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Service, ServiceCategory, UserRole } from '../types';
import ServiceCard from '../components/services/ServiceCard';
import ServiceModal from '../components/services/ServiceModal';
import { services as mockServices } from '../data/mockData';

interface ServiceManagementProps {
  category: ServiceCategory;
  userRole: UserRole;
}

const ServiceManagement: React.FC<ServiceManagementProps> = ({ 
  category, 
  userRole 
}) => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | undefined>(undefined);
  const [filterType, setFilterType] = useState<string>('');
  
  const filteredServices = services
    .filter(service => service.category === category)
    .filter(service => filterType === '' || service.type === filterType);
  
  const getCategoryName = () => {
    switch (category) {
      case ServiceCategory.CLINIC:
        return 'Clinic';
      case ServiceCategory.HOTEL:
        return 'Hotel';
      case ServiceCategory.SPA:
        return 'Spa';
      default:
        return '';
    }
  };
  
  const handleAddService = () => {
    setCurrentService(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditService = (service: Service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };
  
  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
    }
  };
  
  const handleSaveService = (serviceData: Service) => {
    if (currentService) {
      // Edit existing service
      setServices(prev => 
        prev.map(service => 
          service.id === currentService.id ? { ...serviceData, id: currentService.id } : service
        )
      );
    } else {
      // Add new service
      const newService = {
        ...serviceData,
        id: `${category.charAt(0).toLowerCase()}${services.length + 1}`,
      };
      setServices(prev => [...prev, newService]);
    }
    setIsModalOpen(false);
  };
  
  const getFilterOptions = () => {
    const types = new Set<string>();
    services
      .filter(service => service.category === category)
      .forEach(service => types.add(service.type));
    
    return Array.from(types);
  };
  
  const canAddService = 
    (userRole === UserRole.GENERAL_MANAGER) ||
    (userRole === UserRole.CLINIC_ADMIN && category === ServiceCategory.CLINIC) ||
    (userRole === UserRole.HOTEL_EMPLOYEE && category === ServiceCategory.HOTEL) ||
    (userRole === UserRole.SPA_ASSISTANT && category === ServiceCategory.SPA);
    
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{getCategoryName()} Services</h1>
          <p className="text-gray-600">Manage your {getCategoryName().toLowerCase()} services</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
            >
              <option value="">All Types</option>
              {getFilterOptions().map(type => (
                <option key={type} value={type}>
                  {type.split('_').map(word => 
                    word.charAt(0) + word.slice(1).toLowerCase()
                  ).join(' ')}
                </option>
              ))}
            </select>
            <Filter size={16} className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {canAddService && (
            <button
              onClick={handleAddService}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus size={18} className="mr-1" />
              Add Service
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            userRole={userRole}
            onEdit={handleEditService}
            onDelete={handleDeleteService}
          />
        ))}
        
        {filteredServices.length === 0 && (
          <div className="col-span-3 py-10 text-center">
            <p className="text-gray-500">No services found. Try changing your filter or add a new service.</p>
          </div>
        )}
      </div>
      
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveService}
        service={currentService}
        title={currentService ? 'Edit Service' : 'Add Service'}
      />
    </div>
  );
};

export default ServiceManagement;