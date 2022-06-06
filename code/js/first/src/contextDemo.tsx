import * as React from 'react'
import { createContext, useState, useContext } from 'react'
import { useLoggedInState, LogInContainer } from './loggedStatus'


export function Example() {
    return (
        <LogInContainer>
            <Level0 />
            <Level0 />
        </LogInContainer>
    )
}

function Level0({ }) {
    return <Level1 />
}

function Level1({ }) {
    return <Level2 />
}

function Level2({ }) {
    const loggedInState = useLoggedInState()
    return (
        <p>The user is {loggedInState.loggedInState ? 'logged in' : 'not logged in'}</p>
    )
}
