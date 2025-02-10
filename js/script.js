document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        modeToggle.textContent = isLightMode ? 'Modo Oscuro' : 'Modo Claro';
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const modal = document.getElementById("achievementModal");
    const achievementButtons = document.querySelectorAll(".achievement-button");
    const closeButton = document.getElementsByClassName("close")[0];
    const achievementTitle = document.getElementById("achievementTitle");
    const achievementDescription = document.getElementById("achievementDescription");
    const achievementImage = document.getElementById("achievementImage");

    const achievements = {
        1: {
            title: "Participación en CALL FOR CODE",
            description: "Desarrollé una aplicación web que ayudó a aumentar la productividad de la empresa en un 30%. Esta aplicación optimizó los procesos internos y mejoró la comunicación entre equipos.",
            image: "/placeholder.svg?height=300&width=400"
        },
        2: {
            title: "Proyecto del SENA",
            description: "Gané el primer lugar en un hackathon local con un proyecto de accesibilidad web. El proyecto consistía en una extensión de navegador que mejoraba la legibilidad de sitios web para personas con dislexia.",
            image: "/placeholder.svg?height=300&width=400"
        }
    };

    achievementButtons.forEach(button => {
        button.addEventListener("click", () => {
            const achievementId = button.getAttribute("data-achievement");
            const achievement = achievements[achievementId];
            achievementTitle.textContent = achievement.title;
            achievementDescription.textContent = achievement.description;
            achievementImage.src = achievement.image;
            achievementImage.alt = achievement.title;
            modal.style.display = "block";
        });
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    function toggleDropdown(element) {
        const content = element.querySelector('.dropdown-content');
        const btn = element.querySelector('.dropdown-btn i');
        
        element.classList.toggle('active');
        
        if (element.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            btn.style.transform = 'rotate(180deg)';
        } else {
            content.style.maxHeight = '0px';
            btn.style.transform = 'rotate(0deg)';
        }
    }

    // Add click event listeners to all experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('click', () => toggleDropdown(item));
    });

    // Animación de entrada para las cards de proyectos
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Animación para las cards de logros
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const fadeUpObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px'
        }
    );

    fadeUpElements.forEach(element => {
        fadeUpObserver.observe(element);
    });

    // Cursor personalizado
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // Efecto parallax en el scroll
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.backgroundPosition = `50% ${yPos}px`;
        });
    });

    // Efecto de parallax mejorado
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.achievement-card');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            const angleX = (cardY - e.clientY) / 30;
            const angleY = (e.clientX - cardX) / 30;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
    });

    // Reiniciar transformación cuando el mouse sale
    document.addEventListener('mouseleave', () => {
        const cards = document.querySelectorAll('.achievement-card');
        cards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Efecto parallax sutil para el patrón de fondo
    document.addEventListener('mousemove', (e) => {
        const pattern = document.querySelector('.background-pattern');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        pattern.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
    });

    // Efecto de movimiento para el fondo
    document.addEventListener('mousemove', (e) => {
        const pattern = document.querySelector('.background-pattern');
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        pattern.style.backgroundPosition = `${mouseX}% ${mouseY}%`;
    });

    // Animación de typing para el título
    const textElement = document.querySelector('.hero-content h1');
    const text = textElement.textContent;
    textElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    // Animación para los items de experiencia
    const experienceObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Animar la línea de tiempo
                    const dot = entry.target.querySelector('.timeline-dot');
                    dot.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        dot.style.transform = 'scale(1)';
                    }, 500);
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll('.experience-item').forEach(item => {
        experienceObserver.observe(item);
    });

    // Animación para los items de educación
    const educationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const dot = entry.target.querySelector('.timeline-dot');
                    dot.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        dot.style.transform = 'scale(1)';
                    }, 500);
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll('.education-item').forEach(item => {
        educationObserver.observe(item);
    });

    // Código Konami
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        const secretMessage = document.querySelector('.secret-message');
        secretMessage.classList.remove('hidden');
        secretMessage.classList.add('show');
        
        // Efecto de confeti
        createConfetti();
    }

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }
});

window.showHobbyDetails = function(card) {
    // Remover la clase 'flipped' de todas las otras tarjetas
    document.querySelectorAll('.hobby-card').forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('flipped')) {
            otherCard.classList.remove('flipped');
        }
    });
    
    // Voltear la tarjeta seleccionada
    card.classList.toggle('flipped');
};