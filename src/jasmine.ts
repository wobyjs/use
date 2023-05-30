import { render } from "voby"

const test2 = document.createElement("div")
export function renderHook<T extends (...args: any) => any>(fn: T) {
    let fnReturn 
    const Test = ()=>{
        fnReturn = fn()
    }
    let dispose = render(Test as any,test2)
    return {
        result: { get current(){return fnReturn} },
        rerender: function () {
             dispose = render(Test as any,test2)
             },
        unmount: function () {
            dispose()
        }
    }
}

export function act<T extends (...args: any) => any>(fn: T) {
    fn()
}

    export const test = it
    export const jest = { fn: jasmine.createSpy, resetAllMocks: () => { }, clearAllMocks: () => { } }
