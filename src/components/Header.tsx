
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Phone, Shield, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'py-2 glassmorphism shadow-sm' : 'py-4 bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg overflow-hidden transition-all duration-300 group-hover:bg-primary/20">
            <Shield size={24} className="text-primary transform transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="font-semibold text-xl tracking-tight">AI Distress</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-neutral-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-neutral-700 hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/about" className="text-neutral-700 hover:text-primary transition-colors">
            About
          </Link>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emergency-600 text-white hover:bg-emergency-700 transition-colors">
            <Phone size={16} />
            <span>Emergency</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-primary"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          'md:hidden absolute top-full left-0 right-0 glassmorphism shadow-lg overflow-hidden transition-all duration-300 ease-in-out',
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col py-4 px-4 space-y-4">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-md hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="px-4 py-2 rounded-md hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className="px-4 py-2 rounded-md hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <button 
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-emergency-600 text-white hover:bg-emergency-700 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Phone size={16} />
            <span>Emergency</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
