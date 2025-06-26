// Recupere toutes les donnees
async function getData() {
    try {
        const response = await fetch("data/products-data.json")
        if (!response.ok) {
            throw new Error("Erreur lors des chargement des données : " + response.status )
        }
        const allDatas = await response.json()
        return allDatas

    } catch (error) {
        console.error("Données indisponibles", error)
        return null
    }
}

// Categorie selon la page
function getCurrentCategory() {
    const url = window.location.href
    if (url.includes("violons")) return "violons"
    if (url.includes("guitares")) return "guitares"
    if (url.includes("drums")) return "drums"
    if (url.includes("pianos")) return "pianos"
    return null
}

// Afficher les produits
function displayProducts(products) {
    const container = document.querySelector(".products-container")

    products.forEach(product => {
        const card = document.createElement("div")
        card.classList.add("product")

        const img = document.createElement("img")
        img.classList.add("product__img")
        img.src = product.img
        img.alt = product.name

        const price = document.createElement("span")
        price.classList.add("product__btn--price")
        price.textContent = product.price + " $"

        const name = document.createElement("span")
        name.classList.add("product__name")
        name.textContent = product.name

        const details = document.createElement("span")
        details.classList.add("product__btn--details")
        details.textContent = "Voir la fiche"

        card.appendChild(img)
        card.appendChild(price)
        card.appendChild(name)
        card.appendChild(details)
        container.appendChild(card)
    })
}

// Initialisation
async function init() {
    const data = await getData()
    const category = getCurrentCategory()

    if (!data || !category || !data[category]) {
        console.error("Catégories non trouvées ou données manquantes")
        return
    }

    displayProducts(data[category])
}

init()