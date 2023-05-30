import { r as render } from "../../woby/dist/render_to_string-ab3755f2.mjs";
const test2 = document.createElement("div");
function act(fn) {
  let fnReturn;
  const Test = () => {
    fnReturn = fn();
  };
  let dispose = render(Test, test2);
  return {
    result: { get current() {
      return fnReturn;
    } },
    rerender: function() {
      dispose = render(Test, test2);
    },
    unmount: function() {
      dispose();
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
