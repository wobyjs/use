import "../../../woby/dist/index.es.mjs";
import { p as observable, h as effect } from "../../../woby/dist/use_microtask-e694cf95.mjs";
function useTimeout(callback, delay) {
  const savedCallback = observable(callback);
  effect(() => {
    if (!delay && delay !== 0) {
      return;
    }
    const id = setTimeout(() => savedCallback()(), delay);
    return () => clearTimeout(id);
  });
}
export {
  useTimeout
};
