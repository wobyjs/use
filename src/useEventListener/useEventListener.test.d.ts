declare global {
    interface WindowEventMap {
        'test-event': CustomEvent;
    }
    interface HTMLElementEventMap {
        'test-event': CustomEvent;
    }
    interface DocumentEventMap {
        'test-event': CustomEvent;
    }
}
export {};
//# sourceMappingURL=useEventListener.test.d.ts.map