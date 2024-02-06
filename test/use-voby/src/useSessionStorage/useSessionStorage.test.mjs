import { test, renderHook, act } from "../../../woby-jasmine/dist/jasmine.es.mjs";
import { useSessionStorage } from "./useSessionStorage.mjs";
class SessionStorageMock {
    constructor() {
        this.store = {};
    }
    clear() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = value + "";
    }
    removeItem(key) {
        delete this.store[key];
    }
}
Object.defineProperty(window, "sessionStorage", {
    value: new SessionStorageMock()
});
describe("useSessionStorage()", () => {
    beforeEach(() => {
        window.sessionStorage.clear();
    });
    afterEach(() => {
        window.sessionStorage.clear();
    });
    test("initial state is in the returned state", () => {
        const { result } = renderHook(() => useSessionStorage("key", "value"));
        expect(result.current()).toBe("value");
    });
    test("Initial state is a callback function", () => {
        const { result } = renderHook(() => useSessionStorage("key", () => "value"));
        expect(result.current()()).toBe("value");
    });
    test("Initial state is an array", () => {
        const { result } = renderHook(() => useSessionStorage("digits", [1, 2]));
        expect(result.current()).toEqual([1, 2]);
    });
    test("Update the state", () => {
        const { result } = renderHook(() => useSessionStorage("key", "value"));
        act(() => {
            const setState = result.current;
            setState("edited");
        });
        expect(result.current()).toBe("edited");
    });
    test("Update the state writes sessionStorage", () => {
        const { result } = renderHook(() => useSessionStorage("key", "value"));
        act(() => {
            const setState = result.current;
            setState("edited");
        });
        expect(window.sessionStorage.getItem("key")).toBe(JSON.stringify("edited"));
    });
    test("Update the state with undefined", () => {
        const { result } = renderHook(
            () => useSessionStorage("keytest", "value")
        );
        act(() => {
            const setState = result.current;
            setState(void 0);
        });
        expect(result.current()).toBeUndefined();
    });
    test("Update the state with a callback function", () => {
        const { result } = renderHook(() => useSessionStorage("count", 2));
        act(() => {
            const setState = result.current;
            setState((prev) => prev + 1);
        });
        expect(result.current()).toBe(3);
        expect(window.sessionStorage.getItem("count")).toEqual("3");
    });
    test("[Event] Update one hook updates the others", () => {
        const initialValues = ["key", "initial"];
        const { result: A } = renderHook(() => useSessionStorage(...initialValues));
        const { result: B } = renderHook(() => useSessionStorage(...initialValues));
        act(() => {
            const setState = A.current;
            setState("edited");
        });
        expect(B.current()).toBe("edited");
    });
    test("setValue is referentially stable", () => {
        const { result } = renderHook(() => useSessionStorage("count", 1));
        const originalCallback = result.current;
        act(() => {
            const setState = result.current;
            setState((prev) => prev + 1);
        });
        expect(result.current === originalCallback).toBe(true);
    });
});
