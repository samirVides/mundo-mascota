import React from 'react';
import { UserRole } from '../../types';
import { PawPrint } from 'lucide-react';

interface LoginProps {
  onLogin: (userId: string) => void;
  onGuestLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGuestLogin }) => {
  const handleLogin = (role: UserRole) => {
    // Simular inicio de sesión con un ID fijo para cada rol
    const mockIds = {
      [UserRole.GENERAL_MANAGER]: '1',
      [UserRole.HOTEL_EMPLOYEE]: '2',
      [UserRole.CLINIC_ADMIN]: '3',
      [UserRole.SPA_ASSISTANT]: '4',
      [UserRole.PUBLIC]: '5'
    };
    onLogin(mockIds[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <PawPrint size={32} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">PetCare Hub</h1>
          <p className="text-gray-600 mt-2">Selecciona tu rol para ingresar</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleLogin(UserRole.GENERAL_MANAGER)}
            className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <p className="font-medium text-gray-800">Gerente General</p>
            <p className="text-sm text-gray-500">Acceso completo al sistema</p>
          </button>

          <button
            onClick={() => handleLogin(UserRole.HOTEL_EMPLOYEE)}
            className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <p className="font-medium text-gray-800">Empleado del Hotel</p>
            <p className="text-sm text-gray-500">Gestión de servicios de hotel</p>
          </button>

          <button
            onClick={() => handleLogin(UserRole.CLINIC_ADMIN)}
            className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <p className="font-medium text-gray-800">Administrador de Clínica</p>
            <p className="text-sm text-gray-500">Gestión de servicios clínicos</p>
          </button>

          <button
            onClick={() => handleLogin(UserRole.SPA_ASSISTANT)}
            className="w-full p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <p className="font-medium text-gray-800">Auxiliar de Spa</p>
            <p className="text-sm text-gray-500">Gestión de servicios de spa</p>
          </button>

          <button
            onClick={onGuestLogin}
            className="w-full p-3 text-left bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <p className="font-medium text-gray-800">Usuario Público</p>
            <p className="text-sm text-gray-500">Consulta de servicios y PQRs</p>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Selecciona cualquier rol para acceder al sistema</p>
          <p className="mt-1 text-xs">Este es un prototipo de demostración</p>
        </div>
      </div>
    </div>
  );
};

export default Login;