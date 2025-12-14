export type SetOrEntries<T> = Set<T> | T[] | Iterable<T>;
export interface SetActions<T> {
    add: (value: T) => void;
    remove: (value: T) => void;
    clear: () => void;
    reset: (values?: SetOrEntries<T>) => void;
    entries: () => T[];
}
export declare function useSet<T>(initialState?: SetOrEntries<T>): [T[], SetActions<T>];
//# sourceMappingURL=useSet.d.ts.map