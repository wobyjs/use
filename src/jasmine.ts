import { render } from "voby"

const test2 = document.createElement("div")
export function act<T extends (...args: any) => any>(fn: T) {
    let fnReturn 
    const Test = ()=>{
        fnReturn = fn()
        // return(
        //   <></>
        // )
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

    export const renderHook = act

    export const test = it
    export const jest = { fn: jasmine.createSpy, resetAllMocks: () => { }, clearAllMocks: () => { } }
