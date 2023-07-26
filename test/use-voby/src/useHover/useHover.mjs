import "../../../woby/dist/index.es.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
import { p as observable } from "../../../woby/dist/use_microtask-e694cf95.mjs";
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
