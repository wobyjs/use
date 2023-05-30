import { Console } from 'console'
import { isStore, store } from 'voby'

export type MapOrEntries = Map<any,any> | [any, any][] | Object

// Public interface
export interface Actions {
    set: (key, value) => void
    setAll: (entries: Object | Map<any,any> | [any,any][]) => void
    remove: (key: string) => void
    reset: Map<any,any>['clear']
    entries: () => [any, any][]
}

// We hide some setters from the returned map to disable autocompletion
type Return<K extends string | number | symbol, V> = [Record<K, V>, Actions]

function isPrimitive(test) {
    return (test !== Object(test));
};

export function useMap<T extends MapOrEntries>(initialState?: T,): [T extends  Map<any, any> | [any,any][]? any:T, Actions]  {   
    const map = initialState instanceof Map || Array.isArray(initialState) || isPrimitive(initialState) ? store({}) : 
    isStore(initialState) ? initialState : store(initialState)

    const actions: Actions = {
        set: (function(key, value){
            map[key as any] = value
        }),

        setAll: function (entries) {
            if (entries instanceof Map){
                this.reset()
                entries.forEach((value, key)=>{
                    map[key] = value
                })

            }
            else if(Array.isArray(entries)){
                this.reset()
                for (let value of entries){
                    map[value[0]] = value[1]
                }
            }
            else if (isPrimitive(entries) == true){
                return
            }
            else{
                this.reset()
                Object.assign(map, entries)
            }

        },

        remove: (key => delete map[key as any]),

        reset: () => Object.getOwnPropertyNames(map).forEach(prop => delete map[prop]),

        entries: () => Object.entries(map) as any
    }

    if (initialState instanceof Map || Array.isArray(initialState) || isPrimitive(initialState)){
        actions.setAll(initialState)
    }

    return [map as any, actions]
}

