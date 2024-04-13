// import React from 'react';
import { BiSolidCalendar } from "react-icons/bi";
import React, { useEffect, useState } from 'react';
import { MdSubtitles } from "react-icons/md";
import { useParams } from "react-router-dom";


const TaskAndStatus = () => {
  let { id } = useParams()
  const access_token = sessionStorage.getItem('access_token')

  const [taskSelectedValue, setTaskSelectedValue] = useState('');

  const [statusSelectedValue, setStatusSelectedValue] = useState('');
  
  const [project, setProject] = useState({project_title:'', project_start_date:'', project_end_date:''});

  useEffect(() => {
    fetch(`http://localhost:3003/api/user/project/detail/${id}`,{
      headers: {Authorization:  `Bearer ${access_token}`}
    })
    .then(response => response.json())
    .then((json )=> {console.log(json.data);
      setProject({...project,project_title: json.data.project_title, project_start_date:json.data.project_start_date, project_end_date:json.data.project_end_date})}
    )
    .catch(error => console.error(error))
  },[])

  const handleTaskSelectChange = (event) => {
    setTaskSelectedValue(event.target.value);
  };

  const handleStatusSelectChange = (event) => {
    // console.log('EVENT',event.target.value);
    setStatusSelectedValue(event.target.value);
  };




  const handleSubmit = () => {
    const payload = { task_project_id: id, [taskSelectedValue]:statusSelectedValue }

    console.log('Pay ==>',payload);
    // Send a request to your backend API to store the data
    fetch('http://localhost:3003/api/user/update/task', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        // Handle successful submission, maybe show a success message
        console.log('Data submitted successfully');
      } else {
        // Handle errors, maybe show an error message
        console.error('Failed to submit data');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };




  return (
    <div className="select-dropdown">
      <div>
      <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-at"></i>
              <MdSubtitles />
              <input type="name" 
              placeholder="Project Title" 
              value={project.project_title}
              />

            </div>
          </div>

          <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-at"></i>
              <BiSolidCalendar />
              <input type="name" 
              placeholder="Project Start Date" 
              value={project.project_start_date}
              />

            </div>
          </div>

          <div className="input-group">
            <div className="input-field namefield">
              <i className="fa-solid fa-at"></i>
              <BiSolidCalendar />
              <input type="name" 
              placeholder="Project End Date" 
              value={project.project_end_date}
              />
            </div>
          </div>

        <h3 className="title">Select Your Task</h3>
      </div>

      <div>
        <select onChange={handleTaskSelectChange} value={taskSelectedValue}>
          <option value="task_android_api_intigreat"><b>Android Api Integration</b></option>
          <option value="task_ios_api_intigreat"><b>Ios Api Integration</b></option>
          <option value="task_web_api_intigreat"><b>Web Api Integration</b></option>
          <option value="task_dashboard_api_intigreat"><b>Dashboard Api Integration</b></option>
          <option value="task_android_ui"><b>Android Ui</b></option>
          <option value="task_ios_ui"><b>Ios Ui</b></option>
          <option value="task_web_ui"><b>Web Ui</b></option>
          <option value="task_dashboard_ui"><b>Dashboard Ui</b></option>
          <option value="task_android_click"><b>Android Click</b></option>
          <option value="task_ios_click"><b>Ios Click</b></option>
          <option value="task_web_click"><b>Web Click</b></option>
          <option value="task_dashboard_click"><b>Dashboard Click</b></option>
        </select>  
      </div>

      <div>
        <h5 className="title">Select Your Status</h5>
      </div>

      <div>
        <select onChange={handleStatusSelectChange} value={statusSelectedValue}>
          <option value="Inprogress"><b>Inprogress</b></option>
          <option value="Pending"><b>Pending</b></option>
          <option value="Complete"><b>Complete</b></option>
          <option value="Reopen"><b>Reopen</b></option>
        </select>
      </div>

      <div className="button-field">
        <button className="button" onClick={handleSubmit}><b>Submit</b></button>
      </div>
    </div>
  );
};

export default TaskAndStatus;

