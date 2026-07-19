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

window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
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