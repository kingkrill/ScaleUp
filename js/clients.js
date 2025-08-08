const clientsTrack = document.querySelector('.clients-track');
const clients = document.querySelectorAll('.client-logo');

// Clone clients for infinite scroll
clients.forEach(client => {
    const clone = client.cloneNode(true);
    clientsTrack.appendChild(clone);
});

// Pause animation on hover
clientsTrack.addEventListener('mouseenter', () => {
    clientsTrack.style.animationPlayState = 'paused';
});

clientsTrack.addEventListener('mouseleave', () => {
    clientsTrack.style.animationPlayState = 'running';
});

// Check if clients are in viewport
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Start animation when clients section is in viewport
window.addEventListener('scroll', () => {
    if(isInViewport(clientsTrack)) {
        clientsTrack.style.animationPlayState = 'running';
    }
});