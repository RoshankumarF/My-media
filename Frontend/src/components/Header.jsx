import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import { api } from '../api';

export default function Header({ isLoggedIn ,setIsLoggedIn }) {
 

 
  const handleLogout = async  () => {

    await api.post("v1/user/logout");
     
   
    
    
    setIsLoggedIn(false);
     
    navigate('/login'); 
  };

  
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200">
      
      <Link to="/" className="hover:opacity-90 transition-opacity">
        <Logo />
      </Link>
      
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <input 
          type="text" 
          placeholder="Search videos or tweets..." 
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
        />
        <button className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
          🔍
        </button>
      </div>

      {/* CONDITIONAL RENDERING: Logged In vs Logged Out */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {/* YouTube-style Video Upload Button */}
            <Link to="/upload" className="hidden sm:block">
              <Button variant="outline" className="text-sm border-gray-300">
                🎬 Post Video
              </Button>
            </Link>
            
            {/* User Profile Avatar */}
            <Link to="/profile">

            {user?.avatar?(<img src={user.avatar}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all"
            />
            
          ):(
            <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer">
                   
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>

          )}
              <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">
                U
              </div>
            </Link>
            <button 
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors hidden sm:block">
              Log in
            </Link>
            <Link to="/register">
              <Button variant="primary">Sign up</Button>
            </Link>
          </>
        )}
      </div>

    </header>
  );
}