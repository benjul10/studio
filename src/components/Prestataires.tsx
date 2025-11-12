import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Plus, Search, Phone, Mail, Star } from 'lucide-react';
import { mockPrestataires } from '../data/mockData';

export function Prestataires() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPrestataires = mockPrestataires.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Disponible</Badge>;
      case 'busy':
        return <Badge className="bg-orange-100 text-orange-800">Occupé</Badge>;
      case 'unavailable':
        return <Badge className="bg-red-100 text-red-800">Indisponible</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Gestion des prestataires</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un prestataire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Ajouter prestataires
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {mockPrestataires.filter(p => p.availability === 'available').length}
            </div>
            <div className="text-sm text-muted-foreground">Disponibles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {mockPrestataires.filter(p => p.availability === 'busy').length}
            </div>
            <div className="text-sm text-muted-foreground">Occupés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {mockPrestataires.length}
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des prestataires</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Spécialité</TableHead>
                <TableHead>Disponibilité</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrestataires.map((prestataire) => (
                <TableRow key={prestataire.id}>
                  <TableCell className="font-medium">{prestataire.name}</TableCell>
                  <TableCell>{prestataire.specialty}</TableCell>
                  <TableCell>
                    {getAvailabilityBadge(prestataire.availability)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span>{prestataire.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} />
                        {prestataire.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} />
                        {prestataire.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        Planning
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}