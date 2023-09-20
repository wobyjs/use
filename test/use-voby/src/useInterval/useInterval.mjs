import "../../../woby/dist/index.es.mjs";
<<<<<<< HEAD
import { p as observable, h as effect, g as get } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { z as observable, h as effect, g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
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
