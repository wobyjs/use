import { renderHook, act, fireEvent } from "../jasmine.mjs";
import { useHover } from "./useHover.mjs";
describe("useHover()", () => {
  const el = document.createElement("div");
  it("result must be initially false", () => {
    const { result } = renderHook(() => useHover(el));
    expect(result.current()).toBe(false);
  });
  it("value must be true when firing hover action on element", () => {
    const { result } = renderHook(() => useHover(el));
    expect(result.current()).toBe(false);
    act(() => void fireEvent.mouseEnter(el));
    expect(result.current()).toBe(true);
  });
  it("value must turn back into false when firing mouseleave action on element", () => {
    const { result } = renderHook(() => useHover(el));
    expect(result.current()).toBe(false);
    act(() => void fireEvent.mouseEnter(el));
    expect(result.current()).toBe(true);
    act(() => void fireEvent.mouseLeave(el));
    expect(result.current()).toBe(false);
  });
});
