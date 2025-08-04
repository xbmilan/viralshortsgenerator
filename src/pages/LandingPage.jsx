import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaRocket, FaUsers, FaChartLine } from 'react-icons/fa';
import { APP_CONFIG, ROUTES, ANIMATION_VARIANTS } from '../config/constants';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LandingPage = () => {
  const features = [
    {
      icon: <FaRocket className="text-neon-purple" />,
      title: 'AI-Powered Scripts',
      description: 'Generate viral-ready scripts using advanced AI technology tailored for each platform.'
    },
    {
      icon: <FaUsers className="text-neon-teal" />,
      title: 'Multi-Platform Support',
      description: 'Create optimized content for TikTok, Instagram, YouTube, and Facebook.'
    },
    {
      icon: <FaChartLine className="text-neon-purple" />,
      title: 'Proven Templates',
      description: 'Built on viral content patterns and engagement-driving formulas.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-navy">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-purple leading-tight"
            variants={ANIMATION_VARIANTS.fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
          >
            Create Viral Short-Form Content in Seconds
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-light-gray mb-8 leading-relaxed"
            variants={ANIMATION_VARIANTS.fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Generate engaging scripts for TikTok, Instagram Reels, YouTube Shorts, and Facebook with AI-powered creativity
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={ANIMATION_VARIANTS.fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to={ROUTES.signup}>
              <Button size="xl" className="w-full sm:w-auto">
                Start Creating Now
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2 text-light-gray">
              <FaPlay className="text-neon-teal" />
              <span>Watch Demo</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            variants={ANIMATION_VARIANTS.fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="inline-flex items-center space-x-4 bg-dark-navy2 rounded-full px-6 py-3 border border-dark-navy3">
              <span className="text-light-gray">Trusted by 10,000+ creators</span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-cta rounded-full border-2 border-dark-navy" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          className="text-center mb-16"
          variants={ANIMATION_VARIANTS.fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-light-white">
            Everything You Need to Go Viral
          </h2>
          <p className="text-xl text-light-gray max-w-2xl mx-auto">
            Our AI understands what makes content viral and helps you create scripts that engage and convert
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS.fadeIn}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
            >
              <Card hover className="text-center h-full">
                <div className="text-4xl mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-light-white">
                  {feature.title}
                </h3>
                <p className="text-light-gray">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          className="text-center mb-16"
          variants={ANIMATION_VARIANTS.fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-light-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-light-gray">
            One plan, unlimited possibilities
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-md mx-auto"
          variants={ANIMATION_VARIANTS.scaleIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <Card className="text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-cta"></div>
            <div className="py-8">
              <h3 className="text-2xl font-bold mb-2 text-light-white">Pro Plan</h3>
              <div className="text-5xl font-bold mb-2 text-neon-purple">
                ${APP_CONFIG.pricing.amount}
              </div>
              <p className="text-light-gray mb-6">per month</p>
              
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center text-light-gray">
                  <span className="text-neon-teal mr-3">✓</span>
                  {APP_CONFIG.pricing.scriptsPerMonth} scripts per month
                </li>
                <li className="flex items-center text-light-gray">
                  <span className="text-neon-teal mr-3">✓</span>
                  All platform support
                </li>
                <li className="flex items-center text-light-gray">
                  <span className="text-neon-teal mr-3">✓</span>
                  Multiple content styles
                </li>
                <li className="flex items-center text-light-gray">
                  <span className="text-neon-teal mr-3">✓</span>
                  Custom hooks & CTAs
                </li>
              </ul>
              
              <Link to={ROUTES.signup}>
                <Button size="lg" className="w-full">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          className="text-center bg-gradient-to-r from-neon-purple/10 to-neon-teal/10 rounded-3xl p-12 border border-neon-purple/20"
          variants={ANIMATION_VARIANTS.fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-light-white">
            Ready to Create Viral Content?
          </h2>
          <p className="text-xl text-light-gray mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using AI to generate engaging scripts and grow their audience
          </p>
          <Link to={ROUTES.signup}>
            <Button size="xl">
              Start Your Free Trial
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
