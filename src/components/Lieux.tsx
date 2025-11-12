import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, Search, MapPin, Users, Euro } from 'lucide-react';
import { mockLocations } from '../data/mockData';

export function Lieux() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLocations = mockLocations.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Gestion des lieux</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un lieu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Ajouter un lieu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <Card key={location.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{location.name}</CardTitle>
                <Badge variant={location.available ? "default" : "secondary"}>
                  {location.available ? "Disponible" : "Occupé"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>{location.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users size={16} className="text-muted-foreground" />
                  <span>Capacité: {location.capacity} personnes</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Euro size={16} className="text-muted-foreground" />
                  <span>{location.pricePerHour}€/heure</span>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Équipements:</p>
                  <div className="flex flex-wrap gap-1">
                    {location.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Réserver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}