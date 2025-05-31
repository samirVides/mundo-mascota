import React from 'react';
import { Check, X, Clock } from 'lucide-react';

interface Appointment {
  id: string;
  petName: string;
  ownerName: string;
  service: string;
  date: string;
  time: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

interface RecentAppointmentsProps {
  appointments: Appointment[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check size={12} className="mr-1" />
          Completed
        </div>
      );
    case 'CANCELLED':
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <X size={12} className="mr-1" />
          Cancelled
        </div>
      );
    default:
      return (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock size={12} className="mr-1" />
          Pending
        </div>
      );
  }
};

const RecentAppointments: React.FC<RecentAppointmentsProps> = ({ appointments }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h3>
      
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pet
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {appointment.petName}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                  {appointment.ownerName}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                  {appointment.service}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                  {appointment.date} <span className="text-gray-400">|</span> {appointment.time}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {getStatusBadge(appointment.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Appointments
        </button>
      </div>
    </div>
  );
};

export default RecentAppointments;