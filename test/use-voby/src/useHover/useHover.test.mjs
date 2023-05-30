import { fireEvent } from "../../node_modules/.pnpm/@testing-library_react@14.0.0_react-dom@18.2.0_react@18.2.0/node_modules/@testing-library/react/dist/@testing-library/react.esm.mjs";
import { renderHook, act } from "../jasmine.mjs";
import { useHover } from "./useHover.mjs";
describe("useHover()", () => {
  const el = {
    current: document.createElement("div")
  };
  it("result must be initially false", () => {
    const { result } = renderHook(() => useHover(el));
    expect(result.current).toBe(false);
  });
  it("value must be true when firing hover action on element", () => {
    const { result } = renderHook(() => useHover(el));
    expect(result.current).toBe(false);
    act(() => void fireEvent.mouseEnter(el.current));
    expect(result.current).toBe(true);
  });
  it("value must turn back into false when firing mouseleave action on element", () => {
    const { result } = renderHook(() => useHover(el));
    expect(result.current).toBe(false);
    act(() => void fireEvent.mouseEnter(el.current));
    expect(result.current).toBe(true);
    act(() => void fireEvent.mouseLeave(el.current));
    expect(result.current).toBe(false);
  });
});
