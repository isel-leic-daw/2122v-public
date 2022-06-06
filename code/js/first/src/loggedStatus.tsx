import { createContext, useContext, useState } from "react"
import * as React from "react"

export const LoggedInContext = createContext({loggedInState: false})

export function useLoggedInState() {
    return useContext(LoggedInContext)
}

// Usage example
// <LogInContainer>
//    <Level0 />
// </LogInContainer>

export function LogInContainer({children}:{children: React.ReactNode}) {
    const [state, setState] = useState(false)
    function onClickHandler() {
        setState(oldState => !oldState)
    }
    return (
        <div>
            <button onClick = {onClickHandler}>{!state ? 'login' : 'logout'}</button>
            <LoggedInContext.Provider value={{loggedInState: state}}>
               {children}
            </LoggedInContext.Provider>
        </div>
    )
}