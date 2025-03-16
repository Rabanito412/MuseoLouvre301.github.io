document.addEventListener('DOMContentLoaded', function() {
    // ==================== NAVEGACIÓN Y SCROLL ====================
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    // Función para scroll suave
    function smoothScroll(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const yOffset = window.innerWidth <= 768 ? -100 : -80;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    // Event listeners para los links de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            // Agregar clase active al link clickeado
            this.classList.add('active');
            
            smoothScroll(targetId);
        });
    });

    // Actualizar links activos al hacer scroll
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === #${sectionId}) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Efecto de sombra en el header
        header.style.boxShadow = window.scrollY > 100 
            ? '0 4px 10px rgba(0,0,0,0.3)' 
            : '0 2px 5px rgba(0,0,0,0.2)';
    });

    // ==================== CARRUSEL GALERÍA ====================
    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
        const track = gallery.querySelector('.gallery-track');
        const slides = Array.from(track.children);
        let slideWidth = slides[0].getBoundingClientRect().width + 20;
        let currentIndex = 1;
        let autoSlideInterval;
        let isTransitioning = false;

        // Clonar elementos para efecto infinito
        const cloneFirst = slides[0].cloneNode(true);
        const cloneSecond = slides[1].cloneNode(true);
        const cloneLast = slides[slides.length - 1].cloneNode(true);
        const clonePreLast = slides[slides.length - 2].cloneNode(true);

        track.prepend(clonePreLast, cloneLast);
        track.append(cloneFirst, cloneSecond);

        function updateSlides() {
            track.style.transform = translateX(-${currentIndex * slideWidth}px);
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Marcar slides activos
            [currentIndex - 1, currentIndex, currentIndex + 1].forEach(i => {
                if (track.children[i]) {
                    track.children[i].classList.add('active');
                }
            });
        }

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            track.style.transition = 'transform 0.5s ease-in-out';
            updateSlides();
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;
            track.style.transition = 'transform 0.5s ease-in-out';
            updateSlides();
        }

        function handleTransitionEnd() {
            isTransitioning = false;
            
            // Reiniciar posición para efecto infinito
            if (currentIndex >= track.children.length - 3) {
                track.style.transition = 'none';
                currentIndex = 2;
                updateSlides();
            }
            if (currentIndex <= 1) {
                track.style.transition = 'none';
                currentIndex = track.children.length - 4;
                updateSlides();
            }
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Event listeners para el carrusel
        track.addEventListener('transitionend', handleTransitionEnd);
        
        gallery.querySelector('.next').addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
        
        gallery.querySelector('.prev').addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        gallery.addEventListener('mouseenter', stopAutoSlide);
        gallery.addEventListener('mouseleave', startAutoSlide);

        // Inicialización
        updateSlides();
        startAutoSlide();

        // Actualizar en cambio de tamaño
        window.addEventListener('resize', () => {
            slideWidth = slides[0].getBoundingClientRect().width + 20;
            updateSlides();
        });
    }

    // ==================== INICIALIZACIÓN GENERAL ====================
    // Activar primera sección por defecto
    document.querySelector('nav a[href="#inicio"]').classList.add('active');
});