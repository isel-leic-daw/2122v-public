import * as React from "react"
import { ChangeEvent, useState, useEffect } from "react"

export function InputDemo({ }) {
    const [value, setValue] = useState(1)

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value
        const maybeInt = Number(inputValue)
        if (!Number.isNaN(maybeInt) && maybeInt > 0) {
            setValue(maybeInt)
        }
    }

    return (
        <div>
            <input type='text' value={value} onChange={handleOnChange} />
            <Repeater
                repeats={value}
                render={(ix) => <Paragraph key={ix} text={ix.toString()} />} />
        </div>
    )
}

type RepeaterProps = {
    repeats: number,
    render: (r: number) => React.ReactElement
}

function Repeater(
    { repeats, render }: RepeaterProps
) {
    return <div>
        {Array.from(Array(repeats).keys())
            .map(ix => render(ix))}
    </div>

}

function Paragraph({ text }: { text: string }) {
    return <p>{text}</p>
}

function Counter({ }: {}) {

    const [counter, setCounter] = useState(0)
    console.log('Counter')

    function update(delta: number) {
        const newCounter = counter + delta
        if (newCounter >= 0) {
            setCounter(newCounter)
        }
    }

    useEffect(() => {
        console.log('running effect')
        const iid = setInterval(() => {
            setCounter(counter => counter + 1)
        }, 1000)
        return () => {
            clearInterval(iid)
        }
    }, [])

    return (
        <div>
            <button onClick={() => update(-1)}>-</button>
            {counter}:{counter}
            <button onClick={() => update(+1)}>+</button>
        </div>
    )

}