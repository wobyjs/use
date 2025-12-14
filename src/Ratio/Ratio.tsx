import { $, $$, Observable, type JSX, ObservableMaybe, useContext, isArray } from 'woby'
import { Array, ArrayContext, ArrayProp } from '../Array/Array'

export type ArrayType<T> = { refs: Observable<T>[], actives: Observable<boolean>[] & { updated: Observable<number> } }
export type ItemType<T> = {
    index: number,
    childIndex: number,
    item: T,
    ref: Observable<T>,
    refs: Observable<T>[],
    /** use toggle to set value, not active() */
    active: Observable<boolean> & { updated: Observable<number> },
    /** use toggle to set value, not active() */
    toggle: (val?: boolean) => boolean
}

/**
 * A hook that provides access to the ratio context.
 * 
 * This hook is used within Ratio components to access the ratio context
 * which contains information about the current item, its index, and active state.
 * 
 * @template T - The type of the ratio context
 * @returns The ratio context value
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about contexts
 */
export const useRatio = <T,>() => {
    const context = useContext(ArrayContext)
    // if (!context)
    //     throw new Error('useRatio must be used within an Ratio context')
    return context as ArrayType<T> & ItemType<T>

}

/**
 * A component for rendering items with ratio selection capabilities.
 * 
 * This component allows for single or multiple selection of items in an array,
 * with support for group selection. Each item gets a toggle function to control
 * its active state.
 * 
 * @template T - The type of array items
 * @param props - The component props
 * @param props.children - The array items to render
 * @param props.multiple - Whether multiple items can be selected
 * @param props.group - Whether toggling affects the whole group
 * @param props.ref - Reference to the array context
 * @returns Array of JSX elements with ratio selection context
 * 
 * @see {@link https://github.com/wobyjs/woby|Woby documentation} for more information about observables and contexts
 */
/** refs, ref refer to parent Array index */
export const Ratio = <T,>({ children, multiple = false, group = false, ref, arrayContext, itemContext, ...props }: ArrayProp<T, ArrayType<T>, ItemType<T>> & {
    multiple?: ObservableMaybe<boolean>,
    /** toggleing the whole group */
    group?: ObservableMaybe<boolean>
}) => {
    // if (!children) return []

    // const childs = (isArray(children) ? children : [children])

    // let { refs, actives } = useArray<ArrayType<T>>() ?? {} as ArrayType<T>
    // const base = !refs ? 0 : refs.length

    // //attach to parent array
    // if (!refs)
    //     refs = childs.map(_c => $()) //1st level
    // else
    //     refs.push(...(childs.map(_c => $()) as Observable<T>[]))

    // actives = childs.map(_c => $(false)) //1st level

    return <Array ref={ref}
        arrayContext={children => Object.assign(({ refs: children.map(_c => $<T>()), actives: Object.assign(children.map(_c => $(false)), { updated: $(0) }), }), arrayContext?.(children) ?? {})}
        itemContext={(item, index, ctx) => {

            return Object.assign({
                ref: ctx.refs[/* base +  */ index], //flaten array index
                active: ctx.actives[index],
                item,
                index: /* base +  */index,
                // childIndex: index,
                toggle: (val?: boolean) => {
                    const v = val === void 0 ? !$$(ctx.actives[index]) : val

                    if ($$(group))
                        ctx.actives.forEach((act, i) => act(v))  // toggle wohle group
                    else if ($$(multiple))
                        ctx.actives[index](v)  // Toggle the selected child in multiple mode
                    else
                        if (v)
                            ctx.actives.forEach((act, i) => act(i === index))  // Deactivate all except the selected one
                        else
                            ctx.actives[index](v)  // Toggle the selected child in multiple mode

                    ctx.actives.updated(Math.random())
                    return v
                }
            }, itemContext?.(item, index, ctx) ?? {})
        }}
        children={children} />
}