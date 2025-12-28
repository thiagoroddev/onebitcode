console.log('Hello, world!');

setTimeout(() => {
    console.log('Hello, world!');
}, 1000);

let seconds = 0;
const interval = setInterval(() => {
    seconds ++;
    console.log('Hello!');
    if (seconds === 5) {
        clearInterval(interval);
    }
}, 1000);