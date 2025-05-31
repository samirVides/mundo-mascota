import { 
  User, UserRole, Pet, PetType, Customer, Service, 
  ServiceCategory, ClinicServiceType, HotelServiceType, SpaServiceType,
  MedicalRecord, HotelBooking, SpaAppointment, PQR, Report
} from '../types';

// Usuarios de ejemplo
export const users: User[] = [
  {
    id: '1',
    name: 'Ana Gómez',
    email: 'ana@pethotel.com',
    role: UserRole.GENERAL_MANAGER,
    avatar: 'https://images.pexels.com/photos/3746314/pexels-photo-3746314.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos@pethotel.com',
    role: UserRole.HOTEL_EMPLOYEE,
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Laura Martínez',
    email: 'laura@pethotel.com',
    role: UserRole.CLINIC_ADMIN,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'Diego Sánchez',
    email: 'diego@pethotel.com',
    role: UserRole.SPA_ASSISTANT,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '5',
    name: 'Invitado',
    email: 'invitado@example.com',
    role: UserRole.PUBLIC
  }
];

// Clientes de ejemplo
export const customers: Customer[] = [
  {
    id: '1',
    name: 'María López',
    email: 'maria@example.com',
    phone: '555-1234',
    address: 'Calle Principal 123',
    pets: ['1', '2']
  },
  {
    id: '2',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '555-5678',
    address: 'Avenida Central 456',
    pets: ['3']
  },
  {
    id: '3',
    name: 'Sofia Ruiz',
    email: 'sofia@example.com',
    phone: '555-9012',
    address: 'Plaza Mayor 789',
    pets: ['4', '5']
  }
];

// Mascotas de ejemplo
export const pets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    type: PetType.DOG,
    breed: 'Golden Retriever',
    age: 3,
    weight: 30,
    ownerId: '1'
  },
  {
    id: '2',
    name: 'Luna',
    type: PetType.CAT,
    breed: 'Siamés',
    age: 2,
    weight: 4.5,
    ownerId: '1'
  },
  {
    id: '3',
    name: 'Rocky',
    type: PetType.DOG,
    breed: 'Pastor Alemán',
    age: 5,
    weight: 35,
    ownerId: '2'
  },
  {
    id: '4',
    name: 'Kiki',
    type: PetType.BIRD,
    breed: 'Canario',
    age: 1,
    weight: 0.2,
    ownerId: '3'
  },
  {
    id: '5',
    name: 'Bella',
    type: PetType.CAT,
    breed: 'Persa',
    age: 4,
    weight: 5,
    ownerId: '3'
  }
];

// Servicios de ejemplo
export const services: Service[] = [
  // Servicios de Clínica
  {
    id: 'c1',
    name: 'Vacunación Anual',
    description: 'Paquete completo de vacunación anual',
    price: 80,
    category: ServiceCategory.CLINIC,
    type: ClinicServiceType.VACCINE,
    available: true
  },
  {
    id: 'c2',
    name: 'Consulta General',
    description: 'Examen físico completo',
    price: 50,
    category: ServiceCategory.CLINIC,
    type: ClinicServiceType.GENERAL_MEDICINE,
    available: true
  },
  {
    id: 'c3',
    name: 'Limpieza Dental',
    description: 'Limpieza dental profesional bajo anestesia',
    price: 200,
    category: ServiceCategory.CLINIC,
    type: ClinicServiceType.SURGERY,
    available: true
  },
  
  // Servicios de Hotel
  {
    id: 'h1',
    name: 'Habitación Estándar',
    description: 'Habitación cómoda para tu mascota',
    price: 40,
    category: ServiceCategory.HOTEL,
    type: HotelServiceType.LODGING,
    available: true
  },
  {
    id: 'h2',
    name: 'Tiempo de Juego',
    description: 'Sesiones de juego supervisadas con otras mascotas',
    price: 15,
    category: ServiceCategory.HOTEL,
    type: HotelServiceType.RECREATION,
    available: true
  },
  {
    id: 'h3',
    name: 'Paquete Premium de Alimentación',
    description: 'Comida de alta calidad para tu mascota',
    price: 20,
    category: ServiceCategory.HOTEL,
    type: HotelServiceType.FEEDING,
    available: true
  },
  {
    id: 'h4',
    name: 'Recogida/Entrega',
    description: 'Servicio de transporte para tu mascota',
    price: 25,
    category: ServiceCategory.HOTEL,
    type: HotelServiceType.TRANSPORT,
    available: true
  },
  
  // Servicios de Spa
  {
    id: 's1',
    name: 'Aseo Básico',
    description: 'Baño, cepillado y corte de uñas',
    price: 35,
    category: ServiceCategory.SPA,
    type: SpaServiceType.GROOMING,
    available: true
  },
  {
    id: 's2',
    name: 'Aseo Completo',
    description: 'Aseo completo con estilizado',
    price: 60,
    category: ServiceCategory.SPA,
    type: SpaServiceType.GROOMING,
    available: true
  },
  {
    id: 's3',
    name: 'Collar Premium',
    description: 'Collar de alta calidad para perros o gatos',
    price: 25,
    category: ServiceCategory.SPA,
    type: SpaServiceType.PET_PRODUCTS,
    available: true
  }
];

