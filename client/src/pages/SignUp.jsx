import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {useState} from 'react'

export default function SignUp() {

  const [formData,setFormData]=useState({});
  const [loading, setLoading]=useState(false);
  const [error, setError]= useState(null);
  const navigate=useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
    
  }
  const handleSubmit=async (e)=>{
    setLoading(true);
    e.preventDefault();
    const res= await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),

      });
      const data =await res.json();
      console.log(data);
      if(res.status>=200 && res.status<300){
        setLoading(false);
        setError(null);
        console.log("Sign up successful");
        navigate('/sign-in');
      }else{
        setLoading(false);
        setError(data.message);
      }
    }
  
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center m-7 font-semibold">Sign Up</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" onChange={handleChange}></input>
        <input type="text" placeholder="email" className="border p-3 rounded-lg" id="email"  onChange={handleChange}></input>
        <input type="password" placeholder="passwords" className="border p-3 rounded-lg" id="password"  onChange={handleChange}></input>
        <button disabled={loading} type="submit" className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80 transition">{loading ? 'Loading...':'Sign up'}</button>
      </form>
      
      <div className=" flex gap-2 mt-5">
        <p>Have an account? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}

    </div>
  )
}
