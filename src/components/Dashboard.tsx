import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Camera, Users, MapPin, Palette } from 'lucide-react';
import { mockShootings, mockPrestataires } from '../data/mockData';

interface DashboardProps {
  onNewShooting: () => void;
  onAddDecor: () => void;
}

export function Dashboard({ onNewShooting, onAddDecor }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayShootings = mockShootings.filter(s => s.date === today);
  const weekShootings = mockShootings.filter(s => {
    const shootingDate = new Date(s.date);
    const todayDate = new Date();
    const weekFromNow = new Date(todayDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return shootingDate >= todayDate && shootingDate <= weekFromNow;
  });
  const availablePrestataires = mockPrestataires.filter(p => p.availability === 'available');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Tableau de bord</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shootings aujourd'hui</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayShootings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shootings cette semaine</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weekShootings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prestataires disponibles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availablePrestataires.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artistes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex gap-4">
        <Button 
          onClick={onNewShooting}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Nouveau shooting
        </Button>
        <Button 
          onClick={onAddDecor}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Ajouter un décor
        </Button>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Prochains shootings</h3>
        <div className="space-y-3">
          {mockShootings.slice(0, 5).map((shooting) => (
            <Card key={shooting.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{shooting.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(shooting.date).toLocaleDateString('fr-FR')} à {shooting.time} - {shooting.photographer}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      shooting.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      shooting.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {shooting.status === 'planned' ? 'Planifié' :
                       shooting.status === 'ongoing' ? 'En cours' : 'Terminé'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}