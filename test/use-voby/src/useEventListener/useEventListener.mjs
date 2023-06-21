import "../../../woby/dist/index.es.mjs";
import { z as observable, h as effect, g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
function useEventListener(eventName, handler, element, options) {
  const savedHandler = observable(handler);
  return effect(() => {
    const targetElement = get(element) ?? window;
    if (!(targetElement && targetElement.addEventListener))
      return void 0;
    const listener = (event) => savedHandler()(event);
    targetElement.addEventListener(eventName, listener, options);
    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  });
}
export {
  useEventListener
};
