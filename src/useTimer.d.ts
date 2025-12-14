type TimerMessage = {
    message: string;
    ms: number;
};
export declare const useTimer: (startImmediately?: boolean) => {
    start: () => number | null;
    pause: () => void;
    split: (message?: string) => void;
    stop: (message?: string) => void;
    total: import("woby").Observable<number>;
    reset: () => void;
    laps: import("woby").Observable<TimerMessage[]>;
};
export {};
//# sourceMappingURL=useTimer.d.ts.map