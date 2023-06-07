import { p as observable, g as get } from "../../../woby/dist/setters-0ed3c7f1.mjs";
function useToggle(defaultValue) {
  const value = observable(!!get(defaultValue));
  const toggle = () => value((x) => !x);
  return [value, toggle];
}
export {
  useToggle
};
