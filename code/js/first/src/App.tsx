import * as React from 'react'
// import { ListOfInputs } from './ListOfInputs'
import { Counter } from './counter'
import { Timer } from './timer'

export function App(
    { repeats }: { repeats: number }
) {
    return (
        <div>
            <Timer />
        </div>
    )
}