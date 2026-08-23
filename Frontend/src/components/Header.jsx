import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button'; // Importing our reusable button!

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200">
      
      {/* 1. Clickable Logo taking you Home */}
      <Link to="/" className="hover:opacity-90 transition-opacity">
        <Logo />
      </Link>
      
      {/* 2. Search Bar (Centered) */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <input 
          type="text" 
          placeholder="Search videos..." 
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
        />
        <button className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
          🔍
        </button>
      </div>

      {/* 3. Authentication Links */}
      <div className="flex items-center gap-4">
        {/* Simple text link for Login */}
        <Link 
          to="/login" 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors hidden sm:block"
        >
          Log in
        </Link>
        
        {/* Reusable Button wrapped in a Link for Register */}
        <Link to="/register">
          <Button variant="primary">
            Sign up
          </Button>
        </Link>
      </div>

    </header>
  );
}