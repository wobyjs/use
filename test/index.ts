import { render } from 'woby'
import { Verifies } from 'verifies'
import 'verifies/index.css'

// Import all test files to register them
import '../src/use.test'
import '../src/useCounter/useCounter.test'
import '../src/useBoolean/useBoolean.spec'
import '../src/useStep/useStep.test'
import '../src/useCountdown/useCountdown.test'

// Initialize the global verifies instance if it's not already
if (!window.verifies) {
    window.verifies = new Verifies()
}

// Run the tests after a small delay to allow components to render and register
setTimeout(() => {
    console.log("Running @woby/use tests...")
    window.verifies.run()
}, 500)