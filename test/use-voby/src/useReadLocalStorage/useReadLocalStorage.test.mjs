import { test, renderHook } from "../jasmine.mjs";
import { useReadLocalStorage } from "./useReadLocalStorage.mjs";
describe("useReadLocalStorage()", () => {
  test("should use read local storage", () => {
    const { result } = renderHook(() => useReadLocalStorage("test"));
    expect(result.current()).toBe(null);
  });
});
