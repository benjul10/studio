export interface Shooting {
  id: string;
  title: string;
  date: string;
  time: string;
  photographer: string;
  location: string;
  status: 'planned' | 'ongoing' | 'completed';
  type: 'commercial' | 'portrait' | 'event' | 'product';
}

export interface Prestataire {
  id: string;
  name: string;
  specialty: string;
  availability: 'available' | 'busy' | 'unavailable';
  phone: string;
  email: string;
  rating: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  capacity: number;
  equipment: string[];
  pricePerHour: number;
  available: boolean;
}

export interface Article {
  id: string;
  name: string;
  category: string;
  quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  location: string;
}

export interface Decor {
  id: string;
  name: string;
  type: string;
  dimensions: string;
  color: string;
  material: string;
  available: boolean;
  lastUsed?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'photographer' | 'assistant';
}