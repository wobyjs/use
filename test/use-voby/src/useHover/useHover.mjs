import "../../../woby/dist/index.es.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
<<<<<<< HEAD
import { p as observable } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { z as observable } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
function useHover(elementRef) {
  const value = observable(false);
  const handleMouseEnter = () => value(true);
  const handleMouseLeave = () => value(false);
  useEventListener("mouseenter", handleMouseEnter, elementRef);
  useEventListener("mouseleave", handleMouseLeave, elementRef);
  return value;
}
export {
  useHover
};
