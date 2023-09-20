import { test, renderHook, act } from "../../../voby-jasmine/dist/jasmine.es.mjs";
import { useToggle } from "./useToggle.mjs";
describe("use toggle()", () => {
  test("should use toggle be ok", () => {
    const { result } = renderHook(() => useToggle());
    const [value, toggle] = result.current;
    expect(value()).toBe(false);
    expect(typeof toggle).toBe("function");
  });
  test("should default value works", () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;
    expect(value()).toBe(true);
  });
  test("setValue should mutate the value", () => {
    const { result } = renderHook(() => useToggle());
    const [value] = result.current;
    expect(result.current[0]()).toBe(false);
    act(() => {
      value(true);
    });
    expect(result.current[0]()).toBe(true);
    act(() => {
      value((prev) => !prev);
    });
    expect(result.current[0]()).toBe(false);
  });
  test("toggle should mutate the value", () => {
    const { result } = renderHook(() => useToggle());
    const [, toggle] = result.current;
    expect(result.current[0]()).toBe(false);
    act(() => {
      toggle();
    });
    expect(result.current[0]()).toBe(true);
    act(() => {
      toggle();
    });
    expect(result.current[0]()).toBe(false);
  });
});
