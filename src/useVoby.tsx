//add types to other folders
//pnpm add -D types_react@npm:@types/react 

///// <reference types="types_react" />
import { useRef, useState, useEffect } from 'react'
import { jsx } from "react/jsx-runtime"
// import {  jsx } from 'react/jsx-runtime'
import { render, jsx as vsx } from 'voby'
// import { jsx as vsx } from 'voby/jsx-runtime'

/** Use in React */
export const useVoby = <P,>(child: Child | Component<P>  /** |((props?: P) => Element)voby */ | ((props?: P) => JSX.Element)/** react */, props?: P) => {
    const app = useRef<HTMLDivElement>()
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        if (!app.current || current === app.current) return
        render(vsx(child as any, props), app.current)
        setCurrent(app.current)
    }, [app.current])

    return jsx('div', { ref: (e) => app.current = e, children: 'Loading' })
    // return <div ref={(e) => app.current = e}>Loading</div>
}
