/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

    });


    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

}


/* =========================
   NAVBAR ACTIVE LINK
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".template-card, .benefit, .step, .testimonial, .why-content, .why-visual, .contact-box"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================
   HERO MOUSE EFFECT
========================= */

const heroVisual =
    document.querySelector(".hero-visual");

const laptop =
    document.querySelector(".laptop");


if (heroVisual && laptop) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width;

            const y =
                (event.clientY - rect.top)
                / rect.height;

            const rotateY =
                -8 + ((x - .5) * 8);

            const rotateX =
                4 - ((y - .5) * 5);

            laptop.style.transform =
                `
                perspective(1000px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            laptop.style.transform =
                `
                perspective(1000px)
                rotateY(-8deg)
                rotateX(4deg)
                `;

        }
    );

}


/* =========================
   TEMPLATE BUTTONS
========================= */

document
    .querySelectorAll(".template-info button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .getElementById("contact")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================
   PARALLAX GLOW
========================= */

window.addEventListener(
    "mousemove",
    event => {

        const x =
            event.clientX /
            window.innerWidth;

        const y =
            event.clientY /
            window.innerHeight;


        document
            .querySelectorAll(".background-glow")
            .forEach((glow, index) => {

                const amount =
                    index === 0 ? 25 : -20;

                glow.style.transform =
                    `
                    translate(
                        ${(x - .5) * amount}px,
                        ${(y - .5) * amount}px
                    )
                    `;

            });

    }
);


/* =========================
   FORMSPREE CONTACT FORM
========================= */

const projectForm =
    document.getElementById("projectForm");

const formStatus =
    document.getElementById("formStatus");

const submitButton =
    document.getElementById("submitButton");


if (projectForm) {

    projectForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const originalButton =
                submitButton.innerHTML;


            submitButton.disabled = true;

            submitButton.innerHTML =
                `
                <span>Sending...</span>
                <span>⏳</span>
                `;


            formStatus.className =
                "form-status";

            formStatus.textContent = "";


            const formData =
                new FormData(projectForm);


            try {

                const response =
                    await fetch(
                        projectForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    formStatus.className =
                        "form-status success";

                    formStatus.textContent =
                        "Message sent successfully! I'll get back to you through email.";

                    projectForm.reset();

                } else {

                    throw new Error(
                        "Form submission failed"
                    );

                }


            } catch (error) {

                formStatus.className =
                    "form-status error";

                formStatus.textContent =
                    "Something went wrong. Please try again.";

            }


            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButton;

        });

}