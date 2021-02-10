const $iterationNum = document.getElementById('iterationNum');
const $codeBlocks = document.getElementsByClassName('codeblock');
const $allBlocks = document.getElementById('allBlocks');

const iterationOptions = [1, 100000, 100000, 1000000, 10000000];

const arrayEach = (object, callback) => {
    let i = 0;
    const length = object ? object.length : 0;
    if (typeof length == 'number' && length > 0) {
        while (i < length) {
            callback(object[i], i, object);
            i += 1;
        }
        return true;
    }
};

// Set limit to maybe maybe 4 functions to compare or even 3
const createCodeBlock = () => {
    if ($codeBlocks.length === 1)
        document.getElementById('header').style.flexDirection = 'row';

    if ($codeBlocks.length < 4) {
        const blockId = $codeBlocks.length + 1;
        const blockLabel = document.createElement('label');
        blockLabel.setAttribute('for', `codeblock${blockId}`);
        blockLabel.innerHTML = `Insert Code Block ${blockId}:`;

        const blockTextarea = document.createElement('textarea');
        blockTextarea.id = `codeblock${blockId}`;
        blockTextarea.name = `codeblock${blockId}`;
        blockTextarea.classList.add('codeblock');

        const aBlock = document.createElement('div');
        aBlock.classList.add('aBlock');
        aBlock.append(blockLabel);
        aBlock.append(blockTextarea);

        $allBlocks.append(aBlock);
    }
};

document.getElementById('insertBlock').onclick = (e) => {
    e.preventDefault();
    createCodeBlock();
};

const colorArray = ['red', 'orange', 'green', 'teal'];
const timingArray = [];

const insertionAlgo = (arr) => {
    arrayEach(arr, (funcTime, i) => {
        // Insertion Sort
        const num = arr[i];
        let j;
        // console.log('num', num);

        for (j = i - 1; j >= 0 && arr[j] > num; j--)
            arr[j + 1] = arr[j];

        arr[j + 1] = num;
    });
};

const runSpeedTest = (testInput, id) => {
    // Defined before to prevent overhead
    const testFunction = new Function(testInput);
    let n = 0;
    const max = +$iterationNum.innerHTML;

    // Timing of function (while least overhead)
    const t0 = performance.now();
    while (n < max) {
        testFunction();
        n += 1;
    }
    const t1 = performance.now();
    const timing = t1 - t0;

    timingArray.push({ id, timing });
    console.log();

    const p = document.createElement('p');
    p.style.backgroundColor = colorArray[id - 1];
    p.innerHTML = `Code Block <b>${id}</b>: took <b>${timing}</b> milliseconds.`;
    document.getElementById('timing').append(p);
};

const compare = (a, b) => {
    if (a.timing < b.timing)
        return -1;

    if (a.timing > b.timing)
        return 1;

    return 0;
};

// Set the power of submit
document.getElementById('runTest').onclick = (e) => {
    e.preventDefault();
    // Clear Timing
    const timing = document.getElementById('timing');
    while (timing.firstChild)
        timing.removeChild(timing.firstChild);

    while (timingArray.length)
        timingArray.pop();

    // runCodeTest on input function
    arrayEach($codeBlocks, (block, i) => (block.value ? runSpeedTest(block.value, i + 1) : false));

    // insertionAlgo(timingArray);
    timingArray.sort(compare);
    console.log(timingArray);
};

// Set the values for user iterations
const setIterationOptions = (iterationOption) => {
    const newOption = document.createElement('span');
    if (document.getElementById('iterationOptions').childElementCount === 0)
        newOption.style.fontWeight = 'bold';

    newOption.onclick = function func() {
        $iterationNum.innerHTML = iterationOption;
        arrayEach(document.querySelectorAll('#iterationOptions span'), (el) => { el.style.fontWeight = 'normal'; });
        this.style.fontWeight = 'bold';
    };
    newOption.innerHTML = iterationOption;

    document.getElementById('iterationOptions').append(newOption);
};

// initialize user options
arrayEach(iterationOptions, (option) => setIterationOptions(option));
