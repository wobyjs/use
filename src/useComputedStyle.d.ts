import { Observable } from 'woby';
type CSSPropertyPattern = string | RegExp;
export declare function useComputedStyle<T extends HTMLElement = HTMLElement>(target: Observable<T>, patterns?: CSSPropertyPattern[]): Observable<{
    [key: string]: string;
}>;
export {};
//# sourceMappingURL=useComputedStyle.d.ts.map