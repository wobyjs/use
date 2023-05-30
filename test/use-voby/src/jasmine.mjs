import { r as render } from "../../woby/dist/render_to_string-ab3755f2.mjs";
const test2 = document.createElement("div");
function act(fn) {
  let fnReturn;
  const Test = () => {
    fnReturn = fn();
  };
  render(Test, test2);
  return {
    result: { current: render(fn()) },
    rerender: function() {
      this.result.current = fnReturn;
    },
    unmount: function() {
      if (typeof this.current === "function") {
        this.current();
      } else if (this.current instanceof HTMLElement) {
        this.current.remove();
      }
    }
  };
}
const renderHook = act;
const test = it;
const jest = { fn: jasmine.createSpy, resetAllMocks: () => {
}, clearAllMocks: () => {
} };
export {
  act,
  jest,
  renderHook,
  test
};
