import "../../../woby/dist/index.es.mjs";
import { useEventListener } from "../useEventListener/useEventListener.mjs";
import { localStoreDic } from "../useLocalStorage/useLocalStorage.mjs";
import { z as observable, h as effect } from "../../../woby/dist/use_microtask-10cd6273.mjs";
function useReadLocalStorage(key) {
  if (localStoreDic[key])
    return localStoreDic[key];
  const readValue = () => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return null;
    }
  };
  const storedValue = observable(readValue());
  localStoreDic[key] = storedValue;
  effect(() => {
    storedValue(readValue());
  });
  const handleStorageChange = (event) => {
    if ((event == null ? void 0 : event.key) && event.key !== key) {
      return;
    }
    storedValue(readValue());
  };
  useEventListener("storage", handleStorageChange);
  useEventListener("local-storage", handleStorageChange);
  return storedValue;
}
export {
  useReadLocalStorage
};
