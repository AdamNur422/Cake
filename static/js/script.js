let age = 0;

function placeCandle(event) {
    const OFFSET = 165; 
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

    newCandle.style.left = xPosition + 'px';
    newCandle.style.top = '-60px'; 
    cakeContainer.appendChild(newCandle);

    setTimeout(() => {
        newCandle.style.top = (yPosition - newCandle.offsetHeight + OFFSET) + 'px'; 
    }, 100);

    age++;
    document.getElementById('age-display').innerText = 'Age: ' + age;

    newCandle.addEventListener('click', function(e) {
        removeCandle(e, newCandle);
    });

    console.log('placeCandle called');
}

function removeCandle(event, candle) {
    event.stopPropagation(); 
    candle.remove(); 

    
    if (age > 0) {
        age--;
        document.getElementById('age-display').innerText = 'Age: ' + age;
    }

    console.log('removeCandle called');
}

document.getElementById('cake-container').addEventListener('click', placeCandle);
