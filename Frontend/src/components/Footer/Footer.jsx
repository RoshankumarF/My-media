export default function Footer() {
  return (
    <footer className="w-full py-6 bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left side: Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} MyMedia. All rights reserved.
        </p>

        {/* Right side: Links */}
        <div className="flex space-x-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">Help</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
        </div>

      </div>
    </footer>
  );
}