import * as React from 'react'
import { useState, useEffect, useReducer, ChangeEvent } from 'react'

type State = {
    counter: number,
    delta: number,
}

type Action =
    | { type: 'setDelta', delta: number }
    | { type: 'tick' }

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'setDelta':
            return { ...state, delta: action.delta }
        case 'tick':
            return { ...state, counter: state.counter + state.delta }
    }
}

export function Timer({ }) {

    const [state, dispatch] = useReducer(reducer, { counter: 0, delta: 1 })
    const [inputDelta, setInputDelta] = useState('1')
    const [period, setPeriod] = useState(1000)
    const [error, setError] = useState('')

    useEffect(() => {
        console.log(`setInterval(${period})`)
        const intervalId = setInterval(() => {
            dispatch({ type: 'tick' })
        }, period)
        return () => {
            console.log(`clearInterval(${period})`)
            clearInterval(intervalId)
        }
    }, [period])

    function update(delta: number) {
        const newPeriod = period + delta * 1000
        if (newPeriod > 0) {
            setPeriod(newPeriod)
        }
    }

    function handleDeltaChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setInputDelta(value)
        const maybeInt = Number(value)
        if (!Number.isNaN(maybeInt) && maybeInt > 0) {
            setError('')
            dispatch({type: 'setDelta', delta: maybeInt})
        } else {
            setError('Not an integer greater than zero')
        }
    }

    return (
        <div>
            <button onClick={() => update(-1)}>-</button>
            counter = {state.counter}, period = {period}
            <button onClick={() => update(+1)}>+</button>
            <input type='text' value={inputDelta} onChange={handleDeltaChange} />
            <p>{error}</p>
        </div>
    )

}