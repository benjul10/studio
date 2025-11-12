import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Planning } from './components/Planning';
import { Prestataires } from './components/Prestataires';
import { Lieux } from './components/Lieux';
import { Articles } from './components/Articles';
import { Decors } from './components/Decors';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (email: string, password: string) => {
    // Simulation de la connexion
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection('dashboard');
  };

  const handleNewShooting = () => {
    setActiveSection('planning');
  };

  const handleAddDecor = () => {
    setActiveSection('decors');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard 
            onNewShooting={handleNewShooting}
            onAddDecor={handleAddDecor}
          />
        );
      case 'planning':
        return <Planning />;
      case 'prestataires':
        return <Prestataires />;
      case 'lieux':
        return <Lieux />;
      case 'articles':
        return <Articles />;
      case 'decors':
        return <Decors />;
      default:
        return (
          <Dashboard 
            onNewShooting={handleNewShooting}
            onAddDecor={handleAddDecor}
          />
        );
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}