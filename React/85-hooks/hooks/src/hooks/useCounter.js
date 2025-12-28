import { useState } from 'react';

function getInitialCount() {
    console.log('Initializing count');
    return 1 + 1;
}

export default function useCounter() {
    const [count, setCount] = useState(() => getInitialCount());

    const increment = () => {
        setCount((prevCount) => prevCount + 1)
        setCount((prevCount) => prevCount + 1)
    }

    return {
        count,
        increment,
    };
}


