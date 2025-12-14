import { Observable, type JSX, ObservableMaybe } from 'woby';
import { ArrayProp } from './Array';
export type ArrayType<T> = {
    refs: Observable<T>[];
    actives: Observable<boolean>[] & {
        updated: Observable<number>;
    };
};
export type ItemType<T> = {
    index: number;
    childIndex: number;
    item: T;
    ref: Observable<T>;
    refs: Observable<T>[];
    /** use toggle to set value, not active() */
    active: Observable<boolean> & {
        updated: Observable<number>;
    };
    /** use toggle to set value, not active() */
    toggle: (val?: boolean) => boolean;
};
/**
 * A hook that provides access to the ratio context.
 *
 * This hook is used within Ratio components to access the ratio context
 * which contains information about the current item, its index, and active state.
 *
 * @template T - The type of the ratio context
 * @returns The ratio context value
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about contexts
 */
export declare const useRatio: <T>() => ArrayType<T> & ItemType<T>;
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
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables and contexts
 */
/** refs, ref refer to parent Array index */
export declare const Ratio: <T>({ children, multiple, group, ref, arrayContext, itemContext, ...props }: ArrayProp<T, ArrayType<T>, ItemType<T>> & {
    multiple?: ObservableMaybe<boolean>;
    /** toggleing the whole group */
    group?: ObservableMaybe<boolean>;
}) => JSX.Child;
//# sourceMappingURL=Ratio.d.ts.map