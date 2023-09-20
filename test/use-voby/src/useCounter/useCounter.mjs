import "../../../woby/dist/index.es.mjs";
<<<<<<< HEAD
import { p as observable, g as get } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { z as observable, g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
function useCounter(initialValue) {
  const count = observable(get(initialValue) || 0);
  const increment = () => count((x) => x + 1);
  const decrement = () => count((x) => x - 1);
  const reset = () => count(get(initialValue) || 0);
  return {
    count,
    increment,
    decrement,
    reset
  };
}
export {
  useCounter
};
