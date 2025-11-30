document.addEventListener("DOMContentLoaded", () => {
    
    // --- Loader Removal ---
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => loader.style.display = 'none'
        });
        initAnimations(); // Inicia as animações do site apenas após o load
    }, 1500);

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Hero Carousel Logic & Color Adaptation ---
    const slides = document.querySelectorAll('.hero-slide');
    const ambientBg = document.querySelector('.ambient-bg');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;

    function updateSlide(index) {
        // Reset classes
        slides.forEach(slide => {
            slide.classList.remove('active');
            gsap.to(slide, { opacity: 0, x: 50, scale: 0.9, duration: 0.5 });
        });

        // Activate new slide
        const activeSlide = slides[index];
        activeSlide.classList.add('active');
        
        // GSAP Animation for entering slide
        gsap.to(activeSlide, { 
            opacity: 1, 
            x: 0, 
            scale: 1, 
            duration: 0.8, 
            ease: "power2.out" 
        });

        // Ambient Color Change
        const color = activeSlide.getAttribute('data-color');
        // Criamos um gradiente radial suave com a cor da imagem
        ambientBg.style.background = `radial-gradient(circle at 70% 50%, ${hexToRgba(color, 0.4)}, transparent 70%)`;
    }

    // Helper para converter Hex para RGBA
    function hexToRgba(hex, alpha) {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    });

    // Auto play (opcional, lento para elegância)
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }, 6000);

    // --- GSAP Scroll Animations (ScrollTrigger) ---
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Animar elementos com atributo data-gsap="fade-up"
        const fadeElements = document.querySelectorAll('[data-gsap="fade-up"]');
        
        fadeElements.forEach(el => {
            const delay = el.getAttribute('data-delay') || 0;
            
            gsap.fromTo(el, 
                { y: 50, opacity: 0 },
                {
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    delay: delay,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Inicia quando o topo do elemento atinge 85% da viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animação do Texto Hero na carga inicial
        gsap.from(".hero-content > *", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.5,
            ease: "power3.out"
        });
    }

    // Inicializa o primeiro slide
    updateSlide(0);
});