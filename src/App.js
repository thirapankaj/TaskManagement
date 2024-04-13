import React from "react";
import Signup from "./Signup";
import Login from "./Login"
import { Route,Routes } from "react-router-dom";
import ProjectList from "./ProjectList";
import TaskAndStatus from "./TaskStatus";
import AddProject from "./AddProject";


function App() {
  return (
  
        <Routes>
          <Route  path="/" element={<Signup/>} />
          <Route  path="/login" element={<Login/>} />
          <Route  path="/projectList" element={<ProjectList/>} />
          <Route  path="/taskandStatus/:id" element={<TaskAndStatus/>} />
          <Route  path="/addProject" element={<AddProject/>} />
          
          
          </Routes>
  );
}

export default App;

