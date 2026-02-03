/**
 * ==========================================================================
 * GRIMDOOR GAMES - CORE ENGINE SCRIPT v1.0
 * System: "THE ABIGAIL PROTOCOL"
 * Focus: DOM Manipulation, Intersection Observers, Atmospheric UI
 * ==========================================================================
 */

const GrimdoorEngine = {
    config: {
        loaderDelay: 2500, // Tiempo artificial de carga para atmósfera
        scrollThreshold: 20, // Píxeles para activar navbar
        scrambleSpeed: 60, // Velocidad del efecto de texto
    },

    dom: {
        body: document.body,
        loader: document.getElementById('loader'),
        navbar: document.querySelector('.navbar'),
        menuToggle: document.querySelector('.menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        links: document.querySelectorAll('a[href^="#"]'),
        timelineItems: document.querySelectorAll('.timeline-item'),
        glitchTitles: document.querySelectorAll('.title-main, h3'),
        contactForm: document.getElementById('contact-form')
    },

    /**
     * SYSTEM BOOT SEQUENCE
     */
    init: function() {
        console.log("%c GRIMDOOR GAMES // SYSTEM_READY ", "background: #000; color: #00f2ff; font-weight: bold; padding: 10px; border: 1px solid #00f2ff;");
        
        this.handleLoader();
        this.initNavigation();
        this.initScrollEffects();
        this.initObservers();
        this.initTextScramble();
        this.initContactTerminal();
        this.initTabTitleTrick();
    },

    /**
     * 1. LOADER DESTRUCTION
     * Elimina la pantalla de carga y libera el scroll
     */
    handleLoader: function() {
        // Bloquear scroll al inicio
        this.dom.body.style.overflow = 'hidden';

        window.addEventListener('load', () => {
            setTimeout(() => {
                // El CSS maneja la animación de fade-out, aquí limpiamos el DOM
                this.dom.body.style.overflow = 'visible';
                
                // Disparar efecto de texto en el Hero una vez cargado
                const heroTitle = document.querySelector('.glitch');
                if(heroTitle) this.scrambleText(heroTitle);

            }, this.config.loaderDelay);
        });
    },

    /**
     * 2. NAVIGATION SYSTEM
     * Maneja el menú móvil y el efecto de scroll en navbar
     */
    initNavigation: function() {
        // Mobile Toggle
        if (this.dom.menuToggle) {
            this.dom.menuToggle.addEventListener('click', () => {
                this.dom.navLinks.classList.toggle('active');
                this.dom.menuToggle.classList.toggle('active');
            });
        }

        // Cerrar menú al hacer clic en un link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.dom.navLinks.classList.remove('active');
                this.dom.menuToggle.classList.remove('active');
            });
        });

        // Scroll Class Toggle
        window.addEventListener('scroll', () => {
            if (window.scrollY > this.config.scrollThreshold) {
                this.dom.navbar.classList.add('scrolled');
            } else {
                this.dom.navbar.classList.remove('scrolled');
            }
        });

        // Smooth Scroll con compensación
        this.dom.links.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    },

    /**
     * 3. INTERSECTION OBSERVERS
     * Detecta cuando elementos entran en pantalla para animarlos
     */
    initObservers: function() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                // Animación para Timeline
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('active');
                }

                // Animación para Glitch Titles (Scramble effect)
                if (entry.target.classList.contains('title-main') || entry.target.tagName === 'H3') {
                    this.scrambleText(entry.target);
                    entry.target.style.opacity = 1;
                }

                observer.unobserve(entry.target);
            });
        }, observerOptions);

        // Observar items del roadmap
        this.dom.timelineItems.forEach(item => observer.observe(item));
        
        // Observar títulos
        this.dom.glitchTitles.forEach(title => observer.observe(title));
    },

    /**
     * 4. TEXT SCRAMBLE EFFECT ("DECRYPTION")
     * Efecto visual de hackeo/desencriptación de texto
     */
    scrambleText: function(element) {
        const originalText = element.innerText;
        const chars = '!<>-_\\/[]{}—=+*^?#________'; // Caracteres "basura"
        let iteration = 0;
        
        clearInterval(element.interval);

        element.interval = setInterval(() => {
            element.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(element.interval);
            }

            iteration += 1 / 3; // Velocidad de resolución
        }, 30);
    },

    initTextScramble: function() {
        // Inicializar listeners si se desea en hover (opcional)
        // Por defecto lo usamos en el Observer
    },

    /**
     * 5. CONTACT TERMINAL LOGIC
     * Simula envío de datos a un servidor
     */
    initContactTerminal: function() {
        if (!this.dom.contactForm) return;

        this.dom.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = this.dom.contactForm.querySelector('button');
            const originalText = btn.innerText;
            const inputs = this.dom.contactForm.querySelectorAll('input, textarea');

            // Estado 1: Encriptando
            btn.style.width = '100%';
            btn.innerText = "ENCRYPTING DATA...";
            btn.style.backgroundColor = "var(--color-bg-deep)";
            btn.style.color = "var(--color-cyan-primary)";
            btn.style.borderColor = "var(--color-cyan-primary)";

            // Simular proceso
            setTimeout(() => {
                btn.innerText = "UPLOADING TO SERVER [||||||||--]";
            }, 1000);

            setTimeout(() => {
                // Estado 2: Éxito
                btn.innerText = "TRANSMISSION COMPLETE";
                btn.style.backgroundColor = "var(--color-cyan-primary)";
                btn.style.color = "#000";
                
                // Limpiar form
                inputs.forEach(input => input.value = '');

                // Resetear botón después de 3 seg
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = "transparent";
                    btn.style.color = "var(--color-cyan-primary)";
                }, 3000);
            }, 2500);
        });
    },

    /**
     * 6. PSYCHOLOGICAL TRICKS
     * Cambia el título de la pestaña cuando el usuario se va
     */
    initTabTitleTrick: function() {
        const pageTitle = document.title;
        const attentionTitle = "⚠️ DON'T LOOK BEHIND YOU";
        // Alternativa: "SYSTEM FAILURE..." o "ABIGAIL IS WATCHING"

        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                document.title = attentionTitle;
            } else {
                document.title = pageTitle;
            }
        });
    },

    /**
     * 7. PARALLAX EFFECT (Sutil)
     * Mueve el fondo ligeramente con el mouse
     */
    initScrollEffects: function() {
        document.addEventListener("mousemove", (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            // Seleccionar elementos decorativos si existieran
            // const glitchWrapper = document.querySelector('.glitch-wrapper');
            // if(glitchWrapper) glitchWrapper.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }
};

// Start Engine
document.addEventListener('DOMContentLoaded', () => {
    GrimdoorEngine.init();
});