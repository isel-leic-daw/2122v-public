import * as React from "react"
import { useState, useCallback } from "react"

export function Example() {
    const [counter, setCounter] = useState(0)

    //function onClickHandler() {
    //    setCounter(oldCounter => oldCounter + 1)
    //}
    const onClickHandler = useCallback(() => {
        setCounter(oldCounter => oldCounter + 1)
    }, [setCounter])
    console.log('Example render')
    return (
        <div>
            <Counter counter={counter} />
            <MemoButton onClickHandler={onClickHandler} label='click me' />
        </div>
    )

}

function Counter({ counter }: { counter: number }) {
    console.log('Counter render')
    return (
        <p>{counter}</p>
    )
}

const MemoCounter = React.memo(Counter)

function Button({ onClickHandler, label }: {onClickHandler: ()=> void, label: string}) {
    console.log('Button render')
    return (
        <p><button onClick={onClickHandler}>{label}</button></p>
    )
}

const MemoButton = React.memo(Button)