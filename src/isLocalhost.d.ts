/**
 * A computed observable that determines if the current host is localhost.
 *
 * This observable automatically updates when the location changes and returns
 * true if the current host includes 'localhost' in its name.
 *
 * @returns An observable boolean that is true when the current host is localhost
 *
 * @example
 * ```tsx
 * return (
 *   <div>
 *     {() => isLocalhost() ? 'Running on localhost' : 'Running on production'}
 *   </div>
 * )
 * ```
 *
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare const isLocalhost: import("woby").ObservableReadonly<boolean>;
//# sourceMappingURL=isLocalhost.d.ts.map