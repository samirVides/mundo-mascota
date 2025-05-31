import React, { useState } from 'react';
import { reports as mockReports } from '../data/mockData';
import { Report, UserRole } from '../types';
import { FileText, Download, RefreshCw, BarChart2, PieChart, LineChart } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';

interface ReportPageProps {
  userRole: UserRole;
}

const ReportPage: React.FC<ReportPageProps> = ({ userRole }) => {
  const [reports] = useState<Report[]>(
    mockReports.filter(report => report.accessRoles.includes(userRole))
  );
  const [activeReport, setActiveReport] = useState<Report | null>(reports.length > 0 ? reports[0] : null);
  
  // Mock data for reports
  const pqrData = [
    { name: 'Clinic', complaints: 12, questions: 8, suggestions: 5 },
    { name: 'Hotel', complaints: 8, questions: 6, suggestions: 10 },
    { name: 'Spa', complaints: 5, questions: 4, suggestions: 7 },
  ];
  
  const serviceData = [
    { name: 'Vaccines', count: 45 },
    { name: 'General Medicine', count: 38 },
    { name: 'Surgery', count: 12 },
    { name: 'Lodging', count: 32 },
    { name: 'Recreation', count: 24 },
    { name: 'Feeding', count: 28 },
    { name: 'Transport', count: 16 },
    { name: 'Grooming', count: 30 },
    { name: 'Pet Products', count: 22 },
  ];
  
  const breedData = [
    { name: 'Golden Retriever', value: 32 },
    { name: 'Labrador', value: 28 },
    { name: 'German Shepherd', value: 22 },
    { name: 'Poodle', value: 18 },
    { name: 'Siamese (Cat)', value: 15 },
    { name: 'Persian (Cat)', value: 12 },
    { name: 'Other', value: 35 },
  ];
  
  const profitData = [
    { name: 'Week 1', clinic: 2500, hotel: 3800, spa: 1200 },
    { name: 'Week 2', clinic: 2800, hotel: 3500, spa: 1500 },
    { name: 'Week 3', clinic: 3200, hotel: 4200, spa: 1800 },
    { name: 'Week 4', clinic: 3000, hotel: 4000, spa: 2000 },
  ];
  
  const COLORS = ['#4F7CAC', '#7CAC4F', '#F4845F', '#AC4F7C', '#4FAC7C', '#7C4FAC', '#ACACAC'];
  
  // Function to render the appropriate chart based on report type
  const renderReportContent = () => {
    if (!activeReport) return null;
    
    switch (activeReport.type) {
      case 'PQR':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">PQR Report - Last Two Weeks</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pqrData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="complaints" name="Complaints" fill="#F87171" />
                  <Bar dataKey="questions" name="Questions" fill="#60A5FA" />
                  <Bar dataKey="suggestions" name="Suggestions" fill="#A78BFA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              This report shows the distribution of PQRs (Petitions, Questions, and Requests) received in the past two weeks, categorized by department and type.
            </p>
          </div>
        );
      
      case 'SERVICES':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Services Report</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={serviceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Services" fill="#4F7CAC" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              This report shows the total number of each service provided over the past week, ordered from most to least frequently utilized.
            </p>
          </div>
        );
      
      case 'BREEDS':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Breeds Report</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={breedData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {breedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              This report shows the distribution of pet breeds that received services in our facilities over the past two weeks.
            </p>
          </div>
        );
      
      case 'PROFIT':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Biweekly Profit Report</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart
                  data={profitData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Legend />
                  <Line type="monotone" dataKey="clinic" name="Clinic" stroke="#4F7CAC" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="hotel" name="Hotel" stroke="#7CAC4F" />
                  <Line type="monotone" dataKey="spa" name="Spa" stroke="#F4845F" />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Clinic Total</p>
                <p className="text-xl font-bold text-blue-700">$11,500</p>
                <p className="text-xs text-blue-600 mt-1">+15% vs previous period</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Hotel Total</p>
                <p className="text-xl font-bold text-green-700">$15,500</p>
                <p className="text-xs text-green-600 mt-1">+8% vs previous period</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Spa Total</p>
                <p className="text-xl font-bold text-orange-700">$6,500</p>
                <p className="text-xs text-orange-600 mt-1">+20% vs previous period</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Select a report to view</p>
          </div>
        );
    }
  };
  
  const getReportIcon = (type: string) => {
    switch (type) {
      case 'PQR':
        return <BarChart2 size={20} />;
      case 'SERVICES':
        return <BarChart2 size={20} />;
      case 'BREEDS':
        return <PieChart size={20} />;
      case 'PROFIT':
        return <LineChart size={20} />;
      default:
        return <FileText size={20} />;
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-600">View and generate reports for your business</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Available Reports</h3>
            {userRole === UserRole.GENERAL_MANAGER && (
              <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
                <RefreshCw size={18} />
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {reports.map((report) => (
              <button
                key={report.id}
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                  activeReport?.id === report.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveReport(report)}
              >
                <span className={`mr-3 ${activeReport?.id === report.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {getReportIcon(report.type)}
                </span>
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-xs text-gray-500">{report.frequency === 'WEEKLY' ? 'Weekly' : 'Biweekly'}</p>
                </div>
              </button>
            ))}
          </div>
          
          {userRole === UserRole.GENERAL_MANAGER && (
            <button className="mt-6 w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center">
              <FileText size={18} className="mr-2" />
              Create New Report
            </button>
          )}
        </div>
        
        <div className="lg:col-span-3">
          {activeReport ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{activeReport.name}</h2>
                  <p className="text-gray-600 text-sm">{activeReport.description}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center">
                    <Download size={18} className="mr-2" />
                    Export
                  </button>
                  
                  {userRole === UserRole.GENERAL_MANAGER && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
                      <RefreshCw size={18} className="mr-2" />
                      Generate New
                    </button>
                  )}
                </div>
              </div>
              
              {renderReportContent()}
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4 flex items-center">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                  <FileText size={18} />
                </div>
                <div className="text-sm text-blue-800">
                  <p>Last generated: {activeReport.lastGenerated?.toLocaleDateString()}</p>
                  <p>Next update: {activeReport.frequency === 'WEEKLY' ? 'In 7 days' : 'In 14 days'}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No reports available for your role</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;