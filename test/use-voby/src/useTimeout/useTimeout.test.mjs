import { test, jest, renderHook, act } from "../jasmine.mjs";
import { useTimeout } from "./useTimeout.mjs";
describe("useTimeout()", () => {
  beforeEach(function() {
    jasmine.clock().install();
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });
  test("should call the callback after 1 min", () => {
    const delay = 6e4;
    const callback = jest.fn("callbackSpy");
    renderHook(() => useTimeout(callback, delay));
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      jasmine.clock().tick(delay);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
  test('should not do anything if "delay" is null', () => {
    const delay = null;
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, delay));
    expect(callback).not.toHaveBeenCalled();
  });
});
