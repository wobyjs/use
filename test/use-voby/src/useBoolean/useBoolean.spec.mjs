import { test, renderHook, act } from "../../../woby-jasmine/dist/jasmine.es.mjs";
import { useBoolean } from "./useBoolean.mjs";
describe("useBoolean()", () => {
    test("should use boolean", () => {
        const { result } = renderHook(() => useBoolean());
        expect(result.current.value()).toBe(false);
        expect(typeof result.current.setTrue).toBe("function");
        expect(typeof result.current.setFalse).toBe("function");
        expect(typeof result.current.toggle).toBe("function");
        expect(typeof result.current.value).toBe("function");
    });
    test("should default value works (1)", () => {
        const { result } = renderHook(() => useBoolean(true));
        expect(result.current.value()).toBe(true);
    });
    test("should default value works (2)", () => {
        const { result } = renderHook(() => useBoolean(false));
        expect(result.current.value()).toBe(false);
    });
    test("should set to true (1)", () => {
        const { result } = renderHook(() => useBoolean(false));
        act(() => {
            result.current.setTrue();
        });
        expect(result.current.value()).toBe(true);
    });
    test("should set to true (2)", () => {
        const { result } = renderHook(() => useBoolean(false));
        act(() => {
            result.current.setTrue();
            result.current.setTrue();
        });
        expect(result.current.value()).toBe(true);
    });
    test("should set to false (1)", () => {
        const { result } = renderHook(() => useBoolean(true));
        act(() => {
            result.current.setFalse();
        });
        expect(result.current.value()).toBe(false);
    });
    test("should set to false (2)", () => {
        const { result } = renderHook(() => useBoolean(true));
        act(() => {
            result.current.setFalse();
            result.current.setFalse();
        });
        expect(result.current.value()).toBe(false);
    });
    test("should toggle value", () => {
        const { result } = renderHook(() => useBoolean(true));
        act(() => {
            result.current.toggle();
        });
        expect(result.current.value()).toBe(false);
    });
    test("should toggle value from prev using setValue", () => {
        const { result } = renderHook(() => useBoolean(true));
        act(() => {
            result.current.value((x) => !x);
        });
        expect(result.current.value()).toBe(false);
    });
});
