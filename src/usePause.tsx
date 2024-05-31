export const usePause = (delay: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), delay))
