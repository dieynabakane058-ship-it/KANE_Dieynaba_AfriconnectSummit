/*DARK MODE
*/

const themeBtn = document.getElementById("theme-toggle");

if(themeBtn){

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
    }

    themeBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("theme","dark");
        }else{
            localStorage.setItem("theme","light");
        }

    });

}

/* NAVBAR SCROLL */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }

});

/*BOUTON RETOUR EN HAUT */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){
        topBtn.style.display="block";
    }else{
        topBtn.style.display="none";
    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*tableau*/
const tabs=document.querySelectorAll(".tab-btn");
const plannings=document.querySelectorAll(".planning");

tabs.forEach(tab=>{
    tab.addEventListener("click",()=>{

        tabs.forEach(btn=>btn.classList.remove("active"));

        tab.classList.add("active");

        plannings.forEach(plan=>{
            plan.style.display="none";
        });

        document.getElementById(tab.dataset.target).style.display="block";

    });
});


/*filtres des intervenants*/
const filterBtns=document.querySelectorAll(".filter-btn");
const cards=document.querySelectorAll(".speaker-card");

filterBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filterBtns.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        const filter=btn.dataset.filter;

        cards.forEach(card=>{

            if(filter==="all" || card.dataset.category===filter){
                card.style.display="block";
            }else{
                card.style.display="none";
            }

        });

    });

});

/*annimation*/
const hiddenElements = document.querySelectorAll(
".argument-card, .theme-card, .speaker-card"
);

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach(el=>observer.observe(el));

/*Annee dynamique du footer*/
const year = document.getElementById("year");

if(year){
    year.textContent = new Date().getFullYear();
}


/*=========================
   COMPTEURS ANIMÉS
=========================*/

const statsSection = document.querySelector("#stats");

if (statsSection) {

    const counters = document.querySelectorAll(".counter");
    let isAnimating = false;

    function startCounters() {

        if (isAnimating) return;
        isAnimating = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);
            let count = 0;
            const increment = Math.ceil(target / 100);

            counter.textContent = "0";

            function updateCounter() {

                count += increment;

                if (count >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = count;
                    requestAnimationFrame(updateCounter);
                }

            }

            updateCounter();

        });

        setTimeout(() => {
            isAnimating = false;
        }, 1500);

    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                startCounters();
            }

        });

    }, {
        threshold: 0.5
    });

    observer.observe(statsSection);

}

/*=========================
   COMPTE À REBOURS
=========================*/

const days = document.getElementById("days");

if (days) {

    const eventDate = new Date("November 18, 2026 09:00:00").getTime();

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance <= 0) return;

        document.getElementById("days").textContent =
            Math.floor(distance / (1000 * 60 * 60 * 24));

        document.getElementById("hours").textContent =
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        document.getElementById("minutes").textContent =
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("seconds").textContent =
            Math.floor((distance % (1000 * 60)) / 1000);

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

}

/*navbar menu*/
const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if(menuBtn && navMenu){

    menuBtn.addEventListener("click", () =>{

        navMenu.classList.toggle("active");

    });

}

/*=========================
   VALIDATION FORMULAIRE
=========================*/

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let isValid = true;

        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const telephone = document.getElementById("telephone");
        const type = document.getElementById("type");
        const pays = document.getElementById("pays");
        const message = document.getElementById("message");
        const successMessage = document.getElementById("successMessage");

        // Supprimer les anciens messages
        document.querySelectorAll(".error").forEach(error => {
            error.textContent = "";
        });

        successMessage.textContent = "";

        // Supprimer les anciennes bordures
        document.querySelectorAll("input, select, textarea").forEach(champ => {
            champ.classList.remove("input-error");
            champ.classList.remove("input-success");
        });

        // Fonction erreur
        function showError(champ, errorId, texte) {
            champ.classList.add("input-error");
            document.getElementById(errorId).textContent = texte;
            isValid = false;
        }

        // Fonction succès
        function showSuccess(champ) {
            champ.classList.add("input-success");
        }

        // Nom
        if (nom.value.trim() === "") {
            showError(nom, "nomError", "Le nom est obligatoire.");
        } else {
            showSuccess(nom);
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value.trim())) {
            showError(email, "emailError", "Adresse email invalide.");
        } else {
            showSuccess(email);
        }

        // Téléphone
        const telRegex = /^[0-9]{8,}$/;

        if (!telRegex.test(telephone.value.trim())) {
            showError(telephone, "telephoneError", "Le téléphone doit contenir au moins 8 chiffres.");
        } else {
            showSuccess(telephone);
        }

        // Type
        if (type.value === "") {
            showError(type, "typeError", "Choisissez un type de participation.");
        } else {
            showSuccess(type);
        }

        // Pays
        if (pays.value === "") {
            showError(pays, "paysError", "Choisissez un pays.");
        } else {
            showSuccess(pays);
        }

        // Message
        if (message.value.trim().length < 20) {
            showError(message, "messageError", "Le message doit contenir au moins 20 caractères.");
        } else {
            showSuccess(message);
        }

        // Si tout est valide
        if (isValid) {

            successMessage.textContent = "✅ Inscription envoyée avec succès !";
            successMessage.classList.add("success");

            form.reset();

            document.querySelectorAll(".input-success").forEach(champ => {
                champ.classList.remove("input-success");
            });

        }

    });

}