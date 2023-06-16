import "../../../woby/dist/index.es.mjs";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.mjs";
import { g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
function useDocumentTitle(title) {
  useIsomorphicLayoutEffect(() => {
    window.document.title = get(title);
  });
}
export {
  useDocumentTitle
};
