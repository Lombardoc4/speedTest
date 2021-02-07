const $iterationNum = document.getElementById('iterationNum');
const $codeBlocks = document.getElementsByClassName('codeblock');
const $allBlocks = document.getElementById('allBlocks');

const iterationOptions = [1, 10, 100, 1000, 100000, 1000000];

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

const reformatBlocks = () => {
    // $allBlocks.style.flexDirection = 'row';
    // $allBlocks.style.flexWrap = 'wrap';
    $allBlocks.style.maxWidth = '55em';

    // arrayEach(document.getElementsByClassName('aBlock'), (el) => {
    //     el.style.margin = '1em';
    //     el.style.flex = '1 1 auto';
    // });
};

// Set limit to maybe maybe 4 functions to compare or even 3
// Advanced: create once iterations are over 1000 can only use 3 functions
const createCodeBlock = () => {
    // id number below
    // $codeBlocks.length - 1
    if ($codeBlocks.length === 1)
        document.getElementById('header').style.flexDirection = 'row';

    if ($codeBlocks.length < 4) {
        // fire function to reformat if two
        if ($codeBlocks.length === 2)
            reformatBlocks();

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

        // if ($codeBlocks.length >= 2){
        //     aBlock.style.margin = '1em';
        //     aBlock.style.flex = '1 1 auto';
        // }


        $allBlocks.append(aBlock);
    }
    // else error: too many function too compute
};

document.getElementById('insertBlock').onclick = (e) => {
    e.preventDefault();
    createCodeBlock();
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

    // Create paragraph to show time
    const timing = document.createElement('b');

    timing.innerHTML = t1 - t0;
    const p = document.createElement('p');
    p.innerHTML = `Call to Code Block <b>${id}</b> took <b>${t1 - t0}</b> milliseconds.`;
    document.getElementById('timing').append(p);
};

// Set the power of submit
document.getElementById('runTest').onclick = (e) => {
    e.preventDefault();
    // Clear Timing
    const timing = document.getElementById('timing');
    while (timing.firstChild)
        timing.removeChild(timing.firstChild);

    // Create BARGraph
    // CreateBG();

    // runCodeTest on input function
    arrayEach($codeBlocks, (block, i) => (block.value ? runSpeedTest(block.value, i + 1) : false));
};

// Set the values for user iterations
const setIterationOptions = (iterationOption) => {
    // document.getElementById('iterationOptions')
    const newOption = document.createElement('span');
    if (document.getElementById('iterationOptions').childElementCount === 0)
        newOption.style.fontWeight = 'bold';

    newOption.onclick = function () {
        $iterationNum.innerHTML = iterationOption;
        // console.log("testing");
        // Do something with css
        arrayEach(document.querySelectorAll('#iterationOptions span'), (el) => { el.style.fontWeight = 'normal'; });
        this.style.fontWeight = 'bold';
    };
    newOption.innerHTML = iterationOption;

    document.getElementById('iterationOptions').append(newOption);
};

// initialize user options
arrayEach(iterationOptions, (option) => setIterationOptions(option));
