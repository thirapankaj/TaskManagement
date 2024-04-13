import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


 function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    user_name: '',
    user_password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const {  value } = e.target;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    if (!formData.user_name || !formData.user_password) {
      setError('Please fill in all fields');
      return;
    }

    navigate('/login')
  
    let result = await fetch("http://localhost:3003/api/core/signup",{
      method:'POST',
      body:JSON.stringify(formData),
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    })
    result = await result.json() 
  };
  
  return (
    <div className="container">
      <div className="formbox">

        <h1 className="title">Signup</h1>

        <div className="underline"></div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-user"></i>
              <FaUser />
              <input
                type="name"
                placeholder="Name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-field">
              <i className="fa-solid fa-key"></i>
              <RiLockPasswordFill />

              <input
                type="password"
                placeholder="Password"
                name="user_password"
                value={formData.user_password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <div style={{ color: 'red' }}>{error}</div>}

          <div className="btn-field">
            <button type="submit" className="signupbtn">
              <b>Signup</b>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Signup;
