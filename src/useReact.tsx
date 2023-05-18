/// <reference types="voby" />

/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from "voby"
import { jsx as rsx } from 'react/jsx-runtime'
import { createRoot } from 'react-dom/client'
import * as React from 'react'
import { $, useEffect } from 'voby'
import { nanoid } from 'nanoid'

export const useReact = <P,>(children: React.ReactNode | React.FunctionComponent | React.ClassicComponent, props?: P, container: string = 'div') => {
    const ref = $<HTMLDivElement>()

    useEffect(() => {
        if (ref()) {
            const root = createRoot(ref())
            root.render(rsx(children, Object.assign(props ?? {}, { key: nanoid() }))) //createPortal not working
        }
    })

    return jsx(container as any, { ref: ref }) // <div ref={ref}></div>
}
