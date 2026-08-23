
export default function Logo() {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">▶</span>
      </div>
      <span className="text-xl font-bold tracking-tight">My-Media</span>
    </div>
  );
}