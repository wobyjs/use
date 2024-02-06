import { CSSProperties, $, useMemo, ObservableReadonly } from 'woby'

interface ImageStyle {
    thumbnail: CSSProperties
    fullSize: CSSProperties
}

interface ImageOnLoadType {
    handleImageOnLoad: () => void
    css: ObservableReadonly<ImageStyle>
}

export function useImageOnLoad(): ImageOnLoadType {
    const isLoaded = $<boolean>(false)

    // Triggered when full image will be loaded.
    const handleImageOnLoad = () => {
        isLoaded(true)
    }

    const css = useMemo<ImageStyle>(() => ({
        // Thumbnail style.
        thumbnail: {
            visibility: isLoaded() ? 'hidden' : 'visible',
            filter: 'blur(8px)',
            transition: 'visibility 0ms ease-out 500ms',
        },
        // Full image style.
        fullSize: {
            opacity: isLoaded() ? 1 : 0,
            transition: 'opacity 500ms ease-in 0ms',
        },
    }))

    return { handleImageOnLoad, css }
}


