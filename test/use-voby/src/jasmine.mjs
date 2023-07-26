import "../../woby/dist/index.es.mjs";
import { r as render$1 } from "../../woby/dist/render_to_string-0e4682a5.mjs";
const test2 = document.createElement("div");
function renderHook(fn) {
  let fnReturn;
  const Test = () => {
    fnReturn = fn();
  };
  let dispose = render$1(Test, test2);
  return {
    result: { get current() {
      return fnReturn;
    } },
    rerender: function() {
      dispose = render$1(Test, test2);
    },
    unmount: function() {
      dispose();
    }
  };
}
function act(fn) {
  fn();
}
const test = it;
const jest = {
  fn: jasmine.createSpy,
  resetAllMocks: () => {
  },
  clearAllMocks: () => {
  }
};
function mockSetInterval() {
  spyOn(globalThis, "setInterval");
}
function mockClearInterval() {
  spyOn(globalThis, "clearInterval");
}
function installClock() {
  const clearInterval = spyOn(globalThis, "clearInterval");
  const fn = spyOn(globalThis, "setInterval").and.returnValues(Math.floor(Math.random() * 1e3), Math.floor(Math.random() * 1e3));
  const tick = (ms) => {
    if (!fn.calls.any()) {
      return;
    }
    const callback = fn.calls.mostRecent().args[0];
    const milli = fn.calls.mostRecent().args[1];
    for (let ids of clearInterval.calls.all()) {
      if (fn.calls.mostRecent().returnValue !== ids.args[0]) {
        break;
      } else {
        return;
      }
    }
    if (ms >= milli) {
      for (let i = 0; i < ms / milli; i++) {
        callback();
      }
    }
  };
  return { tick };
}
const fireEvent = {
  click: (e) => {
    e.dispatchEvent(new MouseEvent("click"));
  },
  keyDown: (e) => {
    e.dispatchEvent(new KeyboardEvent("keydown", { "key": "a" }));
  },
  mouseEnter: (e) => {
    e.dispatchEvent(new MouseEvent("mouseenter"));
  },
  mouseLeave: (e) => {
    e.dispatchEvent(new MouseEvent("mouseleave"));
  }
};
export {
  act,
  fireEvent,
  installClock,
  jest,
  mockClearInterval,
  mockSetInterval,
  renderHook,
  test
};
