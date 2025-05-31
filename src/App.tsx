import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import { users } from './data/mockData';

// Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Login from './components/auth/Login';

// Pages
import Dashboard from './pages/Dashboard';
import ServiceManagement from './pages/ServiceManagement';
import PQRManagement from './pages/PQRManagement';
import ReportPage from './pages/ReportPage';
import PricingPage from './pages/PricingPage';

// Workaround to add the missing imports
import 'recharts';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleLogin = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };
  
  const handleGuestLogin = () => {
    // Set user as public/guest
    setCurrentUser(users.find(u => u.role === UserRole.PUBLIC) || null);
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} onGuestLogin={handleGuestLogin} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <Sidebar userRole={currentUser.role} onLogout={handleLogout} />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={currentUser} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <Routes>
              <Route path="/dashboard" element={<Dashboard userRole={currentUser.role} />} />
              
              {(currentUser.role === UserRole.GENERAL_MANAGER || 
                currentUser.role === UserRole.CLINIC_ADMIN || 
                currentUser.role === UserRole.HOTEL_EMPLOYEE) && (
                <Route path="/clinic" element={<ServiceManagement category="CLINIC" userRole={currentUser.role} />} />
              )}
              
              {(currentUser.role === UserRole.GENERAL_MANAGER || 
                currentUser.role === UserRole.HOTEL_EMPLOYEE) && (
                <Route path="/hotel" element={<ServiceManagement category="HOTEL" userRole={currentUser.role} />} />
              )}
              
              {(currentUser.role === UserRole.GENERAL_MANAGER || 
                currentUser.role === UserRole.SPA_ASSISTANT || 
                currentUser.role === UserRole.CLINIC_ADMIN) && (
                <Route path="/spa" element={<ServiceManagement category="SPA" userRole={currentUser.role} />} />
              )}
              
              <Route path="/pqrs" element={<PQRManagement userRole={currentUser.role} />} />
              
              {currentUser.role === UserRole.PUBLIC && (
                <Route path="/pricing" element={<PricingPage />} />
              )}
              
              {currentUser.role !== UserRole.PUBLIC && (
                <Route path="/reports" element={<ReportPage userRole={currentUser.role} />} />
              )}
              
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;