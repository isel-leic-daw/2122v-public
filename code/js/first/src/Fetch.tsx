import * as React from "react"
import {useReducer} from "react"


type FetchProps = {
    url: string,
    renderOk: (payload: any) => React.ReactElement,
    renderLoading: () => React.ReactElement,
    renderNok: (response: Response) => React.ReactElement,
    renderError: (error: Error) => React.ReactElement,
}


type Action =
    | { type: 'fetch-started', url: string }
    | { type: 'error' }
    | { type: 'response', response: Response }
    | { type: 'payload', payload: any }

type State =
    | { state: 'begin' }
    | { state: 'fetch-started', url: string }
    | { state: 'response-received', response: Response}
    | { state: 'payload-receive', payload: any}

function reducer(state: State, action: Action): State {

}

export function Fetch(
    props: FetchProps
): React.ReactElement {

    const[state, dispatch] = useReducer(reducer, {state: 'begin'})



}

export function FetchExample() {
    return <Fetch
        url='https://httpbin.org/delay/4'
        renderOk={(payload) => <p>{payload.origin}</p>}
        renderLoading={() => <p>...</p>}
        renderNok={message => <p>{message.status}</p>}
        renderError={error => <p>Error: {error}</p>}
    />
}