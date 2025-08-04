import React, { useState } from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { APP_CONFIG } from '../config/constants';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Input from './ui/Input';

const UserHeader = () => {
  const { user, logout, getApiKeys, updateApiKeys } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeys, setApiKeys] = useState(() => {
    const keys = getApiKeys();
    return {
      openaiKey: keys?.openai || '',
      geminiKey: keys?.gemini || ''
    };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateKeys = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateApiKeys(apiKeys);
      setSuccess('API keys updated successfully!');
      setTimeout(() => {
        setSuccess('');
        setShowSettings(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-dark-navy2 border-b border-dark-navy3">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple">
                {APP_CONFIG.name}
              </h1>
              <div className="text-sm text-light-gray">
                Welcome back, {user?.email}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2"
              >
                <FaCog />
                <span>Settings</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Account Settings"
        size="md"
      >
        <form onSubmit={handleUpdateKeys} className="space-y-6">
          <div className="space-y-4">
            <div className="text-sm text-light-gray">
              <p className="mb-2">Update your API keys to continue generating scripts.</p>
              <p className="text-xs">Your keys are encrypted and stored securely.</p>
            </div>

            <Input
              label="OpenAI API Key"
              type="password"
              value={apiKeys.openaiKey}
              onChange={(e) => setApiKeys(prev => ({ ...prev, openaiKey: e.target.value }))}
              placeholder="sk-..."
              helperText="Required for script generation"
              disabled={loading}
            />

            <Input
              label="Google Gemini API Key (Optional)"
              type="password"
              value={apiKeys.geminiKey}
              onChange={(e) => setApiKeys(prev => ({ ...prev, geminiKey: e.target.value }))}
              placeholder="Enter your Gemini API key"
              helperText="Optional - for enhanced script generation"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 text-sm">
              {success}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowSettings(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Update Keys
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserHeader;
