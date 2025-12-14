/**
 * A hook that provides reactive access to screen orientation information.
 *
 * This hook returns observables for the current screen angle and orientation type,
 * and automatically updates when the device is rotated. It also provides access
 * to the screen orientation API methods.
 *
 * @returns An object containing:
 *   - angle: An observable number representing the current screen angle in degrees
 *   - type: An observable string representing the current orientation type
 *   - dispatchEvent: Function to dispatch orientation change events
 *   - unlock: Function to unlock screen orientation
 *
 * @example
 * ```tsx
 * const { angle, type } = useScreenOrientation()
 *
 * return (
 *   <div>
 *     <p>Angle: {angle}</p>
 *     <p>Type: {type}</p>
 *   </div>
 * )
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation|Screen Orientation API documentation}
 * @see {@link https://github.com/vobyjs/woby|Woby documentation} for more information about observables
 */
export declare const useScreenOrientation: () => {
    angle: import("woby").Observable<number>;
    type: import("woby").Observable<OrientationType | undefined>;
    dispatchEvent: {
        (event: Event): boolean;
        (event: Event): boolean;
        (event: Event): boolean;
    };
    unlock: {
        (): void;
        (): void;
    };
};
//# sourceMappingURL=useScreenOrientation.d.ts.map