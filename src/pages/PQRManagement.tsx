import React, { useState } from 'react';
import { pqrs as mockPQRs } from '../data/mockData';
import { PQR, UserRole, ServiceCategory } from '../types';
import { MessageSquare, Filter, Search } from 'lucide-react';

interface PQRManagementProps {
  userRole: UserRole;
}

const PQRManagement: React.FC<PQRManagementProps> = ({ userRole }) => {
  const [pqrs, setPQRs] = useState<PQR[]>(mockPQRs);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');
  const [filterCategory, setFilterCategory] = useState<ServiceCategory | ''>('');
  const [search, setSearch] = useState('');
  
  const isManager = userRole === UserRole.GENERAL_MANAGER;
  
  const filteredPQRs = pqrs
    .filter(pqr => activeTab === 'ALL' || pqr.status === activeTab)
    .filter(pqr => filterCategory === '' || pqr.category === filterCategory)
    .filter(pqr => 
      search === '' || 
      pqr.subject.toLowerCase().includes(search.toLowerCase()) ||
      pqr.message.toLowerCase().includes(search.toLowerCase())
    );
  
  const handleStatusChange = (pqrId: string, status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED') => {
    setPQRs(prev => 
      prev.map(pqr => 
        pqr.id === pqrId ? { ...pqr, status } : pqr
      )
    );
  };
  
  const handleSubmitPQR = (newPQR: Omit<PQR, 'id' | 'date' | 'status'>) => {
    const pqr: PQR = {
      ...newPQR,
      id: `p${pqrs.length + 1}`,
      date: new Date(),
      status: 'PENDING'
    };
    setPQRs(prev => [...prev, pqr]);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">PQR Management</h1>
        <p className="text-gray-600">
          {isManager 
            ? 'Manage customer inquiries, complaints, and suggestions' 
            : 'Submit and track your inquiries, complaints, and suggestions'}
        </p>
      </div>
      
      {!isManager && (
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Submit a New PQR</h2>
          <PQRForm onSubmit={handleSubmitPQR} />
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'ALL' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('ALL')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'PENDING' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('PENDING')}
              >
                Pending
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'IN_PROGRESS' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('IN_PROGRESS')}
              >
                In Progress
              </button>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'RESOLVED' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('RESOLVED')}
              >
                Resolved
              </button>
            </div>
            
            <div className="flex space-x-2 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm w-60 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as ServiceCategory | '')}
                  className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">All Categories</option>
                  <option value={ServiceCategory.CLINIC}>Clinic</option>
                  <option value={ServiceCategory.HOTEL}>Hotel</option>
                  <option value={ServiceCategory.SPA}>Spa</option>
                </select>
                <Filter size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {filteredPQRs.length > 0 ? (
            <div className="space-y-4">
              {filteredPQRs.map(pqr => (
                <PQRCard 
                  key={pqr.id} 
                  pqr={pqr} 
                  isManager={isManager} 
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No PQRs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PQRFormProps {
  onSubmit: (pqr: Omit<PQR, 'id' | 'date' | 'status'>) => void;
}

const PQRForm: React.FC<PQRFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    type: 'COMPLAINT',
    category: ServiceCategory.CLINIC,
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      email: '',
      type: 'COMPLAINT',
      category: ServiceCategory.CLINIC,
      subject: '',
      message: ''
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
            required
          />
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="COMPLAINT">Complaint</option>
            <option value="QUESTION">Question</option>
            <option value="SUGGESTION">Suggestion</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value={ServiceCategory.CLINIC}>Clinic</option>
          <option value={ServiceCategory.HOTEL}>Hotel</option>
          <option value={ServiceCategory.SPA}>Spa</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Brief description of your inquiry"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Please provide details about your inquiry, complaint, or suggestion"
          required
        ></textarea>
      </div>
      
      <div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

interface PQRCardProps {
  pqr: PQR;
  isManager: boolean;
  onStatusChange: (pqrId: string, status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED') => void;
}

const PQRCard: React.FC<PQRCardProps> = ({ pqr, isManager, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [response, setResponse] = useState(pqr.response || '');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Resolved
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'COMPLAINT':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Complaint
          </span>
        );
      case 'SUGGESTION':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Suggestion
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Question
          </span>
        );
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleSubmitResponse = () => {
    onStatusChange(pqr.id, 'RESOLVED');
  };
  
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200">
      <div 
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {getStatusBadge(pqr.status)}
            {getTypeBadge(pqr.type)}
            <span className="text-xs text-gray-500">
              {formatDate(pqr.date)}
            </span>
          </div>
          <h3 className="text-md font-medium text-gray-800">{pqr.subject}</h3>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-600">{pqr.email}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-600">
              Category: {pqr.category.charAt(0) + pqr.category.slice(1).toLowerCase()}
            </span>
          </div>
        </div>
        <div>
          <span className="text-blue-600">
            {isExpanded ? 'Hide' : 'View'} 
          </span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-gray-700 whitespace-pre-line mb-4">{pqr.message}</p>
          
          {pqr.response && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Response:</h4>
              <p className="text-gray-600 text-sm whitespace-pre-line">{pqr.response}</p>
              <div className="text-xs text-gray-500 mt-2">
                {pqr.responseDate && formatDate(pqr.responseDate)}
              </div>
            </div>
          )}
          
          {isManager && pqr.status !== 'RESOLVED' && (
            <div className="mt-4">
              <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                Your Response
              </label>
              <textarea
                id="response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your response here..."
              ></textarea>
              
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  onClick={() => onStatusChange(pqr.id, 'IN_PROGRESS')}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={handleSubmitResponse}
                  disabled={!response}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
                    response ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  Resolve
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PQRManagement;