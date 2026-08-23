import Header from '../components/Header.jsx';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-6">Recommended for you</h2>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="flex flex-col gap-3">
              <div className="w-full aspect-video bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"></div>
              <div>
                <h3 className="font-semibold line-clamp-2">Understanding Backend Architecture {item}</h3>
                <p className="text-sm text-gray-500 mt-1">Code Master • 10K views</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}