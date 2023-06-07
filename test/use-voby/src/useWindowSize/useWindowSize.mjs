import { p as observable } from "../../../woby/dist/setters-0ed3c7f1.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.mjs";
function useWindowSize() {
  const windowSize = observable({
    width: 0,
    height: 0
  });
  const handleSize = () => {
    windowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  useEventListener("resize", handleSize);
  useIsomorphicLayoutEffect(() => {
    handleSize();
  });
  return windowSize();
}
export {
  useWindowSize
};
