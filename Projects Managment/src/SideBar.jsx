import "./public/app.css";

export default function SideBar(props){


    function addNewProject(event){
        props.addNewProject(event.target.textContent);
        console.log(event.target.textContent);
    }

    const projects_li = (
        props.projects.map((item, key) => (
            <li key={key}><button onClick={addNewProject} className="projectBtn">{item.title}</button></li>
        ))
    );


    return(
        <aside>
            <button onClick={() => props.addNewProject(null)} className="addNewProjectBtn">New Project</button>
            <ul>
                {props.projects && projects_li}
            </ul>
        </aside>
    );
}