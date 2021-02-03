const $maxIterations = document.getElementById('maxIterations');
const $maxTime = document.getElementById('maxTime');

const iterationOptions = [1000, 100000, 1000000, 100000000];
const timeOptions = [1000, 10000, 30000];

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

const runSpeedTest = (testFunc, id = 'function') => {
    const testFunction = new Function(testFunc);
    const t0 = performance.now();
    for (let n = 0; n < $maxIterations.value; n++)
        testFunction();
    const t1 = performance.now();
    console.log(`Call to ${id} took ${t1 - t0} milliseconds.`);
};

const setTimeOptions = (timeOption) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', timeOption);
    newOption.innerHTML = `${+timeOption / 1000} second/s`;

    $maxTime.append(newOption);
};

const setIterationOptions = (iterationOption) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', iterationOption);
    newOption.innerHTML = iterationOption;

    $maxIterations.append(newOption);
};

const getInitVars = () => {
    const variables = [];
    let fullInput = document.getElementById('initialize').value;
    while (fullInput.length > 0) {
        variables.push(fullInput.slice(0, fullInput.indexOf(';')));
        fullInput = fullInput.slice(fullInput.indexOf(';'));
    }
    console.log(variables);
};

document.getElementById('runTest').onclick = (e) => {
    e.preventDefault();

    // Set up test get functions
    getInitVars();
    const codeBlock1 = document.getElementById('codeblock1').value;
    runSpeedTest(codeBlock1);
    // console.log('testttting');
    // console.log();
};

arrayEach(document.getElementsByName('limit'), (el) => {
    // console.log(el.checked)
    el.onchange = () => {
        arrayEach(document.getElementsByClassName('limitOptions'), (el) => el.classList.add('off'));

        const userOptions = document.getElementById(el.value);
        userOptions.previousElementSibling.classList.remove('off');
        userOptions.classList.remove('o');

        // console.log(.style.display = 'block');
        // console.log(el.checked);
    };
});

arrayEach(iterationOptions, (option) => setIterationOptions(option));
arrayEach(timeOptions, (option) => setTimeOptions(option));

// runSpeedTest(reduceArray);
