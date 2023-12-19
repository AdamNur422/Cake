let age = 0;
let candlePositions = [];
const OFFSET = 165;
const OVERLAP_THRESHOLD = 1;
const placeCandleSound = new Audio('/static/sounds/place_candle.mp3');
const removeCandleSound = new Audio('/static/sounds/remove_candle.mp3');
const volumeControl = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');

// Adding Candles
function placeCandle(event) {
    const candleOffset = 10; 
    const cakeContainer = document.getElementById('cake-container');
    const newCandle = document.createElement('img');
    const candles = ['candle1.png', 'candle2.png'];
    const randomCandle = candles[Math.floor(Math.random() * candles.length)];
    
    newCandle.src = `/static/images/${randomCandle}`;
    newCandle.classList.add('candle');
    
    const candleWidth = 60;
    const xPosition = event.clientX - cakeContainer.getBoundingClientRect().left - (candleWidth / 2) + candleOffset;
    const yPosition = event.clientY - cakeContainer.getBoundingClientRect().top;
    const newCandlePosition = { x: xPosition, y: yPosition };

    if (isOverlapping(newCandlePosition)) {
        console.log('Candle overlap detected.');
        return;
    }

    newCandle.style.left = xPosition + 'px';
    newCandle.style.top = '-60px';
    cakeContainer.appendChild(newCandle);

    placeCandleSound.playbackRate = 1.5;
    placeCandleSound.play();


    setTimeout(() => {
        newCandle.style.top = (yPosition - newCandle.offsetHeight + OFFSET) + 'px';
    }, 100);

    candlePositions.push(newCandlePosition);

    age++;
    document.getElementById('age-display').innerText = 'Age: ' + age;

    newCandle.addEventListener('click', function(e) {
        removeCandle(e, newCandle);
    });

    console.log('placeCandle called');
}

// Checking Overlapping 
function isOverlapping(position) {
    return candlePositions.some(existingPosition => {
        const dx = existingPosition.x - position.x;
        const dy = existingPosition.y - position.y;
        return Math.hypot(dx, dy) < OVERLAP_THRESHOLD;
    });
}

// Remove Candle
function removeCandle(event, candle) {
    removeCandleSound.playbackRate = 2.5; 
    removeCandleSound.play();

    event.stopPropagation(); 
    candle.remove(); 

    if (age > 0) {
        age--;
        document.getElementById('age-display').innerText = 'Age: ' + age;
    }

    const candleLeft = parseInt(candle.style.left, 10);
    const candleTop = parseInt(candle.style.top, 10) - OFFSET;
    const index = candlePositions.findIndex(p => Math.hypot(p.x - candleLeft, p.y - candleTop) < OVERLAP_THRESHOLD);

    if (index > -1) {
        candlePositions.splice(index, 1);
    }

    console.log('removeCandle called');
}

// Open and close the settings panel
document.getElementById('settings-button').addEventListener('click', function() {
    document.getElementById('settings-panel').style.display = 'block';
    document.body.classList.add('modal-open'); 
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('settings-panel').style.display = 'none';
    document.body.classList.remove('modal-open'); 
});

// Volume control
volumeControl.addEventListener('input', function(e) {
    const volume = e.target.value;

    const maxVolume = volumeControl.max || 1; 
    const filledPercentage = (volume / maxVolume) * 100;
    volumeControl.style.setProperty('--filled', filledPercentage + '%');

    placeCandleSound.volume = volume;
    removeCandleSound.volume = volume;
    updateVolumeIcon(volume);
});

volumeIcon.addEventListener('click', function() {
    if (volumeControl.value !== "0") {
        volumeControl.value = 0;
        volumeControl.style.setProperty('--filled', '0%'); 
        updateVolumeIcon(0);
    } else {
        volumeControl.value = 1;
        volumeControl.style.setProperty('--filled', '100%'); 
        updateVolumeIcon(1);
    }
});

function updateVolumeIcon(volume) {
    if (volume == 0) {
        volumeIcon.className = 'fas fa-volume-mute'; 
    } else if (volume <= 0.5) {
        volumeIcon.className = 'fas fa-volume-down'; 
    } else {
        volumeIcon.className = 'fas fa-volume-up'; 
    }
}


document.getElementById('cake-container').addEventListener('click', placeCandle);
