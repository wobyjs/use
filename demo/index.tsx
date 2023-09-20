import { VobyInReact } from './VobyInReact'
import { ReactInVoby } from './ReactInVoby'
import { createRoot } from 'react-dom/client'
import { render } from 'voby'
import { ReactAutoCounter } from './ReactCounter'
import { VobyAutoCount } from './VobyCounter'

const rbm = createRoot(document.getElementById('ReactBenchmark'))
rbm.render(<ReactAutoCounter />)

render(VobyAutoCount as any, document.getElementById("VobyBenchmark"))


const root = createRoot(document.getElementById('VobyInReact'))
root.render(<table style={{ border: "1px solid black" }}>
    <tbody>
        <tr>
            <td style={{ border: "1px solid black" }}><VobyInReact /></td>
            <td style={{ border: "1px solid black" }}><VobyInReact /></td>
        </tr>
    </tbody></table>)

render(ReactInVoby as any, document.getElementById("ReactInVoby"))

