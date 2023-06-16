import "../../../woby/dist/index.es.mjs";
import { z as observable, g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
function useToggle(defaultValue) {
  const value = observable(!!get(defaultValue));
  const toggle = () => value((x) => !x);
  return [value, toggle];
}
export {
  useToggle
};
