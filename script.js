
// Sliders imgs and txts
const sliders = [
    [
        {
            "img":"img/violons-group.jpg",
            "txt":"Une petite descriptions plus ou moins longue selon mon inspi du moment"
        },
        {
            "img":"img/violons-group-zoom.jpg",
            "txt":"Une deuxieme petite descriptions peut-etre un peu moins longue selon mon inspi du moment"
        },
        {
            "img":"img/violon-zoom-horizontal.jpg",
            "txt":"Une troisieme petite descriptions beaucoup plus longue car je suis tres inspire regardez le nombre de mots que je vient d'ecrire c'est pas mal en vrai"
        }      

    ],
    [
        {
            "img":"img/snare.jpg",
            "txt":"Une petite descriptions plus ou moins longue selon mon inspi du moment"
        },
        {
            "img":"img/snare2.jpg",
            "txt":"Une deuxieme petite descriptions peut-etre un peu moins longue selon mon inspi du moment"
        },
        {
            "img":"img/drums.jpg",
            "txt":"Une troisieme petite descriptions beaucoup plus longue car je suis tres inspire regardez le nombre de mots que je vient d'ecrire c'est pas mal en vrai"
        }  
    ],
    [
       {
           "img":"img/piano-keys-black.jpg",
           "txt":"Une petite descriptions plus ou moins longue selon mon inspi du moment"
       },
       {
           "img":"img/piano-touch.jpg",
           "txt":"Une deuxieme petite descriptions peut-etre un peu moins longue selon mon inspi du moment"
       },
       {
           "img":"img/piano-keys.jpg",
           "txt":"Une troisieme petite descriptions beaucoup plus longue car je suis tres inspire regardez le nombre de mots que je vient d'ecrire c'est pas mal en vrai"
       }
    ]    
]

const currentIndexes = [0, 0, 0]

// Mettre a jour un slider
function updateSlider(sliderIndex) {
    const sliderData = sliders[sliderIndex]
    const currentIndex = currentIndexes[sliderIndex]

    const img = document.getElementById(`imgSlider${sliderIndex}`)
    const txt = document.getElementById(`txtSlider${sliderIndex}`)

    img.src = sliderData[currentIndex].img
    txt.textContent = sliderData[currentIndex].txt
}

for (let i = 0; i < sliders.length; i++) {
    updateSlider(i)
}

const arrows = document.querySelectorAll('.arrow')
arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const sliderIndex = parseInt(arrow.dataset.slider)
        const direction = arrow.dataset.direction

        if (direction === 'right') {
            currentIndexes[sliderIndex]++
            if (currentIndexes[sliderIndex] >= sliders[sliderIndex].length) {
                currentIndexes[sliderIndex] = 0
            }
        } else if (direction === 'left') {
            currentIndexes[sliderIndex]--
            if (currentIndexes[sliderIndex] < 0) {
                currentIndexes[sliderIndex] = sliders[sliderIndex].length -1
            }
        }
        updateSlider(sliderIndex)
    })
})