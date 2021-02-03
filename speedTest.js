const $maxIterations = document.getElementById('maxIterations');
const $maxTime = document.getElementById('maxTime');

const iterationOptions = [1000, 100000, 1000000, 100000000];
const timeOptions = [1000, 10000, 30000];


document.getElementById('runTest').addEventListener('submit', (e) => { e.preventDefault(); });




const setTimeOptions = (timeOptions) => {
    let i = 0;
    while (i < timeOptions.length) {
        const newOption = document.createElement('option');
        newOption.setAttribute('value', timeOptions[i]);
        newOption.innerHTML = `${+timeOptions[i] / 1000} second/s`;

        $maxTime.append(newOption);
        i += 1;
    }
};

const setIterationOptions = (iterationOptions) => {
    let i = 0;
    while (i < iterationOptions.length) {
        const newOption = document.createElement('option');
        newOption.setAttribute('value', iterationOptions[i]);
        newOption.innerHTML = iterationOptions[i];

        $maxIterations.append(newOption);
        i += 1;
    }
};

const showOptions = (value) => {
    console.log(value);
    const limitRadios = document.getElementsByName('limitOptions');
    let j = 0;
    while (j < limitRadios.length) {
        if (limitRadios[i].id === value)
            limitRadioss[j].style.display = 'block';
        else
            limitRadioss[j].style.display = 'none';

        j += 1;
    }


};

setIterationOptions(iterationOptions);
setTimeOptions(timeOptions);

// Radio Inputs
const limitRadios = document.getElementsByName('limit');
let i = 0;
while (i < limitRadios.length) {
    limitRadios[i].addEventListener('change', function() {
        // limitRadios.
        // limitRadios.querySelector('[checked]');
        // console.log('this',this);
        if (this.hasAttribute('checked'))

            showOptions(this.value);
    });

    if (limitRadios[i].hasAttribute('checked')){
        // limitRadios[i].value
    }

    // const newOption = document.createElement('option');
    // newOption.setAttribute('value', iterationOptions[i]);
    // newOption.innerHTML = iterationOptions[i];

    // $maxIterations.append(newOption);
    i += 1;
}

// Limit Inputs
const limitOptions = document.getElementsByClassName('limitOptions');
let j = 0;
while (j < limitOptions.length) {
    // console.log(limitOptions[j]);
    limitOptions[j].style.display = 'none';
    j += 1;
}



// const runSpeedTest = (testFunc) => {
//     const t0 = performance.now();
//     for (let n = 0; n < $maxIterations.value; n++)
//         testFunc();
//     const t1 = performance.now();
//     console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
//     // console.time('My operation');
//     // console.timeEnd('My operation');
// };

// runSpeedTest(reduceArray);
