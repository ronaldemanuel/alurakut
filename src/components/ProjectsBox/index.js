import Box from "../Box";
import styled from "styled-components";

export default function ProjectsBox(props) {
    return(
        <Box>
            <h2 className="smallTitle">
                Projetos ({props.projects.length})
            </h2>
            <ProjectsBox.Lists>
                <ul>
                    {props.projects.map((project, indice, projects) => {
                        var color = 'default';
                        if(project.language == 'JavaScript') {
                            color = 'yellow';
                        } else if(project.language == 'PHP') {
                            color = 'purple';
                        } else if(project.language == 'HTML') {
                            color = 'brown';
                        } else if(project.language == 'CSS') {
                            color = 'blue';
                        }

                        if(indice < 4 && (!project.private)) {
                            return(
                                <li key={project.id}>
                                    <a href={`https://github.com/${props.githubUser}/${project.name}`} target="_blank">
                                        {project.name}
                                        <p id={color}>
                                            {project.language}
                                        </p>
                                    </a>
                                </li>
                            )
                        }
                    })}
                </ul>
                <a href={`https://github.com;${props.githubUser}`} target="_blank">
                    Ver todos
                </a>    
            </ProjectsBox.Lists>
        </Box>
    )
}
ProjectsBox.Lists = styled.div`
    ul {
        list-style: none;
    }

    li {
        margin-bottom: 10px;
        padding: 5px;
    }
    
    a {
        color: #002d40;
        text-decoration: none;
        font-size: 15px;
    }
    p{
        font-size: 12px;
        font-weight: 700;
    }

    #default {
        color: #002d40;
    }
    #yellow {
        color: #facf00;
    }
    #purple {
        color: purple;
    }
    #brown {
        color: brown;
    }
    #blue {
        color: blue;
    }
   
`;