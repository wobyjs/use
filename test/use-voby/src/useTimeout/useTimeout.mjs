import { p as observable, h as effect } from "../../../woby/dist/setters-0ed3c7f1.mjs";
function useTimeout(callback, delay) {
  const savedCallback = observable(callback);
  effect(() => {
    if (!delay && delay !== 0) {
      return;
    }
    const id = setTimeout(() => savedCallback()(), delay);
    return () => clearTimeout(id);
  });
}
export {
  useTimeout
};
