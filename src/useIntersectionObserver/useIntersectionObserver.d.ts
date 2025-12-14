import { Observable, type JSX } from 'woby';
interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}
export declare function useIntersectionObserver<T extends JSX.Element>(elementRef: Observable<T>, { threshold, root, rootMargin, freezeOnceVisible, }: Args): Observable<IntersectionObserverEntry>;
export {};
//# sourceMappingURL=useIntersectionObserver.d.ts.map