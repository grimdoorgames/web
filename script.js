// Efecto de carga
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});

// Scroll Reveal suave
window.addEventListener('scroll', () => {
    let reveals = document.querySelectorAll('.project-showcase, .philo-card, .timeline-item');
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
});

// Validación simple de formulario
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Señal enviada a Grimdoor Studios. Espera nuestra respuesta.');
});