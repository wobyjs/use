import { test, renderHook, act } from "../jasmine.mjs";
import { localStoreDic, useLocalStorage } from "./useLocalStorage.mjs";
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
    Object.getOwnPropertyNames(localStoreDic).forEach((property) => {
      delete localStoreDic[property];
    });
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
Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock()
});
describe("useLocalStorage()", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(() => {
    window.sessionStorage.clear();
  });
  test("initial state is in the returned state", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));
    expect(result.current()).toBe("value");
  });
  test("Initial state is a callback function", () => {
    const { result } = renderHook(() => useLocalStorage("key", () => "value"));
    expect(result.current()).toBe("value");
  });
  test("Initial state is an array", () => {
    const { result } = renderHook(() => useLocalStorage("digits", [1, 2]));
    expect(result.current()).toEqual([1, 2]);
  });
  test("Update the state", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));
    act(() => {
      const setState = result.current;
      setState("edited");
    });
    expect(result.current()).toBe("edited");
  });
  test("Update the state writes localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));
    act(() => {
      const setState = result.current;
      setState("edited");
    });
    expect(window.localStorage.getItem("key")).toBe(JSON.stringify("edited"));
  });
  test("Update the state with undefined", () => {
    const { result } = renderHook(
      () => useLocalStorage("key", "value")
    );
    act(() => {
      const setState = result.current;
      setState(void 0);
    });
    expect(result.current()).toBeUndefined();
  });
  test("Update the state with null", () => {
    const { result } = renderHook(
      () => useLocalStorage("key", "value")
    );
    act(() => {
      const setState = result.current;
      setState(null);
    });
    expect(result.current()).toBeNull();
  });
  test("Update the state with a callback function", () => {
    const { result } = renderHook(() => useLocalStorage("count", 2));
    act(() => {
      const setState = result.current;
      setState((prev) => prev + 1);
    });
    expect(result.current()).toBe(3);
    expect(window.localStorage.getItem("count")).toEqual("3");
  });
  test("[Event] Update one hook updates the others", () => {
    const initialValues = ["key", "initial"];
    const { result: A } = renderHook(() => useLocalStorage(...initialValues));
    const { result: B } = renderHook(() => useLocalStorage(...initialValues));
    act(() => {
      const setState = A.current;
      setState("edited");
    });
    expect(B.current()).toBe("edited");
  });
  test("setValue is referentially stable", () => {
    const { result } = renderHook(() => useLocalStorage("count", 1));
    const originalCallback = result.current;
    act(() => {
      const setState = result.current;
      setState((prev) => prev + 1);
    });
    expect(result.current === originalCallback).toBe(true);
  });
});
