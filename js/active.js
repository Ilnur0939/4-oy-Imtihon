let aboutSelect = document.querySelector(".about__select")
let aboutArrow = document.querySelector(".about__arrow")

aboutSelect.addEventListener("click" , function(){
    aboutArrow.classList.toggle("about__arrow--opposite")
})

