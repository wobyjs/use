import "../../../woby/dist/index.es.mjs";
<<<<<<< HEAD
import { p as observable, g as get } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { z as observable, g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
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
