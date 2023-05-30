import { p as observable } from "../../../woby/dist/setters-0ed3c7f1.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.mjs";
function useElementSize() {
  const ref = observable(null);
  const size = observable({
    width: 0,
    height: 0
  });
  const handleSize = () => {
    var _a, _b;
    size({
      width: ((_a = ref()) == null ? void 0 : _a.offsetWidth) || 0,
      height: ((_b = ref()) == null ? void 0 : _b.offsetHeight) || 0
    });
  };
  useEventListener("resize", handleSize);
  useIsomorphicLayoutEffect(() => {
    handleSize();
  });
  return [ref, size];
}
export {
  useElementSize
};
