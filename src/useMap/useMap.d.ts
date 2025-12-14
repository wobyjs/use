export type MapOrEntries = Map<any, any> | [any, any][] | Object;
export interface Actions {
    set: (key: any, value: any) => void;
    setAll: (entries: Object | Map<any, any> | [any, any][]) => void;
    remove: (key: string) => void;
    reset: (Map<any, any>['clear']);
    entries: () => [any, any][];
}
export declare function useMap<T extends MapOrEntries>(initialState?: T): [T extends Map<any, any> | [any, any][] ? any : T, Actions];
//# sourceMappingURL=useMap.d.ts.map