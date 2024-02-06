import { $ } from 'woby'

import { useElementSize } from './useElementSize'

export default function Component() {
    const isVisible = $(true)
    const [squareRef, size] = useElementSize()
    const { width, height } = size()
    const toggleVisibility = () => isVisible(x => !x)

    return (
        <>
            <p>{`The square width is ${width}px and height ${height}px`}</p>
            <p>Try, resize your window and-or click on the button.</p>

            <button onClick={toggleVisibility}>
                {isVisible ? 'Hide' : 'Show'} square
            </button>

            {isVisible && (
                <div
                    ref={squareRef}
                    style={{
                        width: '50%',
                        paddingTop: '50%',
                        backgroundColor: 'aquamarine',
                        margin: 'auto',
                    }}
                />
            )}
        </>
    )
}
