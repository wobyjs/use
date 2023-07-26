import "../../../woby/dist/index.es.mjs";
import { p as observable, g as get, h as effect } from "../../../woby/dist/use_microtask-e694cf95.mjs";
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
