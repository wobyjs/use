import { $, $$ } from 'woby'
import { useLocalStorage } from './useLocalStorage'

export default function Component() {
    // Basic usage
    const basicValue = useLocalStorage('basic-key', 'default')

    // With removeOnNull option
    const removableValue = useLocalStorage('removable-key', 'default', { removeOnNull: true })

    // With readonly option
    const readonlyValue = useLocalStorage('readonly-key', 'default', { readonly: true })

    const handleRemove = () => {
        removableValue(null) // This should remove the item from localStorage
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