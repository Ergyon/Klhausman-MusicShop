import { showFullScreenImage } from "./common.js"
import { addToCart} from "./common.js"
// Recupere toutes les donnees
export async function getData() {
    try {
        const response = await fetch("../data/products-data.json")
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
    if (url.includes("new")) return "new"
    if (url.includes("popular")) return "popular"
    if (url.includes("uniques")) return "uniques"
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
        price.textContent = product.price.toLocaleString("fr-FR", {
            style: "currency", 
            currency: "EUR"
        })

        const name = document.createElement("span")
        name.classList.add("product__name")
        name.textContent = product.name

        const showDetails = document.createElement("span")
        showDetails.classList.add("product__btn--details")
        showDetails.textContent = "Voir la fiche"
        showDetails.setAttribute("data-name", product.name)

        const addCartBtn = document.createElement("span")
        addCartBtn.classList.add("product__btn--addCart")
        addCartBtn.textContent = "Sélectionner ce produit"
        addCartBtn.setAttribute("data-name", product.name)

        addCartBtn.addEventListener("click", () => {
            addToCart(product, addCartBtn)
        })
        
        // Creation de la modale details
        const modalWrapper = createDetailsProduct(product)
        const modal = modalWrapper.querySelector(".details-modal")

        card.appendChild(img)
        card.appendChild(price)
        card.appendChild(name)
        card.appendChild(showDetails)
        card.appendChild(addCartBtn)
        card.appendChild(modalWrapper)
        container.appendChild(card)
        
        // Ouvrir et fermer la modale details
        showDetails.addEventListener("click", () => {
            modalWrapper.classList.remove("hidden")
            modal.classList.remove("hidden", "slideDownTable")
            modal.classList.add("slideUpTable")
        })
        
        const closeBtn = modal.querySelector(".details-modal--closebtn")

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("slideUpTable")
            modal.classList.add("slideDownTable")
            setTimeout(() => {
                modalWrapper.classList.add("hidden")
            }, 400)
        })

        // Afficher image en grand
        img.addEventListener("click", () => {
            showFullScreenImage(product.img, product.name)
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
    closeBtn.innerHTML = "&times;"
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

    // Recharger le panier et les produits selectionnes 
    const storedCart = JSON.parse(localStorage.getItem("cart"))
    if (storedCart && Array.isArray(storedCart)) {
        storedCart.forEach((product) => {
            const addCartBtn = document.querySelector(`.product__btn--addCart[data-name="${product.name}"]`)
            if (addCartBtn) {
                addToCart(product, addCartBtn)
            }
        })
    }
}

init()