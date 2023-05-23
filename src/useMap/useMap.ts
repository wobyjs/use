import { isStore, store } from 'voby'

export type MapOrEntries<K, V> = Map<K, V> | [K, V][]

// Public interface
export interface Actions<K, V> {
    set: (key: K, value: V) => void
    setAll: (entries: MapOrEntries<K, V>) => void
    remove: (key: K) => void
    reset: Map<K, V>['clear']
    entries: () => [K, V][]
}

// We hide some setters from the returned map to disable autocompletion
type Return<K, V> = [Omit<MapOrEntries<K, V>, 'set' | 'clear' | 'delete'>, Actions<K, V>]

export function useMap<K, V>(initialState: MapOrEntries<K, V> = new Map(),): Return<K, V> {
    const map = isStore(initialState) ? initialState : store(initialState)

    const actions: Actions<K, V> = {
        set: ((key, value) => map[key as any] = value),

        setAll: function (entries) {
            this.reset()
            Object.assign(map, entries)
        },

        remove: (key => delete map[key as any]),

        reset: () => Object.getOwnPropertyNames(map).forEach(prop => delete map[prop]),

        entries: () => Object.entries(map) as any
    }

    return [map, actions]
}

