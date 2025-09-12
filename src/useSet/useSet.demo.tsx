import { Fragment } from 'woby'

import { SetOrEntries, useSet } from './useSet'

const initialValues: SetOrEntries<string> = ['apple', 'banana']
const otherValues: SetOrEntries<string> = ['cherry', 'date', 'elderberry']

export default function Component() {
    const [set, actions] = useSet(initialValues)

    const add = () => actions.add(String(Date.now()))
    const addAll = () => actions.reset(otherValues)
    const reset = () => actions.reset()
    const remove = () => actions.remove('apple')

    return (
        <div>
            <button onClick={add}>Add Item</button>
            <button onClick={reset}>Reset</button>
            <button onClick={addAll}>Set new data</button>
            <button onClick={remove} disabled={!set.includes('apple')}>
                {'Remove "apple"'}
            </button>

            <pre>
                Set (
                {set.map((value) => (
                    <Fragment key={value}>{`\n  ${value}`}</Fragment>
                ))}
                <br />)
            </pre>
        </div>
    )
}