import { isStore, store } from 'woby'

export type MapOrEntries = Map<any, any> | [any, any][] | Object

// Public interface
export interface Actions {
    set: (key, value) => void
    setAll: (entries: Object | Map<any, any> | [any, any][]) => void
    remove: (key: string) => void
    reset: (Map<any, any>['clear'])
    entries: () => [any, any][]
}

// We hide some setters from the returned map to disable autocompletion
// type Return<K extends string | number | symbol, V> = [Record<K, V>, Actions]

function isPrimitive(test) {
    return (test !== Object(test))
};

export function useMap<T extends MapOrEntries>(initialState?: T,): [T extends Map<any, any> | [any, any][] ? any : T, Actions] {
    function addElements(entries) {
        const map = {}
        if (entries instanceof Map) {
            entries.forEach((value, key) => {
                map[key] = value
            })

        }
        else if (Array.isArray(entries)) {
            for (let value of entries) {
                map[value[0]] = value[1]
            }
        }
        else if (isPrimitive(entries) == true) {
            return store({})
        }
        else {
            Object.assign(map, entries)
        }
        return store(map)
    }

    const map = initialState instanceof Map || Array.isArray(initialState) || isPrimitive(initialState) ? addElements(initialState) :
        isStore(initialState) ? initialState : store(initialState)


    const actions: Actions = {
        set: (function (key, value) {
            map[key as any] = value
        }),

        setAll: function (entries) {
            this.reset()
            if (entries instanceof Map) {
                entries.forEach((value, key) => {
                    map[key] = value
                })

            }
            else if (Array.isArray(entries)) {
                for (let value of entries) {
                    map[value[0]] = value[1]
                }
            }
            else if (isPrimitive(entries) == true) {
                return
            }
            else {
                this.reset()
                Object.assign(map, entries)
            }

        },

        remove: (key => delete map[key as any]),

        reset: function () {
            Object.getOwnPropertyNames(map).forEach(prop => delete map[prop])

        },

        entries: () => Object.entries(map) as any
    }

    return [map as any, actions]
}

