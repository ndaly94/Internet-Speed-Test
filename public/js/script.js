let startTime, endTime;
let imageSize = '';
let image = new Image();
let bitSpeed = document.getElementById('bits');
    kbSpeed = document.getElementById('kbs');
    mbSpeed = document.getElementById('mbs');
    info = document.getElementById('info');

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 5;
let testCompleted = 0;
let testButton = document.getElementById('run-test');

// Get random image from unsplash.com
let imageApi = 'https://source.unsplash.com/random?topic=nature';

// upon image load complete
image.onload = async function() {
    endTime = new Date().getTime();

    // Get image size
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get('content-length');
        calculateSpeed();
    })
}

// function to calculate speed
function calculateSpeed() {
    // Time taken in seconds
    let timeDuration = (endTime - startTime) / 1000;
    // Total BIts
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    // if all tests have been completed (we get 5 images then calculate the average speed)
    if(testCompleted == numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbs = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbs = (totalMbSpeed / numTests).toFixed(2);

        // Display the average speed
        bitSpeed.innerHTML = `${averageSpeedInBps}`;
        kbSpeed.innerHTML = `${averageSpeedInKbs}`;
        mbSpeed.innerHTML = `${averageSpeedInMbs}`;
        info.innerHtml = "Test Completed!";
    } else {
        // Run the next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// Initial function to start the test
const init = async () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// Run tests when window loads
window.onload = () =>{
    for(let i = 0; i < numTests; i++) {
        init()
    }
}

testButton.addEventListener('click', () => {
    for(let i = 0; i < numTests; i++) {
    init();
    }
});