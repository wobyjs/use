import { x as store, w as isStore, q as batch } from "../../../woby/dist/setters-0ed3c7f1.mjs";
function isPrimitive(test) {
  return test !== Object(test);
}
function useMap(initialState) {
  const map = initialState instanceof Map || Array.isArray(initialState) || isPrimitive(initialState) ? store({}) : isStore(initialState) ? initialState : store(initialState);
  const actions = {
    set: function(key, value) {
      map[key] = value;
    },
    setAll: function(entries) {
      if (entries instanceof Map) {
        this.reset();
        entries.forEach((value, key) => {
          map[key] = value;
        });
      } else if (Array.isArray(entries)) {
        this.reset();
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
    reset: () => batch(() => Object.getOwnPropertyNames(map).forEach((prop) => delete map[prop])),
    entries: () => Object.entries(map)
  };
  if (initialState instanceof Map || Array.isArray(initialState) || isPrimitive(initialState)) {
    actions.setAll(initialState);
  }
  return [map, actions];
}
export {
  useMap
};
