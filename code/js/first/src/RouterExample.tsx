import { BrowserRouter, Routes, Route, Link, Outlet, useParams } from "react-router-dom";
import * as React from "react";

function Foo({ }) {
    return (
        <h1>Foo</h1>
    )
}

function Bar({ }) {
    return (
        <h1>Bar</h1>
    )
}

type Project = {
    name: string,
    description: string,
    id: string,
}

const projects: { [key: string]: Project } = {
    '1': {
        name: 'First project',
        description: 'The first project',
        id: '1'
    },
    '2': {
        name: 'Second project',
        description: 'The second project',
        id: '2'
    },
}

function ProjectListItem({ project }: { project: Project }) {

    return (
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
    )
}

function ProjectDetail({ }) {

    const { pid } = useParams()
    const project: Project | undefined = projects[pid]
    return project ? (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </div>
    ):(
        <h1>404</h1>
    )
}

function Projects({ }) {

    return (
        <div>
            <ul>
                {Object.keys(projects).map(id => <li key={id}><ProjectListItem project={projects[id]} /></li>)}
            </ul>
            <Link to='/projects/404'>Project that does not exist</Link>
            <Outlet />
        </div>
    )
}



export function RouterExample({ }) {

    return (
        <BrowserRouter>
            <ul>
                <li><Link to='/foo'>Foo</Link></li>
                <li><Link to='/bar'>Bar</Link></li>
                <li><Link to='/projects'>Projects</Link></li>
            </ul>
            <Routes>
                <Route path='foo' element={<Foo />} />
                <Route path='bar' element={<Bar />} />
                <Route path='projects' element={<Projects />}>
                    <Route path=':pid' element={<ProjectDetail />} />
                </Route>
            </Routes>

        </BrowserRouter>
    )
}