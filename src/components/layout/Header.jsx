import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, ROUTES } from '../../config/constants';
import Button from '../ui/Button';

const Header = ({ showAuth = true }) => {
  return (
    <header className="bg-dark-navy2/80 backdrop-blur-sm border-b border-dark-navy3 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={ROUTES.home} className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-purple">
              {APP_CONFIG.name}
            </div>
          </Link>
          
          {showAuth && (
            <div className="flex items-center space-x-4">
              <Link to={ROUTES.login}>
                <Button variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link to={ROUTES.signup}>
                <Button>
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
