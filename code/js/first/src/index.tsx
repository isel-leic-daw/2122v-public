import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'

const root = createRoot(document.getElementById('container'))
// root.render(React.createElement(App))

let repeats = 0
setInterval(() => {
    repeats += 1
    root.render(<App repeats={repeats} />)
}, 2000)