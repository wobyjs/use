import { g as get } from "../../../woby/dist/setters-0ed3c7f1.mjs";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.mjs";
function useDocumentTitle(title) {
  useIsomorphicLayoutEffect(() => {
    window.document.title = get(title);
  });
}
export {
  useDocumentTitle
};
