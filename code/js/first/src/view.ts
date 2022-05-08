
export function createElement(
    name: string,
    attrs: any,
    ...childs: Array<HTMLElement | string>
) : HTMLElement {
    const element = document.createElement(name)
    childs.forEach(child => element.appendChild(
            typeof child === 'string'
            ? document.createTextNode(child)
            : child
        )
    )
    return element
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any
        }
    }
}