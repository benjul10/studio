import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { mockShootings } from '../data/mockData';

export function Planning() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getShootingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockShootings.filter(s => s.date === dateStr);
  };

  const selectedDateShootings = selectedDate ? getShootingsForDate(selectedDate) : [];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Planning</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="outline" size="sm" onClick={goToNextMonth}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
              modifiers={{
                hasShootings: (date) => getShootingsForDate(date).length > 0
              }}
              modifiersStyles={{
                hasShootings: { 
                  backgroundColor: '#3b82f6', 
                  color: 'white',
                  fontWeight: 'bold'
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedDate 
                  ? `Shootings du ${selectedDate.toLocaleDateString('fr-FR')}`
                  : 'Sélectionnez une date'
                }
              </CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus size={16} className="mr-2" />
                Nouveau
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedDateShootings.length > 0 ? (
              <div className="space-y-3">
                {selectedDateShootings.map((shooting) => (
                  <div 
                    key={shooting.id}
                    className="p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{shooting.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {shooting.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      📸 {shooting.photographer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      📍 {shooting.location}
                    </p>
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        shooting.type === 'portrait' ? 'bg-purple-100 text-purple-800' :
                        shooting.type === 'product' ? 'bg-green-100 text-green-800' :
                        shooting.type === 'commercial' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {shooting.type === 'portrait' ? 'Portrait' :
                         shooting.type === 'product' ? 'Produit' :
                         shooting.type === 'commercial' ? 'Commercial' : 'Événement'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar size={48} className="mx-auto mb-4" />
                <p>Aucun shooting prévu pour cette date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Vue d'ensemble du planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {mockShootings.filter(s => s.type === 'portrait').length}
                </div>
                <div className="text-sm text-muted-foreground">Portraits</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {mockShootings.filter(s => s.type === 'product').length}
                </div>
                <div className="text-sm text-muted-foreground">Produits</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {mockShootings.filter(s => s.type === 'commercial').length}
                </div>
                <div className="text-sm text-muted-foreground">Commerciaux</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}