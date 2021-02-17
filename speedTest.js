const $iterationNum = document.getElementById('iterationNum');
const $codeBlocks = document.getElementsByClassName('codeblock');
const $allBlocks = document.getElementById('allBlocks');

const iterationOptions = [0, 3, 6, 7, 8, 9];
const timingArray = [];

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

const createCodeBlock = () => {
    if ($codeBlocks.length < 4) {
        const blockId = $codeBlocks.length + 1;
        // Block label
        const blockLabel = document.createElement('label');
        blockLabel.setAttribute('for', `codeblock${blockId}`);
        blockLabel.innerHTML = `Block ${blockId}: `;

        // Block remove
        const blockTextRemove = document.createElement('p');
        blockTextRemove.dataset.blockTarget = blockId;
        blockTextRemove.innerHTML = 'Remove &#10006;';
        blockTextRemove.onclick = function () {
            document.querySelector(`[data-block="${this.dataset.blockTarget}"`).remove()
        };

        const blockHeader = document.createElement('header');
        blockHeader.append(blockLabel);
        blockHeader.append(blockTextRemove);

        // Block input
        const blockTextarea = document.createElement('textarea');
        blockTextarea.id = `codeblock${blockId}`;
        blockTextarea.name = `codeblock${blockId}`;
        blockTextarea.classList.add('codeblock');


        const aBlock = document.createElement('div');
        aBlock.dataset.block = blockId;
        aBlock.classList.add('aBlock');
        aBlock.append(blockHeader);
        aBlock.append(blockTextarea);

        $allBlocks.insertBefore(aBlock, document.getElementById('insertBlock1'));
    }
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

    // Create Results
    const container = document.createElement('div');
    container.style.display = 'flex';

    // Block ID
    const p1 = document.createElement('p');
    p1.innerHTML = `Block ${id}: `;
    p1.style.flex = '1 0 70px';

    // 'Bar Graph'
    const p2 = document.createElement('p');
    p2.id = `block-${id}`;
    p2.innerHTML = `<b>${Number(timing).toFixed(4)}</b>ms.`;
    p2.style.color = '#272E2E';
    p2.style.backgroundColor = '#f7e222';
    p2.style.padding = '0 0 0 0.5em';
    p2.style.borderRadius = '5px';

    container.append(p1);
    container.append(p2);
    document.getElementById('timing').append(container);
};

const compare = (a, b) => {
    if (a.timing < b.timing)
        return -1;

    if (a.timing > b.timing)
        return 1;

    return 0;
};

const runTest = () => {
    // Clear previous timing
    const timing = document.getElementById('timing');
    while (timing.firstChild)
        timing.removeChild(timing.firstChild);
    while (timingArray.length)
        timingArray.pop();

    // runTest for each coding block
    arrayEach($codeBlocks, (block, i) => (block.value ? runSpeedTest(block.value, i + 1) : false));

    // Sort the timing
    timingArray.sort(compare);

    // Set the width of the Time Blocks
    arrayEach(timingArray, (codeBlock) => {
        document.getElementById(`block-${codeBlock.id}`).style.width = `${(codeBlock.timing / timingArray[timingArray.length - 1].timing) * 100}%`;
    });
};

// Set the values for user iterations
const setIterationOptions = (iterationOption) => {
    const newOption = document.createElement('span');
    if (document.getElementById('iterationOptions').childElementCount === 0)
        newOption.style.fontWeight = 'bold';

    newOption.onclick = function func() {
        $iterationNum.innerHTML = Math.pow(10, iterationOption);
        // Show selected / Can shift to on class
        arrayEach(document.querySelectorAll('#iterationOptions span'), (el) => { el.style.fontWeight = 'normal'; });
        this.style.fontWeight = 'bold';
    };
    newOption.innerHTML = `10<sup style="font-size: 12px">${iterationOption}</sup>`;

    document.getElementById('iterationOptions').append(newOption);
};

// initialize user options
arrayEach(iterationOptions, (option) => setIterationOptions(option));

// Set the power of submit
arrayEach(document.getElementsByClassName('run-test'), (el) => {
    el.onclick = (e) => {
        e.preventDefault();
        runTest();
    };
});

// Insert Block
arrayEach(document.getElementsByClassName('insert-block'), (el) => {
    el.onclick = (e) => {
        e.preventDefault();
        createCodeBlock();
    };
});
