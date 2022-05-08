/** @jsx createElement */
import {message, message2} from './messages'
import {message as m2} from './messages2'
import { createElement } from './view'

const items = ['item 1', 'item 2', 'item 3', 'item 4']
document.body.appendChild(
    createElement('div', null,
        createElement('h1', null, 'Example'),
        createElement('ul', null,
            ...items.map(item => createElement('li', null, item))
        )
    )
)

document.body.appendChild(
    <div>
        <h1>Example</h1>
        <h2>Sub heading</h2>
    </div>
)

const m = message

console.log(m)
console.log(message2)
console.log(m2)
