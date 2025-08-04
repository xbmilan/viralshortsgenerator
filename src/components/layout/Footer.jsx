import React from 'react';
import { APP_CONFIG } from '../../config/constants';

const Footer = () => {
  return (
    <footer className="bg-dark-navy2 border-t border-dark-navy3 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-purple mb-4">
            {APP_CONFIG.name}
          </div>
          <p className="text-light-gray mb-4">
            Create viral short-form content with AI-powered script generation
          </p>
          <div className="text-sm text-light-gray">
            © 2024 {APP_CONFIG.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
