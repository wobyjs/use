import { isStore, store } from 'woby'

export type SetOrEntries<T> = Set<T> | T[] | Iterable<T>

// Public interface
export interface SetActions<T> {
    add: (value: T) => void
    remove: (value: T) => void
    clear: () => void
    reset: (values?: SetOrEntries<T>) => void
    entries: () => T[]
}

function isPrimitive(test: any): boolean {
    return (test !== Object(test))
}

export function useSet<T>(initialState?: SetOrEntries<T>): [T[], SetActions<T>] {
    // Create an array from the initial state
    function addElements(entries: SetOrEntries<T>): T[] {
        const set = new Set<T>()
        if (entries instanceof Set) {
            entries.forEach(value => set.add(value))
        } else if (Array.isArray(entries)) {
            entries.forEach(value => set.add(value))
        } else if (isPrimitive(entries) == true) {
            return []
        } else if (entries && typeof entries[Symbol.iterator] === 'function') {
            for (const value of entries) {
                set.add(value)
            }
        }
        return Array.from(set)
    }

    // Create a store that behaves like an array
    const initialArray = initialState instanceof Set || Array.isArray(initialState) ||
        (initialState && typeof initialState[Symbol.iterator] === 'function') ||
        isPrimitive(initialState) ? addElements(initialState) : []

    const storeSet = store(initialArray)

    const actions: SetActions<T> = {
        add: (function (value: T) {
            // Check if value already exists
            if (!storeSet.some(item => item === value)) {
                storeSet.push(value)
            }
        }),

        remove: (function (value: T) {
            const index = storeSet.findIndex(item => item === value)
            if (index > -1) {
                storeSet.splice(index, 1)
            }
        }),

        clear: (function () {
            storeSet.length = 0
        }),

        reset: function (values?: SetOrEntries<T>) {
            this.clear()
            if (values) {
                const newValues = addElements(values)
                storeSet.push(...newValues)
            }
        },

        entries: () => [...storeSet]
    }

    return [storeSet, actions]
}