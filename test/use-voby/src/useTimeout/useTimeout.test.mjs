import { test, jest, renderHook } from "../../../woby-jasmine/dist/jasmine.es.mjs";
import { useTimeout } from "./useTimeout.mjs";
describe("useTimeout()", () => {
    test("should call the callback after 1 min", () => {
        jasmine.clock().install();
        const delay = 6e4;
        const callback = jest.fn("callbackSpy");
        renderHook(() => useTimeout(callback, delay));
        expect(callback).not.toHaveBeenCalled();
        jasmine.clock().tick(delay);
        expect(callback).toHaveBeenCalledTimes(1);
        jasmine.clock().uninstall();
    });
    test('should not do anything if "delay" is null', () => {
        const delay = null;
        const callback = jest.fn();
        renderHook(() => useTimeout(callback, delay));
        expect(callback).not.toHaveBeenCalled();
    });
});
