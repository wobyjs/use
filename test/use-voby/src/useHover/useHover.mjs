import "../../../woby/dist/index.es.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
import { z as observable } from "../../../woby/dist/use_microtask-10cd6273.mjs";
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
