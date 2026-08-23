import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import Footer from '../components/Footer/Footer';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Main Content Area - Centered Card */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          
          {/* Header inside the card */}
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-center text-gray-500 text-sm mb-8">Sign in to continue to MyMedia</p>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <Input 
              label="username" 
              type="text" 
              placeholder="username" 
              required 
            />
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="you@example.com" 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
            
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Reusable Button! */}
            <Button type="submit" variant="primary" className="w-full">
              Sign In
            </Button>
          </form>

          {/* Toggle to Register */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-semibold text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </main>

      {/* Standard Footer at the bottom */}
      <Footer />
    </div>
  );
}