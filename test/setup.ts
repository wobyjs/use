// Test setup file
import { Verifies } from 'verifies'

// Initialize verifies if not already done
declare global {
    interface Window {
        verifies: Verifies
    }
}

if (!window.verifies) {
    window.verifies = new Verifies()
}

export { }