import { p as observable } from "../../../woby/dist/setters-0ed3c7f1.mjs";
function useCopyToClipboard() {
  const copiedText = observable(null);
  const copy = async (text) => {
    if (!(navigator == null ? void 0 : navigator.clipboard)) {
      console.warn("Clipboard not supported");
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      copiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      copiedText(null);
      return false;
    }
  };
  return [copiedText, copy];
}
export {
  useCopyToClipboard
};
