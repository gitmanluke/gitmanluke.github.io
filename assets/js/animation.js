const gradients = [
    {
        // Blue to Pink
        start: { r: 65, g: 105, b: 225 },
        end: { r: 255, g: 20, b: 147 }
    },
    {
        // Purple to Orange
        start: { r: 147, g: 51, b: 234 },
        end: { r: 255, g: 140, b: 0 }
    },
    {
        // Deep Purple to Turquoise
        start: { r: 111, g: 51, b: 232 },
        end: { r: 64, g: 224, b: 208 }
    }
];

function generateGradientColor(index, total) {
    if (index === 0) {
        window.currentGradient = gradients[Math.floor(Math.random() * gradients.length)];
    }
    
    const startColor = window.currentGradient.start;
    const endColor = window.currentGradient.end;
    
    const progress = index / total;
    const r = Math.floor(startColor.r + (endColor.r - startColor.r) * progress);
    const g = Math.floor(startColor.g + (endColor.g - startColor.g) * progress);
    const b = Math.floor(startColor.b + (endColor.b - startColor.b) * progress);
    
    return `rgb(${r}, ${g}, ${b})`;
}

function createProfileImageAndGifs() {
    const container = document.getElementById('textContainer');
    
    // Create left GIF
    const leftGif = document.createElement('img');
    leftGif.src = 'LPgif.gif';
    leftGif.className = 'side-gif left';
    leftGif.alt = 'Decorative animation left';
    container.appendChild(leftGif);
    
    // Create profile image
    const image = document.createElement('img');
    image.src = 'LukeParisPhotoStraight.jpg';
    image.className = 'profile-image';
    image.alt = 'Profile photo';
    container.appendChild(image);
    
    // Create right GIF
    const rightGif = document.createElement('img');
    rightGif.src = 'LPgif.gif';
    rightGif.className = 'side-gif right';
    rightGif.alt = 'Decorative animation right';
    container.appendChild(rightGif);
    
    // Force browser to reflow before adding visible classes
    [leftGif, image, rightGif].forEach(el => {
        el.offsetHeight;
        el.classList.add('visible');
    });
}

function createTextInstances(count) {
    const container = document.getElementById('textContainer');
    const baseSize = 3;
    const sizeIncrement = 0.3;
    
    // Create all instances first
    for (let i = 0; i < count; i++) {
        const instance = document.createElement('div');
        instance.className = 'text-instance';
        if (i === count - 1) {
            instance.classList.add('final');
        }
        instance.style.fontSize = `${baseSize + (i * sizeIncrement)}rem`;
        instance.style.color = generateGradientColor(i, count);
        
        const text = document.createElement('span');
        text.textContent = 'LUKE';
        instance.appendChild(text);
        container.appendChild(instance);
        
        // Show each instance
        setTimeout(() => {
            instance.classList.add('visible');
        }, i * 250);
    }

    // Calculate timings
    const appearancesDuration = count * 250;
    const bufferDelay = 500;
    const moveToHeaderDelay = 1000;
    const imageDelay = 1000;

    // After animation completes, hide all except final instance
    setTimeout(() => {
        const instances = document.querySelectorAll('.text-instance:not(.final)');
        instances.forEach(instance => {
            instance.style.opacity = '0';
        });
        
        // Move final instance to header position
        setTimeout(() => {
            const finalInstance = document.querySelector('.text-instance.final');
            finalInstance.classList.add('move-to-header');

            // Add profile image and GIFs
            setTimeout(() => {
                createProfileImageAndGifs();
            }, imageDelay);

        }, moveToHeaderDelay);
    }, appearancesDuration + bufferDelay);
}

document.addEventListener('DOMContentLoaded', function() {
    createTextInstances(25);
});
