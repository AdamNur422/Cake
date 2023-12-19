let age = 0;
let candlePositions = [];
const OFFSET = 165;
const OVERLAP_THRESHOLD = 1;

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

function isOverlapping(position) {
    return candlePositions.some(existingPosition => {
        const dx = existingPosition.x - position.x;
        const dy = existingPosition.y - position.y;
        return Math.hypot(dx, dy) < OVERLAP_THRESHOLD;
    });
}

function removeCandle(event, candle) {
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



document.getElementById('cake-container').addEventListener('click', placeCandle);
