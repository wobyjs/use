import "../../../woby/dist/index.es.mjs";
<<<<<<< HEAD
import { p as observable, g as get, h as effect } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { z as observable, g as get, h as effect } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
function useDebounce(value, delay) {
  const debouncedValue = observable(get(value));
  effect(() => {
    const timer = setTimeout(() => debouncedValue(get(value)), get(delay) || 500);
    return () => {
      clearTimeout(timer);
    };
  });
  return debouncedValue;
}
export {
  useDebounce
};
