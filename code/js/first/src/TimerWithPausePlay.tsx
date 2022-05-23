import * as React from 'react'
import { useState, useEffect } from 'react'

export function Timer({ }) {

    const [counter, setCounter] = useState(0)
    const [period, setPeriod] = useState(1000)
    const [active, setActive] = useState(false)

    useEffect(() => {
        if(!active) {
            return // undefined
        }
        console.log(`setInterval(${period})`)
        const intervalId = setInterval(() => {
            setCounter(currentCounter => currentCounter + 1)
        }, period)
        return () => {
            console.log(`clearInterval(${period})`)
            clearInterval(intervalId)
        }
    }, [period, active])

    function update(delta: number) {
        const newPeriod = period + delta * 1000
        if (newPeriod > 0) {
            setPeriod(newPeriod)
        }
    }

    function toggleActive() {
        setActive(it => !it)
    }

    return (
        <div>
            <div>
                <button onClick={() => update(-1)}>-</button>
                counter = {counter}, period = {period}
                <button onClick={() => update(+1)}>+</button>
            </div>
            <div>
                <button onClick={() => toggleActive()}>{active ? 'Pause' : 'Play'}</button>
            </div>
        </div>
    )

}