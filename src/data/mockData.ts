import { Shooting, Prestataire, Location, Article, Decor } from '../types';

export const mockShootings: Shooting[] = [
  {
    id: '1',
    title: 'Shooting Portrait',
    date: '2024-04-12',
    time: '14:00',
    photographer: 'Sophie Martin',
    location: 'Studio A',
    status: 'planned',
    type: 'portrait'
  },
  {
    id: '2',
    title: 'Shooting Produit',
    date: '2024-04-12',
    time: '16:00',
    photographer: 'Lucas Dubois',
    location: 'Studio B',
    status: 'planned',
    type: 'product'
  },
  {
    id: '3',
    title: 'Shooting Commercial',
    date: '2024-04-15',
    time: '10:00',
    photographer: 'Emma Lefavre',
    location: 'Studio C',
    status: 'planned',
    type: 'commercial'
  },
  {
    id: '4',
    title: 'Shooting Événement',
    date: '2024-04-18',
    time: '09:00',
    photographer: 'Thomas Bernard',
    location: 'Extérieur',
    status: 'planned',
    type: 'event'
  },
  {
    id: '5',
    title: 'Shooting Mode',
    date: '2024-04-20',
    time: '14:00',
    photographer: 'Clarie Moreau',
    location: 'Studio A',
    status: 'planned',
    type: 'commercial'
  }
];

export const mockPrestataires: Prestataire[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    specialty: 'Photographe',
    availability: 'available',
    phone: '06 12 34 56 78',
    email: 'sophie.martin@studio.com',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Lucas Dubois',
    specialty: 'Prestataire Photographe',
    availability: 'available',
    phone: '06 23 45 67 89',
    email: 'lucas.dubois@studio.com',
    rating: 4.6
  },
  {
    id: '3',
    name: 'Emma Lefavre',
    specialty: 'Décorateur',
    availability: 'available',
    phone: '06 34 56 78 90',
    email: 'emma.lefavre@studio.com',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Thomas Bernard',
    specialty: 'Décorateur',
    availability: 'available',
    phone: '06 45 67 89 01',
    email: 'thomas.bernard@studio.com',
    rating: 4.7
  },
  {
    id: '5',
    name: 'Clarie Moreau',
    specialty: 'Clans Moxtod',
    availability: 'busy',
    phone: '06 56 78 90 12',
    email: 'clarie.moreau@studio.com',
    rating: 4.5
  }
];

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Studio A',
    address: '123 Rue de la Photo, Paris',
    capacity: 10,
    equipment: ['Éclairage LED', 'Fond blanc', 'Trépied professionnel'],
    pricePerHour: 80,
    available: true
  },
  {
    id: '2',
    name: 'Studio B',
    address: '456 Avenue de l\'Image, Paris',
    capacity: 15,
    equipment: ['Éclairage continu', 'Fond coloré', 'Réflecteurs'],
    pricePerHour: 100,
    available: true
  },
  {
    id: '3',
    name: 'Studio C',
    address: '789 Boulevard du Cadre, Paris',
    capacity: 20,
    equipment: ['Éclairage studio', 'Cyclorama', 'Rails de suspension'],
    pricePerHour: 120,
    available: false
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    name: 'Appareil photo Canon EOS R5',
    category: 'Caméra',
    quantity: 3,
    condition: 'excellent',
    location: 'Studio A'
  },
  {
    id: '2',
    name: 'Objectif 85mm f/1.4',
    category: 'Objectif',
    quantity: 2,
    condition: 'good',
    location: 'Studio B'
  },
  {
    id: '3',
    name: 'Kit éclairage LED',
    category: 'Éclairage',
    quantity: 5,
    condition: 'excellent',
    location: 'Studio A'
  },
  {
    id: '4',
    name: 'Trépied carbone',
    category: 'Accessoire',
    quantity: 8,
    condition: 'good',
    location: 'Studio C'
  }
];

export const mockDecors: Decor[] = [
  {
    id: '1',
    name: 'Fond blanc seamless',
    type: 'Fond',
    dimensions: '3m x 6m',
    color: 'Blanc',
    material: 'Papier',
    available: true,
    lastUsed: '2024-04-10'
  },
  {
    id: '2',
    name: 'Décor urbain',
    type: 'Décor thématique',
    dimensions: '4m x 3m',
    color: 'Gris',
    material: 'Bois peint',
    available: true,
    lastUsed: '2024-04-08'
  },
  {
    id: '3',
    name: 'Fond dégradé bleu',
    type: 'Fond',
    dimensions: '2.5m x 4m',
    color: 'Bleu',
    material: 'Tissu',
    available: false,
    lastUsed: '2024-04-11'
  }
];