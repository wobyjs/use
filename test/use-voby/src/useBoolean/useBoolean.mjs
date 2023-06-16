import "../../../woby/dist/index.es.mjs";
import { z as observable, g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
function useBoolean(defaultValue) {
  const value = observable(!!get(defaultValue));
  const setTrue = () => value(true);
  const setFalse = () => value(false);
  const toggle = () => value((x) => !x);
  return { value, setTrue, setFalse, toggle };
}
export {
  useBoolean
};
