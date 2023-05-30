import { test, renderHook, act } from "../jasmine.mjs";
import { useCountdown } from "./useCountdown.mjs";
describe("useCountdown()", () => {
  beforeEach(function() {
    jasmine.clock().install();
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });
  test("should return callable functions", () => {
    const { result } = renderHook(
      () => useCountdown({ countStart: 60, intervalMs: 500, isIncrement: false })
    );
    expect(result.current[0]()).toBe(60);
    expect(typeof result.current[1].startCountdown).toBe("function");
    expect(typeof result.current[1].stopCountdown).toBe("function");
    expect(typeof result.current[1].resetCountdown).toBe("function");
  });
  test("should accept countStart", () => {
    const { result } = renderHook(() => useCountdown({ countStart: 30 }));
    expect(result.current[0]()).toBe(30);
    expect(typeof result.current[1].startCountdown).toBe("function");
    expect(typeof result.current[1].stopCountdown).toBe("function");
    expect(typeof result.current[1].resetCountdown).toBe("function");
  });
  test("should accept intervalMs", () => {
    const { result } = renderHook(
      () => useCountdown({ countStart: 60, intervalMs: 500 })
    );
    expect(result.current[0]()).toBe(60);
    expect(typeof result.current[1].startCountdown).toBe("function");
    expect(typeof result.current[1].stopCountdown).toBe("function");
    expect(typeof result.current[1].resetCountdown).toBe("function");
    act(() => {
      result.current[1].startCountdown();
      jasmine.clock().tick(1e3);
    });
    expect(result.current[0]()).toBe(59);
  });
  test("should stop at countStop (default: 0)", () => {
    const { result } = renderHook(
      () => useCountdown({ countStart: 60, intervalMs: 1e3 })
    );
    expect(result.current[0]()).toBe(60);
    expect(typeof result.current[1].startCountdown).toBe("function");
    expect(typeof result.current[1].stopCountdown).toBe("function");
    expect(typeof result.current[1].resetCountdown).toBe("function");
    act(result.current[1].startCountdown);
    act(() => {
      jasmine.clock().tick(60 * 1e3);
    });
    expect(result.current[0]()).toBe(0);
    act(() => {
      jasmine.clock().tick(1e3);
    });
    expect(result.current[0]()).toBe(0);
  });
  test("should stop at custom countStop", () => {
    const { result } = renderHook(
      () => useCountdown({ countStart: 60, intervalMs: 1e3, countStop: 30 })
    );
    expect(result.current[0]()).toBe(60);
    expect(typeof result.current[1].startCountdown).toBe("function");
    expect(typeof result.current[1].stopCountdown).toBe("function");
    expect(typeof result.current[1].resetCountdown).toBe("function");
    act(result.current[1].startCountdown);
    act(() => {
      jasmine.clock().tick(30 * 1e3);
    });
    expect(result.current[0]()).toBe(30);
    act(() => {
      jasmine.clock().tick(1e3);
    });
    expect(result.current[0]()).toBe(30);
  });
  test("should stop countdown", () => {
    const { result } = renderHook(
      () => useCountdown({ countStart: 60, intervalMs: 1e3 })
    );
    expect(result.current[0]()).toBe(60);
    act(result.current[1].startCountdown);
    act(() => {
      jasmine.clock().tick(2e3);
    });
    expect(result.current[0]()).toBe(58);
    act(result.current[1].stopCountdown);
    act(() => {
      jasmine.clock().tick(3e3);
    });
    expect(result.current[0]()).toBe(58);
  });
  test("should stop reversed countdown", () => {
    const { result } = renderHook(
      () => useCountdown({
        countStart: 10,
        intervalMs: 1e3,
        countStop: 20,
        isIncrement: true
      })
    );
    expect(result.current[0]()).toBe(10);
    act(result.current[1].startCountdown);
    act(() => {
      jasmine.clock().tick(2 * 1e3);
    });
    expect(result.current[0]()).toBe(12);
    act(() => {
      jasmine.clock().tick(8 * 1e3);
    });
    expect(result.current[0]()).toBe(20);
    act(() => {
      jasmine.clock().tick(3 * 1e3);
    });
    expect(result.current[0]()).toBe(20);
  });
  test("should reset count", () => {
    const { result } = renderHook(
      () => useCountdown({ countStart: 60, intervalMs: 1e3 })
    );
    act(result.current[1].startCountdown);
    act(() => {
      jasmine.clock().tick(1e3);
    });
    act(result.current[1].stopCountdown);
    expect(result.current[0]()).toBeLessThan(60);
    act(result.current[1].resetCountdown);
    expect(result.current[0]()).toBe(60);
  });
});
