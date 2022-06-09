import * as React from "react"
import { useReducer, useEffect, useState, useCallback, ChangeEvent } from "react"

type FetchProps = {
    url: string,
    renderBegin: () => React.ReactElement,
    renderLoading: () => React.ReactElement,
    renderOk: (payload: any) => React.ReactElement,
    renderNok: (response: Response) => React.ReactElement,
    renderError: (error: Error) => React.ReactElement,
}

type State =
    | { state: 'begin' }
    | { state: 'loading', url: string }
    | { state: 'response-received', response: Response }
    | { state: 'payload-receive', payload: any }
    | { state: 'error-receive', error: Error }

type Action =
    | { type: 'fetch-started', url: string }
    | { type: 'error', error: Error }
    | { type: 'response', response: Response }
    | { type: 'payload', payload: any }
    | { type: 'reset' }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'fetch-started': return { state: 'loading', url: action.url }

        case 'error': return { state: 'error-receive', error: action.error }

        case 'response': return { state: 'response-received', response: action.response }

        case 'payload': return { state: 'payload-receive', payload: action.payload }

        case 'reset': return { state: 'begin' }
    }
}

async function doFetch(url: string, dispatcher: (action: Action) => void, signal: AbortSignal) {
    if (url == '') {
        dispatcher({ type: 'reset' })
        return
    }
    dispatcher({ type: 'fetch-started', url: url })
    try {
        const response = await fetch(url, { signal })
        dispatcher({ type: 'response', response: response })
        if (response.ok) {
            const payload = await response.json()
            dispatcher({ type: 'payload', payload: payload })
        }
    } catch (error) {
        console.log(`error '${error.message}'`)
        dispatcher({ type: 'error', error: error })
    }
}

function fetchEffect(url: string, dispatcher: (action: Action) => void) {
    let isCancelled = false
    const abortController = new AbortController()
    const filteredDispatcher = (action: Action) => {
        if (!isCancelled) {
            dispatcher(action)
        } else {
            console.log('ignoring action')
        }
    }
    doFetch(url, filteredDispatcher, abortController.signal)
    return () => {
        // cancel
        isCancelled = true
        abortController.abort()
    }
}

export function Fetch(props: FetchProps) {
    const [state, dispatcher] = useReducer(reducer, { state: 'begin' })
    useEffect(() => fetchEffect(props.url, dispatcher), [props.url, dispatcher])

    switch (state.state) {
        case 'begin': return props.renderBegin()

        case 'loading': return props.renderLoading()

        case 'error-receive': return props.renderError(state.error)

        case 'response-received': return state.response.ok ? props.renderLoading() : props.renderNok(state.response)

        case 'payload-receive': return props.renderOk(state.payload)
    }
}

export function FetchExample({ }) {
    const [value, setValue] = useState('')
    const [url, setUrl] = useState('')

    const handleOnChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
        }, [setValue])

    const onClickHandler = useCallback(
        () => {
            setUrl(value)
        }, [setUrl, value])

    return (
        <div>
            <div>
                <input type='text' value={value} onChange={handleOnChange} />
                <button onClick={onClickHandler}>Fetch</button>
            </div>
            <Fetch
                url={url}
                renderBegin={() => <p>waiting for URL...</p>}
                renderOk={(payload) => <textarea rows={30} cols={80} value={JSON.stringify(payload, null, '\t')} readOnly />}
                renderLoading={() => <p>...</p>}
                renderNok={message => <p><>Status: {message.status}</></p>}
                renderError={error => <p><>Error: {error.message}</></p>}
            />
        </div>
    )
}