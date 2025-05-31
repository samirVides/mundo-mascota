import React from 'react';
import { Calendar, Users, PawPrint, DollarSign, Stethoscope, Hotel, Scissors } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import ServiceBreakdown from '../components/dashboard/ServiceBreakdown';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import RecentAppointments from '../components/dashboard/RecentAppointments';
import { ServiceCategory, UserRole } from '../types';

interface DashboardProps {
  userRole: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  // Mock data
  const serviceBreakdownData = [
    { name: 'Vaccines', value: 1200, category: ServiceCategory.CLINIC },
    { name: 'Medical Services', value: 2400, category: ServiceCategory.CLINIC },
    { name: 'Surgeries', value: 3000, category: ServiceCategory.CLINIC },
    { name: 'Lodging', value: 4500, category: ServiceCategory.HOTEL },
    { name: 'Recreation', value: 1800, category: ServiceCategory.HOTEL },
    { name: 'Grooming', value: 2700, category: ServiceCategory.SPA },
    { name: 'Pet Products', value: 1500, category: ServiceCategory.SPA },
  ];
  
  const recentActivities = [
    {
      id: '1',
      title: 'New appointment scheduled',
      description: 'Max (Golden Retriever) has a grooming appointment on Friday at 2 PM.',
      time: '2 hours ago',
      category: ServiceCategory.SPA
    },
    {
      id: '2',
      title: 'Medical record updated',
      description: 'Rocky\'s vaccination records have been updated with today\'s shots.',
      time: '4 hours ago',
      category: ServiceCategory.CLINIC
    },
    {
      id: '3',
      title: 'New hotel booking',
      description: 'Luna will be staying with us from June 10-15.',
      time: 'Yesterday',
      category: ServiceCategory.HOTEL
    },
    {
      id: '4',
      title: 'New customer registered',
      description: 'Carlos Mendez registered and added his pet Toby (Yorkshire Terrier).',
      time: 'Yesterday',
      category: ServiceCategory.HOTEL
    },
  ];
  
  const recentAppointments = [
    {
      id: '1',
      petName: 'Max',
      ownerName: 'María López',
      service: 'Full Grooming',
      date: 'Jun 15, 2023',
      time: '10:00 AM',
      status: 'COMPLETED'
    },
    {
      id: '2',
      petName: 'Rocky',
      ownerName: 'Juan Pérez',
      service: 'Vaccines',
      date: 'Jun 16, 2023',
      time: '2:30 PM',
      status: 'PENDING'
    },
    {
      id: '3',
      petName: 'Luna',
      ownerName: 'María López',
      service: 'Hotel Check-in',
      date: 'Jun 17, 2023',
      time: '9:00 AM',
      status: 'PENDING'
    },
    {
      id: '4',
      petName: 'Bella',
      ownerName: 'Sofia Ruiz',
      service: 'General Check-up',
      date: 'Jun 15, 2023',
      time: '11:30 AM',
      status: 'CANCELLED'
    },
  ];
  
  // Only show certain stats for specific roles
  const showFinancials = userRole === UserRole.GENERAL_MANAGER;
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your PetCare Hub dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard
          title="Upcoming Appointments"
          value="28"
          icon={<Calendar size={24} />}
          change={{ value: 12, isPositive: true }}
          onClick={() => console.log('View appointments')}
        />
        
        <DashboardCard
          title="Active Customers"
          value="152"
          icon={<Users size={24} />}
          change={{ value: 8, isPositive: true }}
          onClick={() => console.log('View customers')}
        />
        
        <DashboardCard
          title="Pets Registered"
          value="217"
          icon={<PawPrint size={24} />}
          change={{ value: 5, isPositive: true }}
          onClick={() => console.log('View pets')}
        />
        
        {showFinancials && (
          <DashboardCard
            title="Monthly Revenue"
            value="$8,245"
            icon={<DollarSign size={24} />}
            change={{ value: 15, isPositive: true }}
            onClick={() => console.log('View revenue')}
          />
        )}
        
        {!showFinancials && (
          <DashboardCard
            title="Active Services"
            value="34"
            icon={<Stethoscope size={24} />}
            onClick={() => console.log('View services')}
          />
        )}
      </div>
      
      {userRole !== UserRole.PUBLIC && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ServiceBreakdown data={serviceBreakdownData} />
          <ActivityFeed activities={recentActivities} />
        </div>
      )}
      
      {userRole !== UserRole.PUBLIC && (
        <div className="mb-6">
          <RecentAppointments appointments={recentAppointments} />
        </div>
      )}
      
      {userRole === UserRole.PUBLIC && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600 inline-block mb-4 group-hover:bg-blue-200">
              <Stethoscope size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Clinic Services</h3>
            <p className="text-gray-600 mb-4">Expert veterinary care for your beloved pets</p>
            <a href="#" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
              View Services
              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div className="p-4 rounded-full bg-green-100 text-green-600 inline-block mb-4 group-hover:bg-green-200">
              <Hotel size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Hotel Services</h3>
            <p className="text-gray-600 mb-4">Premium accommodations and care while you're away</p>
            <a href="#" className="text-green-600 font-medium hover:text-green-800 inline-flex items-center">
              View Services
              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div className="p-4 rounded-full bg-orange-100 text-orange-600 inline-block mb-4 group-hover:bg-orange-200">
              <Scissors size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Spa Services</h3>
            <p className="text-gray-600 mb-4">Grooming and pampering for a happy, healthy pet</p>
            <a href="#" className="text-orange-600 font-medium hover:text-orange-800 inline-flex items-center">
              View Services
              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;