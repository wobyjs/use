import "../../../woby/dist/index.es.mjs";
<<<<<<< HEAD
import { w as isStore, x as store } from "../../../woby/dist/use_microtask-e694cf95.mjs";
=======
import { D as isStore, E as store } from "../../../woby/dist/use_microtask-10cd6273.mjs";
>>>>>>> 570648add711297d611963e7cf51162b828a8b0b
function isPrimitive(test) {
  return test !== Object(test);
}
function useMap(initialState) {
  function addElements(entries) {
    const map2 = {};
    if (entries instanceof Map) {
      entries.forEach((value, key) => {
        map2[key] = value;
      });
    } else if (Array.isArray(entries)) {
      for (let value of entries) {
        map2[value[0]] = value[1];
      }
    } else if (isPrimitive(entries) == true) {
      return store({});
    } else {
      Object.assign(map2, entries);
    }
    return store(map2);
  }
  const map = initialState instanceof Map || Array.isArray(initialState) || isPrimitive(initialState) ? addElements(initialState) : isStore(initialState) ? initialState : store(initialState);
  const actions = {
    set: function(key, value) {
      map[key] = value;
    },
    setAll: function(entries) {
      this.reset();
      if (entries instanceof Map) {
        entries.forEach((value, key) => {
          map[key] = value;
        });
      } else if (Array.isArray(entries)) {
        for (let value of entries) {
          map[value[0]] = value[1];
        }
      } else if (isPrimitive(entries) == true) {
        return;
      } else {
        this.reset();
        Object.assign(map, entries);
      }
    },
    remove: (key) => delete map[key],
    reset: function() {
      Object.getOwnPropertyNames(map).forEach((prop) => delete map[prop]);
    },
    entries: () => Object.entries(map)
  };
  return [map, actions];
}
export {
  useMap
};
