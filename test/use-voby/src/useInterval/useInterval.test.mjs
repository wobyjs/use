import { test, installClock, jest, renderHook, mockSetInterval, mockClearInterval } from "../jasmine.mjs";
import { p as observable, g as get } from "../../../woby/dist/setters-0ed3c7f1.mjs";
import { useInterval } from "./useInterval.mjs";
describe("useInterval()", () => {
  test("should fire the callback function (1)", async () => {
    const { tick } = installClock();
    const timeout = 500;
    const callback = jest.fn();
    renderHook(() => useInterval(callback, timeout));
    tick(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  test("should fire the callback function (2)", async () => {
    const { tick } = installClock();
    const timeout = 500;
    const earlyTimeout = 400;
    const callback = jest.fn();
    renderHook(() => useInterval(callback, timeout));
    tick(earlyTimeout);
    expect(callback).not.toHaveBeenCalled();
  });
  test("should call set interval on start", () => {
    const timeout = 1200;
    mockSetInterval();
    const callback = jest.fn();
    renderHook(() => useInterval(callback, timeout));
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(jasmine.any(Function), timeout);
  });
  test("should call clearTimeout on unmount", () => {
    mockClearInterval();
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1200));
    unmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
  test("should change delay", () => {
    const delay = observable(1200);
    const { tick } = installClock();
    const callback = jest.fn("callbackSpy");
    renderHook(() => useInterval(callback, delay));
    tick(1200);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(jasmine.any(Function), get(delay));
    delay(100);
    tick(1e3);
    expect(setInterval).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledTimes(11);
  });
});
