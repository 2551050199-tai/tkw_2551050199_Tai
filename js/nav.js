export function initNav() {
    const toggle = document. querySelector('[aria-controls="nav-mobile"');
    const menu =document.getElementById("nav-mobile");

    if (!toggle || !menu) return;

    function setOpen(open) {
        menu.classList.toggle("hidden", !open);

        toggle.setAttribute("aria-expanded", String(open));

        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

        document.body.classList.toggle("overflow-hidden", open);
    }

    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

    toggle.addEventListener("click", () => {
        setOpen(!isOpen());
    })

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    document.addEventListener("click", (e) => {
        if (isOpen() && !e.target.closest("header")) {
            setOpen(false);
        }
    });

    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
        if (e.matches && isOpen()) {
            setOpen(false);
        }
    });
}

initNav();