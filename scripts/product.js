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

// Creer et afficher les produits
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
        details.setAttribute("data-name", product.name)
        
        // Creation de la modale details
        const modal = createDetailsProduct(product)

        card.appendChild(img)
        card.appendChild(price)
        card.appendChild(name)
        card.appendChild(details)
        card.appendChild(modal)
        container.appendChild(card)
        
        // Ouvrir et fermer la modale details
        details.addEventListener("click", () => {
            modal.classList.remove("hidden")
        })
        
        const closeBtn = modal.querySelector(".details-modal--closebtn")

        closeBtn.addEventListener("click", () => {
            modal.classList.add("hidden")
        })
    })
}

// Creation modale fiche produit
function createDetailsProduct(product) {
    const wrapper = document.createElement("div")
    wrapper.classList.add("hidden", "details-wrapper")

    const modal = document.createElement("div")
    modal.classList.add("details-modal")

    const closeBtn = document.createElement("button")
    closeBtn.classList.add("details-modal--closebtn")

    const title = document.createElement("h3")
    title.classList.add("details-modal__name")
    title.textContent = product.name

    const table = document.createElement("table")
    table.classList.add("details-modal__table")

    const details = [
        {label: "Bois", value: product.wood},
        {label: "Dimensions", value: product.dimension},
        {label: "Poids", value: product.weight},
        {label: "Créateur", value: product.creator},
    ]

    details.forEach(detail => {
        const row = document.createElement("tr")

        const th = document.createElement("th")
        th.textContent = detail.label

        const td = document.createElement("td")
        td.textContent = detail.value

        row.appendChild(th)
        row.appendChild(td)
        table.appendChild(row)
    })

    modal.appendChild(closeBtn)
    modal.appendChild(title)
    modal.appendChild(table)
    wrapper.appendChild(modal)

    return wrapper
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