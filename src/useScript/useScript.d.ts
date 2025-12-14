import { Observable } from 'woby';
export type UseScriptStatus = 'idle' | 'loading' | 'ready' | 'error';
export interface UseScriptOptions {
    shouldPreventLoad?: boolean;
    removeOnUnmount?: boolean;
}
export declare function useScript(src: string | null, options?: UseScriptOptions): Observable<UseScriptStatus>;
//# sourceMappingURL=useScript.d.ts.map