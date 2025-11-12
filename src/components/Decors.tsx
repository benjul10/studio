import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, Search, Palette, Ruler, Calendar } from 'lucide-react';
import { mockDecors } from '../data/mockData';

export function Decors() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDecors = mockDecors.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Gestion des décors</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un décor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Ajouter un décor
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {mockDecors.filter(d => d.available).length}
            </div>
            <div className="text-sm text-muted-foreground">Disponibles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">
              {mockDecors.filter(d => !d.available).length}
            </div>
            <div className="text-sm text-muted-foreground">En cours d'utilisation</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {mockDecors.length}
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecors.map((decor) => (
          <Card key={decor.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{decor.name}</CardTitle>
                <Badge variant={decor.available ? "default" : "secondary"}>
                  {decor.available ? "Disponible" : "En cours"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Palette size={16} className="text-muted-foreground" />
                  <span>{decor.type}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Ruler size={16} className="text-muted-foreground" />
                  <span>{decor.dimensions}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: decor.color.toLowerCase() }}
                  ></div>
                  <span>{decor.color} - {decor.material}</span>
                </div>
                
                {decor.lastUsed && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>Dernière utilisation: {new Date(decor.lastUsed).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    disabled={!decor.available}
                  >
                    {decor.available ? 'Réserver' : 'En cours'}
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