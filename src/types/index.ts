// Define types for the application

// User types
export enum UserRole {
  GENERAL_MANAGER = 'GENERAL_MANAGER',
  HOTEL_EMPLOYEE = 'HOTEL_EMPLOYEE',
  CLINIC_ADMIN = 'CLINIC_ADMIN',
  SPA_ASSISTANT = 'SPA_ASSISTANT',
  PUBLIC = 'PUBLIC'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Pet and Customer types
export enum PetType {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  OTHER = 'OTHER'
}

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  weight: number;
  ownerId: string;
  medicalHistory?: MedicalRecord[];
  hotelHistory?: HotelBooking[];
  spaHistory?: SpaAppointment[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  pets: string[]; // Pet IDs
}

// Service types
export enum ServiceCategory {
  CLINIC = 'CLINIC',
  HOTEL = 'HOTEL',
  SPA = 'SPA'
}

export enum ClinicServiceType {
  VACCINE = 'VACCINE',
  GENERAL_MEDICINE = 'GENERAL_MEDICINE',
  SURGERY = 'SURGERY'
}

export enum HotelServiceType {
  LODGING = 'LODGING',
  RECREATION = 'RECREATION',
  FEEDING = 'FEEDING',
  TRANSPORT = 'TRANSPORT'
}

export enum SpaServiceType {
  GROOMING = 'GROOMING',
  PET_PRODUCTS = 'PET_PRODUCTS'
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  type: ClinicServiceType | HotelServiceType | SpaServiceType;
  available: boolean;
}

// Record types
export interface MedicalRecord {
  id: string;
  petId: string;
  serviceId: string;
  date: Date;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  cost: number;
  veterinarianId: string;
}

export interface HotelBooking {
  id: string;
  petId: string;
  checkIn: Date;
  checkOut: Date;
  services: string[]; // Service IDs
  notes?: string;
  cost: number;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

export interface SpaAppointment {
  id: string;
  petId: string;
  date: Date;
  services: string[]; // Service IDs
  notes?: string;
  cost: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

// PQR types
export interface PQR {
  id: string;
  customerId?: string;
  email: string;
  type: 'COMPLAINT' | 'QUESTION' | 'SUGGESTION';
  category: ServiceCategory;
  subject: string;
  message: string;
  date: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  response?: string;
  responseDate?: Date;
}

// Report types
export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'PQR' | 'SERVICES' | 'BREEDS' | 'PROFIT';
  frequency: 'WEEKLY' | 'BIWEEKLY';
  lastGenerated?: Date;
  accessRoles: UserRole[];
}