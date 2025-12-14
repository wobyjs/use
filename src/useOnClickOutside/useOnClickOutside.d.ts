import { Observable } from 'woby';
type Handler = (event: MouseEvent) => void;
export declare function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: Observable<T>, handler: Handler, mouseEvent?: 'mousedown' | 'mouseup'): void;
export {};
//# sourceMappingURL=useOnClickOutside.d.ts.map