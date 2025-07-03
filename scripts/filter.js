import { addToCart } from "../scripts/common.js"
import { showFullScreenImage } from "../scripts/common.js"

// Recuparations de tous les produits + categorie de filtre de la page
async function getAllProducts() {
    try {
        const response = await fetch("../data/products-data.json")
        if (!response.ok) {
            throw new Error("Impossible de charger les donnees")
        }

        const allProducts = response.json()
        return allProducts

    } catch(error) {
        console.log("Impossible de collecter les donnees :", error)
        return null
    }
}

function getPageType() {
    const url = window.location.href
    if (url.includes("new")) return "new"
    if (url.includes("popular")) return "popular"
    if (url.includes("uniques")) return "uniques"
    return null
}

// Filtre nouveaux, populaires, uniques
function filterNew(allProducts) {
    return Object.values(allProducts).flatMap(products => products).filter(product => product.new === true)
}

function filterPopular(allProducts) {
    return Object.values(allProducts).flatMap(products => products).filter(product => product.popular === true)
}

function filterUniques(allProducts) {
    return Object.values(allProducts).flatMap(products => products).filter(product => product.unique === true)
}

// Afficher produits filtres
function displayFiltered(products) {
    const container = document.querySelector(".newGallery")
    if (!container || !products.length) {
        container.innerHTML = "Aucun produit à afficher"
        return
    }

    products.forEach(product => {
        const card = document.createElement("card")
        card.classList.add("newGallery__card")

        const cardImg = document.createElement("img")
        cardImg.classList.add("newGallery__card__img")
        cardImg.src = product.img
        cardImg.alt = product.name

        const cardInfos = document.createElement("div")
        cardInfos.classList.add("newGallery__card__infos")

        const cardName = document.createElement("h4")
        cardName.classList.add("newGallery__card__name")
        cardName.textContent = product.name

        const cardPrice = document.createElement("span")
        cardPrice.classList.add("newGallery__card__price")
        cardPrice.textContent = product.price.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR"
        }) 

        const addBtn = document.createElement("button")
        addBtn.classList.add("newGallery__card__addBtn")
        addBtn.textContent = "Sélectionner ce produit"
        
        card.appendChild(cardImg)
        cardInfos.appendChild(cardName)
        cardInfos.appendChild(cardPrice)
        card.appendChild(cardInfos)
        card.appendChild(addBtn)
        container.appendChild(card)

        cardImg.addEventListener("click", () => {
            showFullScreenImage(product.img, product.name)
        })

        addBtn.addEventListener("click", () => {
            addToCart(product, addBtn)
        })
    })
}

// Animation clavier
const subtitleLetters = "Fraîchement sortis de l’atelier, nos nouveaux instruments n’attendent que de trouver leur voix."
let index = 0
const headlineNewSub = document.getElementById("headlineNewSub")

function typedLetters() {
    if(index < subtitleLetters.length) {
        headlineNewSub.textContent += subtitleLetters.charAt(index)
        index++
        setTimeout(typedLetters, 45)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(typedLetters, 1100)
})

// Initialisation
async function initialize() {
    const data = await getAllProducts()

    if (!data) {
        console.error("Produits manquants")
        return
    }

    const pageType = getPageType()
    let filteredProducts = []

    switch (pageType) {
        case "new":
            filteredProducts = filterNew(data)
            break
        case "popular":
            filteredProducts = filterPopular(data)
            break
        case "uniques":
            filteredProducts = filterUniques(data)
            break
        default:
            console.error("Aucune page existante")
            return
    }

    displayFiltered(filteredProducts)
}

window.addEventListener("DOMContentLoaded", () => {
    initialize()
})

