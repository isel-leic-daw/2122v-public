import * as React from 'react'
import { useState, useCallback, useMemo } from 'react'

function computeTransformedLabel(label: string) {
    console.log('computeTransformedLabel')
    return label.toUpperCase()
}

export function Example({ }) {
    const [counter, setCounter] = useState(0)

    const onClickHandler = useCallback(function () {
        setCounter(oldCounter => oldCounter + 1)
    }, [setCounter])

    console.log('Example render')
    const label = counter < 5 ? 'counter' : 'also counter'
    return (
        <div>
            <MemoDisplay value={counter} label={label} />
            <MemoButton onClick={onClickHandler} label={'click me'} />
        </div>
    )
}

function Display({ value, label }: { value: number, label: string }) {
    const computedLabel = useMemo(() => computeTransformedLabel(label), [label])
    console.log('Display render')
    return (
        <p>{computedLabel}:{value}</p>
    )
}
const MemoDisplay = React.memo(Display)

function Button({
    onClick,
    label
}: {
    onClick: () => void,
    label: string,
}) {
    console.log('Button render')
    return (
        <p><button onClick={onClick}>{label}</button></p>
    )
}
const MemoButton = React.memo(Button)