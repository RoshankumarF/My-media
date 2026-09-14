 import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import Footer from '../components/Footer/Footer';
import { api } from '../api.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const navigate=useNavigate()

  const [isLoading,setLoading]=useState(false)
 
  const handleSubmit = async  (e) => {
    e.preventDefault();

      const formData=new FormData(e.currentTarget)
      try {
        setLoading(true);
        const response= await  api.post("/v1/user/register",formData)
        console.log("user created successfully",response.data)
        navigate("/login")
        
      } catch (error) {
        if(error.response){
        console.error("Registration failed : ",error.response.data)
        alert(error.response.data.message || "Registration failed ,please try again")
        }else if (error.request) {
        
        console.error("Network error:", error.request);
        alert("Could not connect to the server. Is the backend running?");
      } else {
        
        console.error("Error:", error.message);
      }
      
       
    }  finally{
        setLoading(false)
      }
        
      
   
    console.log("Form submitted!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Create your account</h1>

         <p className="text-center text-gray-500 text-sm mb-8">
            {isLoading ? "Setting up your profile, please wait..." : "Start sharing on MyMedia today"}
          </p>

 
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Full Name" 
                name="fullName"
                type="text" 
                placeholder="Full Name" 
                required 
              />
              <Input 
                label="Username" 
                name="username"
                type="text" 
                placeholder="user123" 
                required
              />
            </div>

            <Input 
              label="Email Address" 
              name="email"
              type="email" 
              placeholder="you@example.com" 
              required 
            />
            
            <Input 
              label="Password" 
              name="password"
              type="password" 
              placeholder="Create a strong password" 
              required 
            />

            {/* File Inputs for req.files / multer */}
            <div className="pt-2 border-t border-gray-100 mt-4 space-y-4">
              <p className="text-sm font-semibold text-gray-700">Profile Assets</p>
              
              <Input 
                label="Avatar Image" 
                name="avatar"
                type="file" 
                accept="image/*" // This tells the browser to only allow image files
                required
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              
              <Input 
                label="Cover Image" 
                name="coverImage"
                type="file" 
                accept="image/*"
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
            
            <Button type="submit" variant="primary" className="w-full mt-6" isloading={isLoading}>
              Create Account
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}