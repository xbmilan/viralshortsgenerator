import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { APP_CONFIG, ROUTES, ANIMATION_VARIANTS } from '../config/constants';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-dark-navy">
      <Header showAuth={false} />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-md mx-auto"
          variants={ANIMATION_VARIANTS.fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center">
            <h1 className="text-3xl font-bold mb-6 text-light-white">
              Choose Your Plan
            </h1>
            
            <div className="mb-8">
              <div className="text-5xl font-bold mb-2 text-neon-purple">
                ${APP_CONFIG.pricing.amount}
              </div>
              <p className="text-light-gray">per month</p>
            </div>
            
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-center text-light-gray">
                <span className="text-neon-teal mr-3">✓</span>
                {APP_CONFIG.pricing.scriptsPerMonth} scripts per month
              </li>
              <li className="flex items-center text-light-gray">
                <span className="text-neon-teal mr-3">✓</span>
                All platform support (TikTok, Instagram, YouTube, Facebook)
              </li>
              <li className="flex items-center text-light-gray">
                <span className="text-neon-teal mr-3">✓</span>
                Multiple content styles
              </li>
              <li className="flex items-center text-light-gray">
                <span className="text-neon-teal mr-3">✓</span>
                Custom hooks & CTAs
              </li>
              <li className="flex items-center text-light-gray">
                <span className="text-neon-teal mr-3">✓</span>
                AI-powered script generation
              </li>
            </ul>
            
            <Link to={ROUTES.register}>
              <Button size="lg" className="w-full mb-4">
                Continue to Registration
              </Button>
            </Link>
            
            <p className="text-sm text-light-gray">
              Already have an account?{' '}
              <Link to={ROUTES.login} className="text-neon-purple hover:text-neon-teal transition-colors">
                Sign in here
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
