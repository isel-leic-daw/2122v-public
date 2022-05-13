import * as React from 'react'
import { useState } from 'react'
import { ListOfInputs } from './ListOfInputs'

export function Counter({ }: {}) {

    const [counter, setCounter] = useState(0)
    const [clickCount, setClickCount] = useState(0)

    function update(delta: number) {
        setClickCount(clickCount + 1)
        const newCounter = counter + delta
        if(newCounter >= 0) {
            setCounter(newCounter)
        }
    }

    return (
        <div>
            <button onClick={() => update(-1)}>-</button>
            {clickCount}:{counter}
            <button onClick={() => update(+1)}>+</button>
            <ListOfInputs repeats={counter} />
        </div>
    )

}