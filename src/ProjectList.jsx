import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GrAddCircle } from "react-icons/gr";


const ProjectList = () => {
  const access_token = sessionStorage.getItem('access_token')

  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  const handleClick = (id) => { 
    navigate(`/taskandStatus/${id}`);
  };

  const handleSubmit = () => { 
    navigate(`/addProject`);
  };

  useEffect(() => {
    fetch("http://localhost:3003/api/user/project/list",{
      headers: {Authorization:  `Bearer ${access_token}`}
    })
    .then(response => response.json())
    .then(json => setProject(json.data))
    .catch(error => console.error(error))
  },[])

  return (
    <div className="box">

      <div>
        <h1 className="title">Projects</h1>
      </div>

      <div>
        <h2>List's of Projects</h2>
      </div>

      <div>
      <ul>
      <ul>
      {project && project.map(item => (
        <li key={item.project_id} onClick={() => handleClick(item.project_id)}>
          <span>{item.project_id}</span>{item.project_title}
        </li>
      ))}
    </ul>
    </ul>

        <div className="button_fields">
            <button type="submit" className='Add_Project' onClick={handleSubmit}>
        <b><GrAddCircle /></b>
              <b>Add Projects</b>
              <span></span>
            </button>
            </div>

          </div>
     </div>
   
  );
};

export default ProjectList;
