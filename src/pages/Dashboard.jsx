import React from 'react';
import { useAuth } from '../hooks/useAuth';
import UserHeader from '../components/UserHeader';
import ScriptGenerator from '../components/features/ScriptGenerator';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark-navy">
      <UserHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-light-white mb-2">
            Script Generator Dashboard
          </h1>
          <p className="text-light-gray">
            Generate viral scripts for your social media content
          </p>
        </div>
        
        <ScriptGenerator />
      </main>
    </div>
  );
};

export default Dashboard;
