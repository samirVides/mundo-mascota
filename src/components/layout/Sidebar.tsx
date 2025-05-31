import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Stethoscope, Hotel, Scissors, Users, 
  PawPrint, Calendar, DollarSign, FileText, MessageSquare, LogOut 
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  userRole: UserRole;
  onLogout: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  allowedRoles: UserRole[];
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, onLogout }) => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { 
      name: 'Inicio', 
      path: '/dashboard', 
      icon: <Home size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.HOTEL_EMPLOYEE, UserRole.CLINIC_ADMIN, UserRole.SPA_ASSISTANT, UserRole.PUBLIC] 
    },
    { 
      name: 'Servicios Clínicos', 
      path: '/clinic', 
      icon: <Stethoscope size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.CLINIC_ADMIN, UserRole.HOTEL_EMPLOYEE] 
    },
    { 
      name: 'Servicios de Hotel', 
      path: '/hotel', 
      icon: <Hotel size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.HOTEL_EMPLOYEE] 
    },
    { 
      name: 'Servicios de Spa', 
      path: '/spa', 
      icon: <Scissors size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.SPA_ASSISTANT, UserRole.CLINIC_ADMIN] 
    },
    { 
      name: 'Clientes', 
      path: '/customers', 
      icon: <Users size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.HOTEL_EMPLOYEE, UserRole.CLINIC_ADMIN, UserRole.SPA_ASSISTANT] 
    },
    { 
      name: 'Mascotas', 
      path: '/pets', 
      icon: <PawPrint size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.HOTEL_EMPLOYEE, UserRole.CLINIC_ADMIN, UserRole.SPA_ASSISTANT] 
    },
    { 
      name: 'Citas', 
      path: '/appointments', 
      icon: <Calendar size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.HOTEL_EMPLOYEE, UserRole.CLINIC_ADMIN, UserRole.SPA_ASSISTANT] 
    },
    { 
      name: 'Precios', 
      path: '/pricing', 
      icon: <DollarSign size={20} />, 
      allowedRoles: [UserRole.PUBLIC] 
    },
    { 
      name: 'Reportes', 
      path: '/reports', 
      icon: <FileText size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.HOTEL_EMPLOYEE, UserRole.CLINIC_ADMIN, UserRole.SPA_ASSISTANT] 
    },
    { 
      name: 'PQRs', 
      path: '/pqrs', 
      icon: <MessageSquare size={20} />, 
      allowedRoles: [UserRole.GENERAL_MANAGER, UserRole.PUBLIC] 
    },
  ];
  
  const filteredNavItems = navItems.filter(item => 
    item.allowedRoles.includes(userRole)
  );

  return (
    <div className="bg-white h-full shadow-md flex flex-col p-4 w-64">
      <div className="flex items-center justify-center pb-6 pt-2">
        <div className="flex items-center space-x-2">
          <PawPrint size={24} className="text-blue-600" />
          <h1 className="text-xl font-semibold text-blue-800">PetCare Hub</h1>
        </div>
      </div>
      <div className="space-y-1 flex-1">
        {filteredNavItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
              ${location.pathname === item.path 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <span className={location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="pt-6 pb-2">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;