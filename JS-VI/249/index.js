
function step02 () {
    console.log('f-02')
}


console.log('01');
step02();
console.log('03');
setTimeout(() => {
    console.log('04');
}, 1000);
console.log('05');