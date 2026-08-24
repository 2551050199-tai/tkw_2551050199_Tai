export function initSlider() {
    const root = document.getElementById("testimonial-slider");
    if (!root) return; 
    
    const track = root.querySelector("[data-slider-track]");
    const slides = root.querySelectorAll("[data-slide]");
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let intervalId;

    function go(next) {
        currentIndex = (next + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        slides.forEach((s, i) => {
            s.toggleAttribute("inert", i !== currentIndex);
        });
    }

    function start() {
        clearInterval(intervalId);
        intervalId = setInterval(() => go(currentIndex + 1), 3000);
    }

    function stop() {
        clearInterval(intervalId);
    }

    go(0);
    start();

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    
    root.addEventListener("focusout", (e) => {
        if (!root.contains(e.relatedTarget)) {
            start();
        }
    });

    document.addEventListener("visibilitychange", () => {
        document.hidden ? stop() : start();
    });
}