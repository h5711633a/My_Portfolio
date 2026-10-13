/* =====================================================
   MY-PORTFOLIO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       CURRENT YEAR
    ================================================= */

    const copyright = document.querySelector(".copyright");

    if (copyright) {
        copyright.textContent =
            `© ${new Date().getFullYear()} My Portfolio. All Rights Reserved.`;
    }


    /* =================================================
       ACTIVE NAVIGATION LINK
       (IntersectionObserver: no scroll-event work, and
        the last section highlights correctly too)
    ================================================= */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
            );
        });
    };

    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        {
            // a section is "current" when it crosses the middle band of the screen
            rootMargin: "-40% 0px -55% 0px"
        }
    );

    sections.forEach((section) => navObserver.observe(section));


    /* =================================================
       SCROLL REVEAL ANIMATION
    ================================================= */

    const animatedElements = document.querySelectorAll(
        ".skill-card, .project-card, .service-card, .info-box, .education-card"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    animatedElements.forEach((element) => revealObserver.observe(element));


    /* =================================================
       CONTACT FORM (sends through Formspree)
    ================================================= */

    const contactForm = document.querySelector(".contact-form");
    const formStatus = document.querySelector(".form-status");

    if (contactForm && formStatus) {

        const submitButton = contactForm.querySelector('button[type="submit"]');

        const showStatus = (message, isError = false) => {
            formStatus.classList.toggle("error", isError);
            formStatus.textContent = message;
        };

        contactForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            // Formspree not set up yet -> tell the owner clearly
            if (contactForm.action.includes("YOUR_FORM_ID")) {
                showStatus(
                    "Form is not connected yet. Add your Formspree ID in index.html.",
                    true
                );
                return;
            }

            const name = contactForm.elements["name"].value.trim();

            submitButton.disabled = true;
            showStatus("Sending...");

            try {

                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { Accept: "application/json" }
                });

                if (response.ok) {
                    showStatus(`Thank you, ${name}! Your message has been sent.`);
                    contactForm.reset();
                } else {
                    showStatus("Sorry, something went wrong. Please try again.", true);
                }

            } catch (error) {
                showStatus("Network error. Please check your connection and try again.", true);
            } finally {
                submitButton.disabled = false;
            }

        });

    }


    /* =================================================
       PROJECT LINKS (placeholders until real URLs exist)
    ================================================= */

    document.querySelectorAll(".project-link").forEach((link) => {

        link.addEventListener("click", (event) => {

            if (link.getAttribute("href") === "#") {
                event.preventDefault();
                alert("Project details will be added soon.");
            }

        });

    });

});
