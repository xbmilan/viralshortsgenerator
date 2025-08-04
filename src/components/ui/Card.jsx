import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-dark-navy2 border border-dark-navy3 rounded-xl p-6';
  const hoverClasses = hover ? 'hover:border-neon-purple/30 hover:shadow-lg hover:shadow-neon-purple/10' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;
  
  const CardComponent = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -2 },
    transition: { duration: 0.2 }
  } : {};
  
  return (
    <CardComponent 
      className={classes} 
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;
