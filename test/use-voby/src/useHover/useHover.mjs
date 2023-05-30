import { p as observable } from "../../../woby/dist/setters-0ed3c7f1.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
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
