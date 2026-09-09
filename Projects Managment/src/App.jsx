import { useEffect, useState } from "react";
import "./public/app.css"
import SideBar from "./SideBar";
import EditProject from './EditProject';

function App() {

  const [addingProject, setAddingProject] = useState(false);
  const [editProjectData, setEditProjectData] = useState();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({ title: "", description: "", deadline: "" });
  
  
  function addProject(project){
    console.log("BBBBBBBBBBB");
    setProjects([...projects, project]);
    setAddingProject(false);
}
  
  function editProject(project){
    setProjects(projects.map((item, index) => 
        project.title === item.title ? project : item
      ));
    setAddingProject(false);
  }

  useEffect(() => {
      // console.log("Project updated:", project);
      setEditProjectData(<EditProject projectsData={project} submitForm={project.title!="" ? editProject : addProject}  newProject={project.title===""}  />);
  }, [project]);

  function formProject(projectTitle){      
    if (projectTitle != null) {
      console.log("BBB");
      setProject(projects.find(item => item.title === projectTitle));
    } else {
      console.log("AAA");
      setProject({ title: "", description: "", deadline: "" });
    }
    
    // Update both states together
    setAddingProject(true);
    // console.log(project);
  }

  return (
    <div className="container">
      <SideBar projects={projects} addNewProject={formProject}></SideBar>
      <main>
        <h1 className="my-8 text-center text-5xl font-bold">Projects</h1> 
        {addingProject ?  editProjectData: <button onClick={() => formProject(null)} className="addNewProjectBtn">Add New Project</button>}
      </main>
    </div>
  );
}

export default App;