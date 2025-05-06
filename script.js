
// Sliders imgs and txts
const slider1 = [
    {
        "img":"img/violons-group.jpg",
        "txt":"Une petite descriptions plus ou moins longue selon mon inspi du moment"
    },
    {
        "img":"img/violons-group-zoom.jpg",
        "txt":"Une deuxieme petite descriptions peut-etre un peu moins longue selon mon inspi du moment"
    },
    {
        "img":"img/violon-zoom2.jpg",
        "txt":"Une troisieme petite descriptions beaucoup plus longue car je suis tres inspire regardez le nombre de mots que je vient d'ecrire c'est pas mal en vrai"
    }      
]

const slider2 = [
    {
        "img":"img/snare.jpg",
        "txt":"Une petite descriptions plus ou moins longue selon mon inspi du moment"
    },
    {
        "img":"img/toms.jpg",
        "txt":"Une deuxieme petite descriptions peut-etre un peu moins longue selon mon inspi du moment"
    },
    {
        "img":"img/drums.jpg",
        "txt":"Une troisieme petite descriptions beaucoup plus longue car je suis tres inspire regardez le nombre de mots que je vient d'ecrire c'est pas mal en vrai"
    }  
]

const slider3 = [
    {
        "img":"img/piano-keys-black.jpg",
        "txt":"Une petite descriptions plus ou moins longue selon mon inspi du moment"
    },
    {
        "img":"img/piano-over.jpg",
        "txt":"Une deuxieme petite descriptions peut-etre un peu moins longue selon mon inspi du moment"
    },
    {
        "img":"img/piano-mechanics-zoom.jpg",
        "txt":"Une troisieme petite descriptions beaucoup plus longue car je suis tres inspire regardez le nombre de mots que je vient d'ecrire c'est pas mal en vrai"
    }
]    

const imgSlider1 = document.getElementById('imgSlider1')
const txtSlider1 = document.getElementById('txtSlider1')

const imgSlider2 = document.getElementById('imgSlider2')
const txtSlider2 = document.getElementById('txtSlider2')

const imgSlider3 = document.getElementById('imgSlider3')
const txtSlider3 = document.getElementById('txtSlider3')


let currentIndex = 0

updateSlider()

function updateSlider() {
    imgSlider1.src = [currentIndex].img
    txtSlider1.innerHTML = [currentIndex].txt
}

imgSlider1.addEventListener('click', () => {
    currentIndex++
    if (currentIndex >= slider1.length) {
        currentIndex = 0
    }
    updateSlider()
})