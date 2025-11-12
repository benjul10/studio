import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MapPin, 
  Package, 
  Palette,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'planning', label: 'Planning', icon: Calendar },
  { id: 'prestataires', label: 'Prestataires', icon: Users },
  { id: 'lieux', label: 'Lieux', icon: MapPin },
  { id: 'articles', label: 'Articles', icon: Package },
  { id: 'decors', label: 'Décors', icon: Palette },
];

export function Sidebar({ activeSection, onSectionChange, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-700 text-white min-h-screen flex flex-col">
      <div className="p-4 bg-slate-800">
        <h1 className="text-lg font-medium">Gestion Studio Photo</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 transition-colors ${
                  activeSection === item.id 
                    ? 'bg-slate-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-600 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
      
      <div className="p-4 border-t border-slate-600">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-600"
        >
          <LogOut size={20} className="mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}