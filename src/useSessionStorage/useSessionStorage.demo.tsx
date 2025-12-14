import { $, $$ } from 'woby'
import { useSessionStorage } from './useSessionStorage'

export default function Component() {
    // Basic usage
    const basicValue = useSessionStorage('basic-key', 'default')

    // With removeOnNull option
    const removableValue = useSessionStorage('removable-key', 'default', { removeOnNull: true })

    // With readonly option
    const readonlyValue = useSessionStorage('readonly-key', 'default', { readonly: true })

    const handleRemove = () => {
        removableValue(null) // This should remove the item from sessionStorage
    }

    return (
        <div>
            <p>Basic value: {basicValue}</p>
            <p>Removable value: {removableValue}</p>
            <p>Readonly value: {readonlyValue}</p>
            <button onClick={handleRemove}>Remove Removable Value</button>
        </div>
    )
}