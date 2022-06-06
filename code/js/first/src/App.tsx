import * as React from 'react'
// import { ListOfInputs } from './ListOfInputs'
// import { Counter } from './counter'
// import { Timer } from './timer'
// import { Timer } from './TimerWithPausePlay'
// import { Timer } from './Timer2'
import { RouterExample } from './RouterExample2'
import { InputDemo } from './InputDemo'
// import { Example } from './contextDemo'
// import { Example } from './propsChange'
import { Example } from './renderExample'
import { FetchExample } from './Fetch'

export function App(
    { repeats }: { repeats: number }
) {
    return (
        <FetchExample />
    )
}