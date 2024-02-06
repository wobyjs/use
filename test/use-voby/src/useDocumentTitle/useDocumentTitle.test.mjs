import { test, renderHook } from "../../../woby-jasmine/dist/jasmine.es.mjs";
import { useDocumentTitle } from "./useDocumentTitle.mjs";
describe("useDocumentTitle()", () => {
    test("title should be in the document", () => {
        renderHook(() => useDocumentTitle("foo"));
        expect(window.document.title).toEqual("foo");
    });
});
