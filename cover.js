// cover.js
// Animation for the energy sphere
const energySphere = document.querySelector('.energy-sphere');

function animateSphere() {
    let scale = 1;
    setInterval(() => {
        scale = scale === 1 ? 1.1 : 1;
        energySphere.style.transform = `scale(${scale})`;
    }, 2000);
}

animateSphere();