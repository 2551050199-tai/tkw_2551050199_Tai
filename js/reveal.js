export function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (items.length === 0) return;

    // Tôn trọng cài đặt tắt hiệu ứng trượt của hệ điều hành
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        items.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Xong là dừng theo dõi
            }
        });
    }, { threshold: 0.1 }); // Cuộn tới 10% phần tử thì hiện

    items.forEach(el => observer.observe(el));
}