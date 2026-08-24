export function initFaq() {
    const root = document.getElementById("faq-list");
    if (!root) return; // Exit if no FAQ on page

    function setOpen(trigger, open) {
        trigger.setAttribute("aria-expanded", String(open));
        const content = trigger.nextElementSibling;
        if (content) {
            content.classList.toggle("hidden", !open);
        }
    }

    root.addEventListener("click", (e) => {
        // Get the closest trigger button even if SVG is clicked
        const trigger = e.target.closest("[data-faq-trigger]");
        if (!trigger) return;

        const triggers = root.querySelectorAll("[data-faq-trigger]");
        const willOpen = trigger.getAttribute("aria-expanded") !== "true";

        // Close all
        triggers.forEach((t) => setOpen(t, false));
        
        // Open the clicked one
        if (willOpen) setOpen(trigger, true);
    });
}