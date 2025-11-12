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
import { Plus, Search, Package } from 'lucide-react';
import { mockArticles } from '../data/mockData';

export function Articles() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredArticles = mockArticles.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">Bon</Badge>;
      case 'fair':
        return <Badge className="bg-orange-100 text-orange-800">Correct</Badge>;
      case 'poor':
        return <Badge className="bg-red-100 text-red-800">Mauvais</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Gestion des articles</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Ajouter un article
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {['Caméra', 'Objectif', 'Éclairage', 'Accessoire'].map((category) => {
          const count = mockArticles.filter(a => a.category === category).length;
          return (
            <Card key={category}>
              <CardContent className="p-6 text-center">
                <Package className="mx-auto mb-2 text-muted-foreground" size={24} />
                <div className="text-2xl font-bold text-blue-600 mb-1">{count}</div>
                <div className="text-sm text-muted-foreground">{category}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventaire des articles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>État</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      article.quantity > 5 ? 'text-green-600' :
                      article.quantity > 2 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {article.quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getConditionBadge(article.condition)}
                  </TableCell>
                  <TableCell>{article.location}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm">
                        Utiliser
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