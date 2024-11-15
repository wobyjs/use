import { $, createContext, isArray, Observable, setRef, useContext, type JSX } from 'woby'

export const ArrayContext = createContext()

export type ArrayProp<T, A, I> = {
    children?: T[] | T,
    arrayContext?: (children: T[]) => A
    itemContext?: (item: T, index: number, arrayContext: A) => I
    ref?: JSX.Refs<A>
}

export function useArray<T>() {
    const context = useContext(ArrayContext)
    // if (!context) 
    //     throw new Error('useArray must be used within an useLoop/Loop context')
    return context as T
}

export const array = <T, A, I>({ children, arrayContext, itemContext, ref, ...props }: ArrayProp<T, A, I>) => {
    if (!children) return []

    const childs = (isArray(children) ? children : [children])
    const array = arrayContext?.(childs) // Create refs for each item

    setRef(array, ref as any)

    return childs.map((item, index) => <ArrayContext.Provider value={{ ...array, ...(itemContext?.(item, index, array) ?? {}), index, item }} children={item as any} />)
}

export const Array = <T, L, I>(props: ArrayProp<T, L, I>) => array(props)

export const DefaultArray = <T,>({ children }: ArrayProp<T, { refs: Observable<T>[] }, { ref: Observable<T> }>) => <Array arrayContext={children => ({ refs: children.map(c => $()) })} itemContext={(item, index, ctx) => ({ ref: ctx.refs[index] })} children={children} />

export const useDefaultArray = <T,>() => useArray<{
    refs: Observable<T>[],
    ref: Observable<T>,
    index: number,
    item: T,
}>()
