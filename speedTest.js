
const $maxCountInput = document.getElementById('maxCount');
const iterationOptions = [1000, 100000, 1000000, 100000000];

const exArray = [10, 100, 1000, 1000, 1000];

// Function 1
const reduceArray = () => exArray.reduce((x) => x + 1);

// Function 2


const setIterationOptions = (iterationOptions) => {
    let i = 0;
    while (i < iterationOptions.length) {
        const newOption = document.createElement('option');
        newOption.setAttribute('value', iterationOptions[i]);
        newOption.innerHTML = iterationOptions[i];

        $maxCountInput.append(newOption);
        i += 1;
    }
};

setIterationOptions(iterationOptions);

const runSpeedTest = (testFunc) => {
    const t0 = performance.now();
    for (let n = 0; n < $maxCountInput.value; n++)
        testFunc();
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    // console.time('My operation');
    // console.timeEnd('My operation');
};

runSpeedTest(reduceArray);
