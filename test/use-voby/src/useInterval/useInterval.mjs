import { p as observable, h as effect, g as get } from "../../../woby/dist/setters-0ed3c7f1.mjs";
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