// Registros médicos de ejemplo
export const medicalRecords: MedicalRecord[] = [
  {
    id: 'm1',
    petId: '1',
    serviceId: 'c1',
    date: new Date('2023-10-15'),
    diagnosis: 'Saludable, necesita vacunas regulares',
    treatment: 'Vacunas anuales administradas',
    notes: 'Paciente tranquilo durante el procedimiento',
    cost: 80,
    veterinarianId: '3'
  },
  {
    id: 'm2',
    petId: '3',
    serviceId: 'c2',
    date: new Date('2023-11-05'),
    diagnosis: 'Irritación leve en la piel',
    treatment: 'Se recetó champú medicado',
    notes: 'Seguimiento en 2 semanas',
    cost: 50,
    veterinarianId: '3'
  }
];

// Reservas de hotel de ejemplo
export const hotelBookings: HotelBooking[] = [
  {
    id: 'b1',
    petId: '2',
    checkIn: new Date('2023-11-10'),
    checkOut: new Date('2023-11-15'),
    services: ['h1', 'h2', 'h3'],
    notes: 'Prefiere ambientes tranquilos',
    cost: 375,
    status: 'COMPLETED'
  },
  {
    id: 'b2',
    petId: '5',
    checkIn: new Date('2023-12-20'),
    checkOut: new Date('2023-12-27'),
    services: ['h1', 'h3'],
    notes: 'Requisitos especiales de dieta',
    cost: 420,
    status: 'PENDING'
  }
];

// Citas de spa de ejemplo
export const spaAppointments: SpaAppointment[] = [
  {
    id: 'a1',
    petId: '1',
    date: new Date('2023-11-20'),
    services: ['s1', 's3'],
    notes: 'Sensible alrededor de las orejas',
    cost: 60,
    status: 'COMPLETED'
  },
  {
    id: 'a2',
    petId: '4',
    date: new Date('2023-12-05'),
    services: ['s2'],
    notes: 'Muy activo, puede necesitar manejo extra',
    cost: 60,
    status: 'PENDING'
  }
];

// PQRs de ejemplo
export const pqrs: PQR[] = [
  {
    id: 'p1',
    customerId: '1',
    email: 'maria@example.com',
    type: 'COMPLAINT',
    category: ServiceCategory.HOTEL,
    subject: 'Limpieza de habitación',
    message: 'La habitación no estaba correctamente limpia a nuestra llegada',
    date: new Date('2023-11-16'),
    status: 'RESOLVED',
    response: 'Nos disculpamos por el inconveniente. Hemos hablado con nuestro personal de limpieza y ofrecemos un descuento en su próxima visita.',
    responseDate: new Date('2023-11-18')
  },
  {
    id: 'p2',
    email: 'anonimo@example.com',
    type: 'SUGGESTION',
    category: ServiceCategory.SPA,
    subject: 'Servicios adicionales de aseo',
    message: 'Sería excelente si pudieran ofrecer tratamientos especiales para mascotas mayores',
    date: new Date('2023-12-01'),
    status: 'PENDING'
  }
];

// Reportes de ejemplo
export const reports: Report[] = [
  {
    id: 'r1',
    name: 'Reporte Quincenal de PQRs',
    description: 'Lista de quejas y sugerencias de las últimas dos semanas',
    type: 'PQR',
    frequency: 'BIWEEKLY',
    lastGenerated: new Date('2023-12-01'),
    accessRoles: [UserRole.GENERAL_MANAGER]
  },
  {
    id: 'r2',
    name: 'Reporte Semanal de Servicios',
    description: 'Lista ordenada de servicios ofrecidos en la última semana',
    type: 'SERVICES',
    frequency: 'WEEKLY',
    lastGenerated: new Date('2023-12-07'),
    accessRoles: [UserRole.GENERAL_MANAGER, UserRole.HOTEL_EMPLOYEE, UserRole.CLINIC_ADMIN, UserRole.SPA_ASSISTANT]
  },
  {
    id: 'r3',
    name: 'Reporte de Razas Más Atendidas',
    description: 'Razas de mascotas más comunes atendidas',
    type: 'BREEDS',
    frequency: 'BIWEEKLY',
    lastGenerated: new Date('2023-12-01'),
    accessRoles: [UserRole.GENERAL_MANAGER, UserRole.HOTEL_EMPLOYEE]
  },
  {
    id: 'r4',
    name: 'Reporte de Ganancias',
    description: 'Ganancias quincenales por segmento de negocio',
    type: 'PROFIT',
    frequency: 'BIWEEKLY',
    lastGenerated: new Date('2023-12-01'),
    accessRoles: [UserRole.GENERAL_MANAGER]
  }
];