import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {

  const [UserName,setUserName]=useState("");
  const [password,setPassword]=useState("");

  const {loading,login}=useLogin();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(UserName,password)
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
          <span className='text-blue-500'>  ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>UserName</span>
            </label>
            <input type="text" placeholder="Username" className="input input-bordered input-primary w-full max-w-xs" 
            value={UserName}
            onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder="password" className="input input-bordered input-primary w-full max-w-xs" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <Link to="/signup" className='text-sm hover: underline hover:text-blue-600 mt-2 inline-block'>
            don't have an account? 
          </Link>

          <div>
          <button className="btn btn-primary btn-block"
            disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Login"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;