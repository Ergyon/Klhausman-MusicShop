import { sliders } from '/scripts/sliders-data.js'

// Mettre a jour un slider
const currentIndexes = [0, 0, 0]

function updateSlider(sliderIndex) {
    const sliderData = sliders[sliderIndex]
    const currentIndex = currentIndexes[sliderIndex]


    const sliderImg = document.getElementById(`imgSlider${sliderIndex}`)
    const sliderTxt = document.getElementById(`txtSlider${sliderIndex}`)

    sliderImg.classList.remove("fade-in")
    sliderTxt.classList.remove("fade-in-txt")
    
    void sliderImg.offsetWidth;
    
    sliderImg.src = sliderData[currentIndex].img
    sliderTxt.textContent= sliderData[currentIndex].txt
    
    sliderImg.classList.add("fade-in")
    sliderTxt.classList.add("fade-in-txt")
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

// Animation texte tape au clavier
const subtitleLetters = "Un savoir-faire d'excellence et des instruments de prestige depuis 1793."
let index = 0

function typedLetters() {
    if(index < subtitleLetters.length) {
        headlineSubtitle.textContent += subtitleLetters.charAt(index)
        index++
        setTimeout(typedLetters, 60)
    }
}
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(typedLetters, 1500)
})
