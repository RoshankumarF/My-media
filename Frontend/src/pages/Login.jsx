import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import Footer from '../components/Footer/Footer';
import {useNavigate} from 'react-router-dom'
import {api} from "../api.js"
import { useState } from 'react';
export default function Login({setIsLoggedIn}) {
  const navigate=useNavigate()

  const [isLoading,setLoading]=useState(false)

  const handleSubmit =async (e)=>{
    e.preventDefault();

    

  const formData= new FormData(e.currentTarget)

  const loginCredentials =Object.fromEntries(formData)
  try {
    setLoading(true)
   
    const response = await api.post("/v1/user/login",loginCredentials)

    

     

    setIsLoggedIn(true);

    
    navigate('/');
    
  } catch (error) {
    if(error.response){
      console.log("Login failed",error.response.data);
      alert(error.response.data.message|| "invalid email or password")
    }else{
      console.log(error.message)
              

      alert("could not connect to the server")
    }
    
  }finally{
    setLoading(false);
  }
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
   
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          
         
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-center text-gray-500 text-sm mb-8">Sign in to continue to MyMedia</p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
              <Input 
              label="username" 
              name="username"
              type="text" 
              placeholder="username" 
              required 
            />
            <Input 
              label="Email Address" 
              type="email"
              name="email" 
              placeholder="you@example.com" 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              name="password"
              placeholder="••••••••" 
              required 
            />
            
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

         
            <Button type="submit" variant="primary" className="w-full" isloading={isLoading}>
              {isLoading ? "Signing... ": "Sign in"}
              
            </Button>
          </form>

          
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-semibold text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </main>

 
      <Footer />
    </div>
  );
}