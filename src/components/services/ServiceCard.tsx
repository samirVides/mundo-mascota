import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Service, UserRole } from '../../types';

interface ServiceCardProps {
  service: Service;
  userRole: UserRole;
  onEdit?: (service: Service) => void;
  onDelete?: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  userRole,
  onEdit,
  onDelete
}) => {
  const canEdit = [UserRole.GENERAL_MANAGER, UserRole.SPA_ASSISTANT].includes(userRole) ||
    (userRole === UserRole.CLINIC_ADMIN && service.category === 'CLINIC') ||
    (userRole === UserRole.HOTEL_EMPLOYEE && service.category === 'HOTEL');
    
  const canDelete = userRole === UserRole.GENERAL_MANAGER;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
      <div className={`h-2 ${getCategoryColor(service.category)}`}></div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
          <div className="text-lg font-bold text-blue-700">${service.price}</div>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 mb-4">{service.description}</p>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getTypeBadgeColor(service.type)}`}>
            {formatServiceType(service.type)}
          </span>
          
          {(canEdit || canDelete) && (
            <div className="flex space-x-2">
              {canEdit && (
                <button 
                  onClick={() => onEdit && onEdit(service)}
                  className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-200"
                >
                  <Pencil size={16} />
                </button>
              )}
              {canDelete && (
                <button 
                  onClick={() => onDelete && onDelete(service.id)}
                  className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getCategoryColor(category: string): string {
  switch (category) {
    case 'CLINIC':
      return 'bg-blue-600';
    case 'HOTEL':
      return 'bg-green-600';
    case 'SPA':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
}

function getTypeBadgeColor(type: string): string {
  if (type.includes('VACCINE') || type.includes('GENERAL_MEDICINE') || type.includes('SURGERY')) {
    return 'bg-blue-100 text-blue-800';
  } else if (type.includes('LODGING') || type.includes('RECREATION') || type.includes('FEEDING') || type.includes('TRANSPORT')) {
    return 'bg-green-100 text-green-800';
  } else if (type.includes('GROOMING') || type.includes('PET_PRODUCTS')) {
    return 'bg-orange-100 text-orange-800';
  } else {
    return 'bg-gray-100 text-gray-800';
  }
}

function formatServiceType(type: string): string {
  return type.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ');
}

export default ServiceCard;