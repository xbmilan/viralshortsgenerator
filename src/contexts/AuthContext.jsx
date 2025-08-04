import React, { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

const STORAGE_KEYS = {
  USER: 'viral_shorts_user',
  API_KEYS: 'viral_shorts_api_keys'
};

const ENCRYPTION_KEY = 'viral-shorts-secret-key-2024';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setLoading(false);
  }, []);

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
  };

  const decryptData = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  };

  const register = async (userData) => {
    const { email, password, confirmPassword, openaiKey, geminiKey } = userData;

    // Validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    if (!openaiKey) {
      throw new Error('OpenAI API key is required');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create user object
    const newUser = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
      scriptsGenerated: 0,
      scriptsLimit: 100
    };

    // Store user
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setUser(newUser);

    // Store encrypted API keys
    const apiKeys = { openai: openaiKey };
    if (geminiKey) {
      apiKeys.gemini = geminiKey;
    }
    
    const encryptedKeys = encryptData(apiKeys);
    localStorage.setItem(STORAGE_KEYS.API_KEYS, encryptedKeys);

    return newUser;
  };

  const login = async (email, password) => {
    // Validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, accept any valid email/password combination
    const user = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString(),
      scriptsGenerated: 0,
      scriptsLimit: 100
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    setUser(user);

    return user;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.API_KEYS);
    setUser(null);
  };

  const getApiKeys = () => {
    const encryptedKeys = localStorage.getItem(STORAGE_KEYS.API_KEYS);
    if (!encryptedKeys) return null;
    
    return decryptData(encryptedKeys);
  };

  const updateApiKeys = async (apiKeys) => {
    const { openaiKey, geminiKey } = apiKeys;

    if (!openaiKey) {
      throw new Error('OpenAI API key is required');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const keys = { openai: openaiKey };
    if (geminiKey) {
      keys.gemini = geminiKey;
    }

    const encryptedKeys = encryptData(keys);
    localStorage.setItem(STORAGE_KEYS.API_KEYS, encryptedKeys);
  };

  const updateScriptCount = () => {
    if (user) {
      const updatedUser = {
        ...user,
        scriptsGenerated: user.scriptsGenerated + 1
      };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    getApiKeys,
    updateApiKeys,
    updateScriptCount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
