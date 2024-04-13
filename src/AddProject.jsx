import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidCalendar } from "react-icons/bi";
import { MdSubtitles } from "react-icons/md";


const AddProject = () => {
  const access_token = sessionStorage.getItem('access_token')

    const navigate = useNavigate()

  const [project_title, setTitle] = useState('');
  const [project_start_date, setStartDate] = useState('');
  const [project_end_date, setEndDate] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
  navigate("/projectList");

  const payload = {project_title, project_start_date, project_end_date}

  let result = await fetch("http://localhost:3003/api/user/add/project",{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
      Authorization:  `Bearer ${access_token}`
    },
    body:JSON.stringify(payload)
  })
  
  result = await result.json() 
};

  return (
    <div className="container">
      <div className="formbox">

        <h1 className="title">Add Your Project Title</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-at"></i>
              <MdSubtitles />
              <input type="name" 
              placeholder="Project Title" 
              value={project_title}
              onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-at"></i>
              <BiSolidCalendar />
              <input type="name" 
              placeholder="Project Start Date" 
              value={project_start_date}
              onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-at"></i>
              <BiSolidCalendar />
              <input type="name" 
              placeholder="Project End Date" 
              value={project_end_date}
              onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="btn-field">
            <button type="submit">
                <b>Submit</b>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProject;
