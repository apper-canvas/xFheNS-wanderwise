import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Map, Home, Compass, Clock, User, Settings } from 'lucide-react';
import Destinations from './pages/Destinations';
import HomePage from './pages/Home';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <Compass className="text-blue-600 h-6 w-6" />
                <span className="font-bold text-xl text-gray-900">WanderWise</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Home</Link>
                <Link to="/destinations" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Destinations</Link>
                <Link to="/trips" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Trips</Link>
                <Link to="/guides" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Travel Guides</Link>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors py-2">About</Link>
              </nav>

              {/* User Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </div>

              {/* Mobile menu button */}
              <button 
                className="md:hidden text-gray-600 focus:outline-none" 
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white">
              <div className="container mx-auto px-4 py-3 space-y-3">
                <Link to="/" className="block text-gray-600 hover:text-blue-600 py-2" onClick={toggleMenu}>Home</Link>
                <Link to="/destinations" className="block text-gray-600 hover:text-blue-600 py-2" onClick={toggleMenu}>Destinations</Link>
                <Link to="/trips" className="block text-gray-600 hover:text-blue-600 py-2" onClick={toggleMenu}>Trips</Link>
                <Link to="/guides" className="block text-gray-600 hover:text-blue-600 py-2" onClick={toggleMenu}>Travel Guides</Link>
                <Link to="/about" className="block text-gray-600 hover:text-blue-600 py-2" onClick={toggleMenu}>About</Link>
                <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-left">
                    Sign In
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-left">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/trips" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Trips Page</h1></div>} />
            <Route path="/guides" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Travel Guides Page</h1></div>} />
            <Route path="/about" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">About Page</h1></div>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">WanderWise</h3>
                <p className="text-gray-400 text-sm">
                  Discover amazing destinations and plan your next adventure with confidence.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Explore</h4>
                <ul className="space-y-2">
                  <li><Link to="/destinations" className="text-gray-400 hover:text-white text-sm">Destinations</Link></li>
                  <li><Link to="/trips" className="text-gray-400 hover:text-white text-sm">Trips</Link></li>
                  <li><Link to="/guides" className="text-gray-400 hover:text-white text-sm">Travel Guides</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
                  <li><Link to="/careers" className="text-gray-400 hover:text-white text-sm">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
                  <li><Link to="/cookies" className="text-gray-400 hover:text-white text-sm">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">© 2023 WanderWise. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;