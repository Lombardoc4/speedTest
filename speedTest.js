const $maxIterations = document.getElementById('maxIterations');

const iterationOptions = [10, 100, 1000, 100000, 1000000];

const arrayEach = (object, callback) => {
    let i = 0;
    const length = object ? object.length : 0;
    if (typeof length == 'number' && length > -1) {
        while (i < length) {
            callback(object[i], i, object);
            i += 1;
        }
    }
};

const runSpeedTest = (testInput, id) => {
    // const testFunction = new Function(`return () => {${testInput}}`);
    const testFunction = new Function(testInput);
    const t0 = performance.now();
    let n = 0;
    while (n < $maxIterations.value) {
        testFunction();
        n += 1;
    }
    const t1 = performance.now();
    const p = document.createElement('p');
    p.innerHTML = `Call to Code Block ${id} took ${t1 - t0} milliseconds.`;
    document.getElementById('timing').append(p);
    // .innerHTML += `Call to Code Block ${id} took ${t1 - t0} milliseconds.`
    // console.log();
};

const setIterationOptions = (iterationOption) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', iterationOption);
    newOption.innerHTML = iterationOption;

    $maxIterations.append(newOption);
};

document.getElementById('runTest').onclick = (e) => {
    e.preventDefault();
    console.log(document.getElementById('timing').children);
    // Clear Timing
    const timing = document.getElementById('timing');
    while (timing.firstChild)
        timing.removeChild(timing.firstChild);

    arrayEach(document.getElementsByClassName('codeblock'), (block, i) => (block.value ? runSpeedTest(block.value, i + 1) : false))
};

arrayEach(iterationOptions, (option) => setIterationOptions(option));

// runSpeedTest(reduceArray);
