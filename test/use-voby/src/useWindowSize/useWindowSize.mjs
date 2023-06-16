import "../../../woby/dist/index.es.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.mjs";
import { z as observable } from "../../../woby/dist/use_microtask-10cd6273.mjs";
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
