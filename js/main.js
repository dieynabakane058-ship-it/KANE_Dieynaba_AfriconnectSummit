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

