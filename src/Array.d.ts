import { Observable, type JSX } from 'woby';
export declare const ArrayContext: JSX.Context<unknown>;
export type ArrayProp<T, A, I> = {
    children?: T[] | T;
    arrayContext?: (children: T[]) => A;
    itemContext?: (item: T, index: number, arrayContext: A) => I;
    ref?: JSX.Refs<A>;
};
/**
 * A hook that provides access to the current array context.
 *
 * This hook is used within array rendering components to access the array context
 * which contains information about the current item, its index, and other array-related data.
 *
 * @template T - The type of the array context
 * @returns The array context value
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about contexts
 */
export declare function useArray<T>(): T;
/**
 * A component function for rendering arrays with context.
 *
 * This function creates array items with associated context, allowing each item
 * to have access to its index, the array context, and item-specific context.
 *
 * @template T - The type of array items
 * @template A - The type of array context
 * @template I - The type of item context
 * @param props - The component props
 * @param props.children - The array items to render
 * @param props.arrayContext - Function to create array context from children
 * @param props.itemContext - Function to create item context from item and index
 * @param props.ref - Reference to the array context
 * @returns Array of JSX elements with context
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables and contexts
 */
export declare const array: <T, A, I>({ children, arrayContext, itemContext, ref, ...props }: ArrayProp<T, A, I>) => JSX.Child[] & A;
/**
 * A component for rendering arrays with context.
 *
 * This component is a wrapper around the array function that provides a more
 * convenient JSX interface for rendering arrays with context.
 *
 * @template T - The type of array items
 * @template L - The type of array context
 * @template I - The type of item context
 * @param props - The component props
 * @returns Array of JSX elements with context
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables and contexts
 */
export declare const Array: <T, L, I>(props: ArrayProp<T, L, I>) => JSX.Child[] & L;
/**
 * A component for rendering arrays with default context.
 *
 * This component provides default array and item contexts for simple array rendering
 * where each item gets a reference to an observable value.
 *
 * @template T - The type of array items
 * @param props - The component props
 * @param props.children - The array items to render
 * @param props.arrayContext - Optional function to create custom array context
 * @param props.itemContext - Optional function to create custom item context
 * @returns Array of JSX elements with default context
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables and contexts
 */
export declare const defaultArray: <T>({ children, arrayContext: ac, itemContext: ic }: ArrayProp<T, {
    refs: Observable<T>[];
}, {
    ref: Observable<T>;
}>) => JSX.Child[] & {
    refs: Observable<T>[];
};
/**
 * A component for rendering arrays with default context.
 *
 * This component provides a simple way to render arrays where each item gets
 * a reference to an observable value, without needing to specify context functions.
 *
 * @template T - The type of array items
 * @param props - The component props
 * @param props.children - The array items to render
 * @returns Array of JSX elements with default context
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables and contexts
 */
export declare const DefaultArray: <T>({ children }: ArrayProp<T, {
    refs: Observable<T>[];
}, {
    ref: Observable<T>;
}>) => JSX.Child;
/**
 * A hook that provides access to the default array context.
 *
 * This hook provides access to the default array context which includes
 * references to observable values for each item, the current index, and the current item.
 *
 * @template T - The type of array items
 * @returns The default array context
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about contexts
 */
export declare const useDefaultArray: <T>() => {
    refs: Observable<T>[];
    ref: Observable<T>;
    index: number;
    item: T;
};
//# sourceMappingURL=Array.d.ts.map