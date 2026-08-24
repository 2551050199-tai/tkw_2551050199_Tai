export function initPricing() {
    const toggle = document.getElementById("pricing-toggle");
    const prices = document.querySelectorAll("[data-price]");
    
    if (!toggle || prices.length === 0) return;

    // Format currency to VN standard
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
    });

    function updatePrices(isYearly) {
        prices.forEach(el => {
            const value = isYearly ? el.dataset.yearly : el.dataset.monthly;
            el.textContent = formatter.format(Number(value));
        });
    }

    // Initial format
    updatePrices(false);

    toggle.addEventListener("click", () => {
        const isYearly = toggle.getAttribute("aria-checked") === "true";
        toggle.setAttribute("aria-checked", String(!isYearly));
        updatePrices(!isYearly);
    });
}