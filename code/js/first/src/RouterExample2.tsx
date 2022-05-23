import * as React from "react"
import { BrowserRouter, Routes, Route, Link, Outlet, useParams } from "react-router-dom"

function Component1({ }) {
    return <h1>Component1</h1>
}

function Component2({ text }: { text: string }) {
    return (
        <div>
            <h1>Component2</h1>
            <p>{text}</p>
        </div>
    )
}

type Project = {
    name: string,
    description: string,
    id: string,
}

type ProjectDb = {
    [key: string]: Project
}

const projectDb: ProjectDb = {
    '1': {
        name: 'First project',
        description: 'The first project',
        id: '1',
    },
    '2': {
        name: 'Second project',
        description: 'The second project',
        id: '2',
    },
}

function ProjectListItem({ id }: { id: string }) {
    return (
        <li><Link to={`/projects/${id}`}>{projectDb[id].name}</Link></li>
    )
}

function ProjectList({ }) {
    return (
        <div>
            <ul>
                {Object.keys(projectDb).map(id => <ProjectListItem id={id} />)}
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

function ProjectDetail({ }) {
    const { pid } = useParams()
    const project: Project | undefined = projectDb[pid]
    return (
        project ? (
        <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </div>)
        : (
            <h3>Project not found</h3>
        )
    )
}

export function RouterExample({ }) {
    return (
        <BrowserRouter>
            <ul>
                <li><Link to='projects'>Projects</Link></li>
            </ul>
            <Routes>
                <Route path='projects' element={<ProjectList />} />
                <Route path='projects/:pid' element={<ProjectDetail />} />
            </Routes>
        </BrowserRouter>
    )
}