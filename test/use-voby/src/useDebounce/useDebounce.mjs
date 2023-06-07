import { p as observable, g as get, h as effect } from "../../../woby/dist/setters-0ed3c7f1.mjs";
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
