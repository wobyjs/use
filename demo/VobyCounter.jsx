/// <reference types="voby" />
import { $ } from 'voby';
const Counter = ({ increment, decrement, value }) => {
    return (<>
            <p>{value}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>);
};
export const VobyCounter = ({ initValue, ...props } = {}) => {
    const value = $(initValue ?? 0);
    const increment = $(() => value(prev => prev + 1));
    const decrement = $(() => value(prev => prev - 1));
    return <>
        <h3>Voby Counter at {initValue}</h3>
        <Counter {...{ value, increment, decrement }}/>
    </>;
};
const shared = $(0);
export const VobySharedCounter = ({ initValue, ...props } = {}) => {
    const increment = $(() => shared(prev => prev + 1));
    const decrement = $(() => shared(prev => prev - 1));
    return <>
        <h3>Voby Shared Counter</h3>
        <Counter {...{ value: shared, increment, decrement }}/>
    </>;
};
export const VobySharedCounter2 = ({ initValue, ...props } = {}) => {
    const increment = $(() => shared(prev => prev + 1));
    const decrement = $(() => shared(prev => prev - 1));
    return <>
        <h3>Voby Shared Counter 2</h3>
        <Counter {...{ value: shared, increment, decrement }}/>
    </>;
};
export const VobyAutoCount = ({ initValue, ...props } = {}) => {
    const value = $(initValue ?? 0);
    const dif = $(0);
    (async () => {
        const start = Date.now();
        for (let i = 0; i < 1000000; i++)
            value(i);
        const end = Date.now();
        dif(end - start);
    })();
    return <div>
        <h3>Voby Auto Counter</h3>
        <p>{value}</p>
        <p>Time Difference: {dif}</p>
    </div>;
};
