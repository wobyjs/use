import { fireEvent } from "../../node_modules/.pnpm/@testing-library_react@14.0.0_react-dom@18.2.0_react@18.2.0/node_modules/@testing-library/react/dist/@testing-library/react.esm.mjs";
import { jest, renderHook } from "../jasmine.mjs";
import { useEventListener } from "./useEventListener.mjs";
const windowAddEventListenerSpy = spyOn(window, "addEventListener");
const windowRemoveEventListenerSpy = spyOn(window, "removeEventListener");
const ref = { current: document.createElement("div") };
const refAddEventListenerSpy = spyOn(ref.current, "addEventListener");
const refRemoveEventListenerSpy = spyOn(ref.current, "removeEventListener");
const docRef = { current: window.document };
const docAddEventListenerSpy = spyOn(docRef.current, "addEventListener");
const docRemoveEventListenerSpy = spyOn(
  docRef.current,
  "removeEventListener"
);
describe("useEventListener()", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should bind/unbind the event listener to the window when element is not provided", () => {
    const eventName = "test-event";
    const handler = jest.fn();
    const options = void 0;
    const { unmount } = renderHook(() => useEventListener(eventName, handler));
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      jasmine.any(Function),
      options
    );
    unmount();
    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      jasmine.any(Function),
      options
    );
  });
  it("should bind/unbind the event listener to the element when element is provided", () => {
    const eventName = "test-event";
    const handler = jest.fn();
    const options = void 0;
    const { unmount } = renderHook(
      () => useEventListener(eventName, handler, ref.current[0], options)
    );
    expect(refAddEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(refAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      jasmine.any(Function),
      options
    );
    unmount();
    expect(refRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      jasmine.any(Function),
      options
    );
  });
  it("should bind/unbind the event listener to the document when document is provided", () => {
    const eventName = "test-event";
    const handler = jest.fn();
    const options = void 0;
    const { unmount } = renderHook(
      () => useEventListener(eventName, handler, docRef.current[0], options)
    );
    expect(docAddEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(docAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      jasmine.any(Function),
      options
    );
    unmount();
    expect(docRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      jasmine.any(Function),
      options
    );
  });
  it("should pass the options to the event listener", () => {
    const eventName = "test-event";
    const handler = jest.fn();
    const options = {
      passive: true,
      once: true,
      capture: true
    };
    renderHook(() => useEventListener(eventName, handler, void 0, options));
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      jasmine.any(Function),
      options
    );
  });
  it("should call the event listener handler when the event is triggered", () => {
    const eventName = "click";
    const handler = jest.fn();
    renderHook(() => useEventListener(eventName, handler, ref.current[0]));
    fireEvent.click(ref.current);
    expect(handler).toHaveBeenCalledTimes(1);
  });
  it("should have the correct event type", () => {
    const clickHandler = jest.fn();
    const keydownHandler = jest.fn();
    renderHook(() => useEventListener("click", clickHandler, ref.current[0]));
    renderHook(() => useEventListener("keydown", keydownHandler, ref.current[0]));
    fireEvent.click(ref.current);
    fireEvent.keyDown(ref.current);
    expect(clickHandler).toHaveBeenCalledWith(jasmine.any(MouseEvent));
    expect(keydownHandler).toHaveBeenCalledWith(jasmine.any(KeyboardEvent));
  });
});
