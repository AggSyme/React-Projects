import { useEffect, useState } from 'react';
import './public/app.css'
export default function EditProject(props){

    const [projectsData, setProjectsData] = useState(props.projectsData);

    useEffect(() => {
        setProjectsData(props.projectsData);
        console.log("Project inside:", props.projectsData);
    }, [props.projectsData]);

    // console.log(projectsData);
    function two_way_binding(inpID, new_text){
        setProjectsData((prevInputs) => {
            return {...prevInputs,
                [inpID]: new_text
            }
        });
    }

    function submitForm(e){
        e.preventDefault();
        console.log("Submit");
        props.submitForm(projectsData);
    }
    
    return(
        <>
            {props.newProject ? <h2>Add New Project</h2> :  <h2>Edit Project</h2>}
            <form onSubmit={submitForm}>
                <label> <span>Project Title:</span> <input type="text" value={projectsData.title} onChange={(event) => two_way_binding("title", event.target.value)}/></label>
                <label> <span>Project Description:</span> <input type="text" value={projectsData.description} onChange={(event) => two_way_binding("description", event.target.value)}/></label>
                <label> <span>Project Deadline:</span> <input type="date" value={projectsData.deadline} onChange={(event) => two_way_binding("deadline", event.target.value)}/></label>
                <button type="submit">Save</button>
            </form>
        </>
    );
}
