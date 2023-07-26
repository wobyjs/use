import "../../../woby/dist/index.es.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
import { p as observable, h as effect } from "../../../woby/dist/use_microtask-e694cf95.mjs";
const sessionStorageDic = {};
function useSessionStorage(key, initialValue) {
  if (sessionStorageDic[key])
    return sessionStorageDic[key];
  const readValue = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? parseJSON(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  };
  const storedValue = observable(readValue());
  effect(() => {
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting sessionStorage key “${key}” even though environment is not a client`
      );
    }
    try {
      const newValue = storedValue();
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(new Event("session-storage"));
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error);
    }
  });
  const handleStorageChange = (event) => {
    if ((event == null ? void 0 : event.key) && event.key !== key) {
      return;
    }
    storedValue(readValue());
  };
  useEventListener("storage", handleStorageChange);
  useEventListener("session-storage", handleStorageChange);
  return storedValue;
}
function parseJSON(value) {
  try {
    return value === "undefined" ? void 0 : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return void 0;
  }
}
export {
  sessionStorageDic,
  useSessionStorage
};
