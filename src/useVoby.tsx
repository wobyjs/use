//add types to other folders
//pnpm add -D types_react@npm:@types/react 

/// <reference types="types_react" />
import { useRef, useState, useEffect } from 'react'
import { render } from 'voby'
import { jsx as vsx } from 'voby/jsx-runtime'

export const useVoby = <P,>(child: Child | Component<P>  /** |((props?: P) => Element)voby */ | ((props?: P) => JSX.Element)/** react */, props?: P) => {
    const app = useRef<HTMLDivElement>()
    const [current, setCurrent] = useState(null)

    useEffect(() => {
        if (!app.current || current === app.current) return
        render(vsx(child as any, props), app.current)
        setCurrent(app.current)
    }, [app.current])

    return <div ref={(e) => app.current = e}>Loading</div>
}
