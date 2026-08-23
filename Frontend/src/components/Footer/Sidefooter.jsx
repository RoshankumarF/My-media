export default function SidebarFooter() {
  return (
    <div className="px-6 py-4 mt-auto border-t border-gray-200">
      <div className="flex flex-wrap gap-2 text-[13px] font-semibold text-gray-600 mb-4">
        <a href="#" className="hover:text-gray-900">About</a>
        <a href="#" className="hover:text-gray-900">Press</a>
        <a href="#" className="hover:text-gray-900">Copyright</a>
        <a href="#" className="hover:text-gray-900">Contact us</a>
        <a href="#" className="hover:text-gray-900">Creators</a>
      </div>
      
      <div className="flex flex-wrap gap-2 text-[13px] font-semibold text-gray-600 mb-4">
        <a href="#" className="hover:text-gray-900">Terms</a>
        <a href="#" className="hover:text-gray-900">Privacy</a>
        <a href="#" className="hover:text-gray-900">Policy & Safety</a>
      </div>

      <p className="text-xs text-gray-400 font-normal">
        © 2026 MyMedia LLC
      </p>
    </div>
  );
}