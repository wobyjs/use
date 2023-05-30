import { p as observable, h as effect } from "../../../woby/dist/setters-0ed3c7f1.mjs";
function useInterval(callback, delay) {
  const savedCallback = observable(callback);
  effect(() => {
    if (!delay && delay !== 0) {
      return void 0;
    }
    const id = setInterval(() => savedCallback()(), delay);
    return () => clearInterval(id);
  });
}
export {
  useInterval
};
