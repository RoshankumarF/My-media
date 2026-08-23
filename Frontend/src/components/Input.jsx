import { useId } from 'react';

export default function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  className = '', 
  ...props 
}) {
  // Generates a unique ID so the label properly targets the input
  const id = useId();

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        {...props}
      />
    </div>
  );
}