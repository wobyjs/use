import "../../../woby/dist/index.es.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.mjs";
<<<<<<< HEAD
import { p as observable } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { z as observable } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
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
