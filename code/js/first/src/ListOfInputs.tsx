import * as React from 'react'

export function ListOfInputs(
    {repeats} : {repeats: number}
) {
    return (
        <ul>
            {Array.from(Array(repeats).keys())
                .map( ix => <li key={ix-repeats}><input type="text" /></li>)}
        </ul>
    )
    
}