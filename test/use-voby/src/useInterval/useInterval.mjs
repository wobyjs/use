import "../../../woby/dist/index.es.mjs";
import { z as observable, h as effect, g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
function useInterval(callback, delay) {
  const savedCallback = observable(callback);
  effect(() => {
    if (!get(delay) && get(delay) !== 0) {
      return void 0;
    }
    const id = setInterval(() => savedCallback()(), get(delay));
    return () => clearInterval(id);
  });
}
export {
  useInterval
};
