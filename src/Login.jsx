import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


const Login = () => {
  const navigate = useNavigate()

  const [user_name, setName] = useState('');
  const [user_password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    if (!user_name || !user_password) {
      setError('Please fill in all fields');
      return;
    }
    navigate('/projectList')
 
    const payload = {user_name, user_password}
  
    let result = await fetch("http://localhost:3003/api/core/login",{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(payload)
    })
    
    result = await result.json() 
    sessionStorage.setItem("access_token", result.data);
  };

  return (
    <div className="container">
      <div className="formbox">

        <h1 className="title">Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-at"></i>
              <FaUser />
              <input
                type="name"
                placeholder="Name"
                value={user_name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-key"></i>
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Password"
                value={user_password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div style={{ color: 'red' }}>{error}</div>}

          <div className="btn-field">
            <button type="submit">
              <b>Login</b>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
