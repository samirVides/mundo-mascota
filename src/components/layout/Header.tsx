import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { User, UserRole } from '../../types';

interface HeaderProps {
  user: User;
  toggleSidebar: () => void;
}

const getRoleDisplay = (role: UserRole): string => {
  switch(role) {
    case UserRole.GENERAL_MANAGER:
      return 'Gerente General';
    case UserRole.HOTEL_EMPLOYEE:
      return 'Empleado del Hotel';
    case UserRole.CLINIC_ADMIN:
      return 'Administrador de Clínica';
    case UserRole.SPA_ASSISTANT:
      return 'Auxiliar de Spa';
    case UserRole.PUBLIC:
      return 'Usuario Público';
    default:
      return 'Usuario';
  }
};

// Datos de ejemplo para las notificaciones
const mockNotifications = [
  {
    id: 1,
    title: 'Nueva Reserva',
    message: 'Max tiene una cita de peluquería para mañana a las 14:00',
    time: 'Hace 5 minutos',
    unread: true
  },
  {
    id: 2,
    title: 'Actualización de Vacunas',
    message: 'Luna necesita su vacuna anual en 2 semanas',
    time: 'Hace 2 horas',
    unread: true
  },
  {
    id: 3,
    title: 'Nueva PQR',
    message: 'Se ha recibido una nueva sugerencia para el área de spa',
    time: 'Hace 3 horas',
    unread: false
  }
];

const Header: React.FC<HeaderProps> = ({ user, toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-1 rounded-full hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            className="p-1.5 rounded-full hover:bg-gray-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Notificaciones</h3>
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Marcar todo como leído
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-gray-800">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700">{user.name}</p>
            <p className="text-xs text-gray-500">{getRoleDisplay(user.role)}</p>
          </div>
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {user.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;