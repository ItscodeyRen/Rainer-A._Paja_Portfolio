/* =========================================================
   PORTFOLIO JAVASCRIPT
   Rainer A. Paja
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("main section[id]");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (mobileToggle && navMenu) {

        mobileToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            mobileToggle.classList.toggle("active", isOpen);

        });


        /* Close menu when a navigation link is clicked */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileToggle.classList.remove("active");

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                mobileToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove("open");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileToggle.classList.remove("active");

            }

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-panel, " +
        ".experience-card, " +
        ".project-card, " +
        ".design-card, " +
        ".skill-category, " +
        ".leadership-card, " +
        ".certification-card, " +
        ".contact-wrapper"
    );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       STAGGER CARD ANIMATIONS
    ===================================================== */

    const cardGroups = [
        ".project-grid",
        ".design-grid",
        ".skills-container",
        ".experience-list"
    ];


    cardGroups.forEach(selector => {

        const cards =
            document.querySelectorAll(
                `${selector} > *`
            );

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLLING
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbar =
                    document.querySelector(".navbar");

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       NAVBAR BACKGROUND ON SCROLL
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");


    const updateNavbar = () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(7, 17, 31, 0.94)";

            navbar.style.boxShadow =
                "0 10px 35px rgba(0, 0, 0, 0.18)";

        } else {

            navbar.style.background =
                "rgba(7, 17, 31, 0.78)";

            navbar.style.boxShadow =
                "none";

        }

    };


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =====================================================
       PROJECT IMAGE FALLBACK
    ===================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image img, .design-image img"
        );


    projectImages.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                /*
                 * Prevent an infinite loop if the fallback
                 * image also cannot be found.
                 */

                if (
                    image.dataset.fallbackApplied === "true"
                ) {
                    return;
                }

                image.dataset.fallbackApplied = "true";

                image.src = "Images/Userlog UI.png";

            }
        );

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="http"]'
    ).forEach(link => {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       REDUCED MOTION ACCESSIBILITY
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";

        revealElements.forEach(element => {

            element.style.opacity = "1";

            element.style.transform =
                "none";

            element.style.transition =
                "none";

        });

    }


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cRainer A. Paja | Portfolio",
        "font-size: 18px; font-weight: bold;"
    );

    console.log(
        "BS Information Technology Graduate"
    );

});