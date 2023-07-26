import "../../../woby/dist/index.es.mjs";
import { p as observable, g as get } from "../../../woby/dist/use_microtask-e694cf95.mjs";
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
