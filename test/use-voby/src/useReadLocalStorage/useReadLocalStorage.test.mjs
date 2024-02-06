import { test, renderHook } from "../../../woby-jasmine/dist/jasmine.es.mjs";
import { useReadLocalStorage } from "./useReadLocalStorage.mjs";
describe("useReadLocalStorage()", () => {
    test("should use read local storage", () => {
        const { result } = renderHook(() => useReadLocalStorage("test"));
        expect(result.current()).toBe(null);
    });
});
