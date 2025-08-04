import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { ROUTES, ANIMATION_VARIANTS } from '../config/constants';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    openaiKey: '',
    geminiKey: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData);
      navigate(ROUTES.dashboard);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-navy">
      <Header showAuth={false} />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-lg mx-auto"
          variants={ANIMATION_VARIANTS.fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <Card>
            <h1 className="text-3xl font-bold mb-6 text-center text-light-white">
              Create Your Account
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                disabled={loading}
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                helperText="Minimum 6 characters"
                required
                disabled={loading}
              />
              
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
              
              <div className="border-t border-dark-navy3 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-light-white">
                  API Configuration
                </h3>
                <p className="text-sm text-light-gray mb-4">
                  Add your API keys to enable script generation. Your keys are encrypted and stored securely.
                </p>
                
                <Input
                  label="OpenAI API Key"
                  type="password"
                  name="openaiKey"
                  value={formData.openaiKey}
                  onChange={handleChange}
                  placeholder="sk-..."
                  helperText="Required for script generation. Get yours at platform.openai.com"
                  required
                  disabled={loading}
                />
                
                <Input
                  label="Google Gemini API Key (Optional)"
                  type="password"
                  name="geminiKey"
                  value={formData.geminiKey}
                  onChange={handleChange}
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
              
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                Create Account & Start Generating
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-light-gray">
                Already have an account?{' '}
                <Link to={ROUTES.login} className="text-neon-purple hover:text-neon-teal transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationPage;
