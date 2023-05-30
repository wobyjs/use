import { render } from "voby"

const test2 = document.createElement("div")
export function act<T extends (...args: any) => any>(fn: T){
    let fnReturn 
    const Test = ()=>{
        fnReturn = fn()
    }
    const dispose = render(Test,test2)
    return {
        result: { current: render(fn()) },
        rerender: function () {
             this.result.current = fnReturn
             },
        unmount: function () {
            if (typeof this.current === "function") {
                this.current()
            }
            else if (this.current instanceof HTMLElement){
                this.current.remove()
            }
            // dispose()
        }
    }
}


    export const renderHook = act

    export const test = it
    export const jest = { fn: jasmine.createSpy, resetAllMocks: () => { }, clearAllMocks: () => { } }
