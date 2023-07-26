import "../../../woby/dist/index.es.mjs";
import { p as observable, g as get } from "../../../woby/dist/use_microtask-e694cf95.mjs";
function useToggle(defaultValue) {
  const value = observable(!!get(defaultValue));
  const toggle = () => value((x) => !x);
  return [value, toggle];
}
export {
  useToggle
};
