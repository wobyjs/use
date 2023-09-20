import "../../../woby/dist/index.es.mjs";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.mjs";
<<<<<<< HEAD
import { g as get } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { g as get } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
function useDocumentTitle(title) {
  useIsomorphicLayoutEffect(() => {
    window.document.title = get(title);
  });
}
export {
  useDocumentTitle
};
