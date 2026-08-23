export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  isloading=false,
  disabled,
  ...props // Grabs any other HTML attributes like onClick, disabled, etc.
}) {
  
  // Base styles applied to EVERY button
  const baseStyles = "px-4 py-2 font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variant styles based on what is passed in
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  };

  const isDisabled=isloading || disabled

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={isDisabled}
      {...props}
    >

      {isloading && (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}