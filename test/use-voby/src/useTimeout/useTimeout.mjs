import "../../../woby/dist/index.es.mjs";
<<<<<<< HEAD
import { p as observable, h as effect } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { z as observable, h as effect } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
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
