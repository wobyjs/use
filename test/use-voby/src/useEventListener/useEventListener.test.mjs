import { jest, renderHook, fireEvent } from "../jasmine.mjs";
import { useEventListener } from "./useEventListener.mjs";
import "../../../woby/dist/index.es.mjs";
import { p as observable } from "../../../woby/dist/use_microtask-e694cf95.mjs";
describe("useEventListener()", () => {
  const beforeEach = () => {
    const docRef = observable(window.document);
    const ref = observable(document.createElement("div"));
    const windowAddEventListenerSpy = () => spyOn(window, "addEventListener");
    const windowRemoveEventListenerSpy = () => spyOn(window, "removeEventListener");
    const refAddEventListenerSpy = () => spyOn(ref(), "addEventListener");
    const refRemoveEventListenerSpy = () => spyOn(ref(), "removeEventListener");
    const docAddEventListenerSpy = () => spyOn(docRef(), "addEventListener");
    const docRemoveEventListenerSpy = () => spyOn(docRef(), "removeEventListener");
    const unmount = () => ref().remove();
    return {
      ref,
      docRef,
      unmount,
      get windowAddEventListenerSpy() {
        return windowAddEventListenerSpy();
      },
      get windowRemoveEventListenerSpy() {
        return windowRemoveEventListenerSpy();
      },
      get refAddEventListenerSpy() {
        return refAddEventListenerSpy();
      },
      get refRemoveEventListenerSpy() {
        return refRemoveEventListenerSpy();
      },
      get docAddEventListenerSpy() {
        return docAddEventListenerSpy();
      },
      get docRemoveEventListenerSpy() {
        return docRemoveEventListenerSpy();
      }
    };
  };
  it("should bind/unbind the event listener to the window when element is not provided", () => {
    const eventName = "test-event";
    const handler = jest.fn();
    const options = void 0;
    const { windowAddEventListenerSpy, windowRemoveEventListenerSpy } = beforeEach();
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
    const handler = jest.fn("refHandler");
    const options = void 0;
    const { ref, refAddEventListenerSpy, refRemoveEventListenerSpy, unmount: um } = beforeEach();
    const { unmount } = renderHook(
      () => useEventListener(eventName, handler, ref, options)
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
    um();
  });
  it("should bind/unbind the event listener to the document when document is provided", () => {
    const eventName = "test-event";
    const handler = jest.fn();
    const options = void 0;
    const { docRef, docAddEventListenerSpy, docRemoveEventListenerSpy } = beforeEach();
    const { unmount } = renderHook(
      () => useEventListener(eventName, handler, docRef, options)
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
    const { windowAddEventListenerSpy } = beforeEach();
    renderHook(() => useEventListener(eventName, handler, void 0, options));
    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      jasmine.any(Function),
      options
    );
  });
  it("should call the event listener handler when the event is triggered", () => {
    const eventName = "click";
    const handler = jest.fn("clickHandler");
    const { ref, unmount } = beforeEach();
    ref().id = "testRef";
    renderHook(() => useEventListener(eventName, handler, ref));
    fireEvent.click(ref());
    expect(handler).toHaveBeenCalledTimes(1);
    unmount();
  });
  it("should have the correct event type", () => {
    const clickHandler = jest.fn("clickHandler");
    const keydownHandler = jest.fn("keydownHandler");
    const { ref, unmount } = beforeEach();
    renderHook(() => useEventListener("click", clickHandler, ref));
    renderHook(() => useEventListener("keydown", keydownHandler, ref));
    fireEvent.click(ref());
    fireEvent.keyDown(ref());
    expect(clickHandler).toHaveBeenCalledWith(jasmine.any(MouseEvent));
    expect(keydownHandler).toHaveBeenCalledWith(jasmine.any(KeyboardEvent));
    unmount();
  });
});
