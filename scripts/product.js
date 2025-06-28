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

        const showDetails = document.createElement("span")
        showDetails.classList.add("product__btn--details")
        showDetails.textContent = "Voir la fiche"
        showDetails.setAttribute("data-name", product.name)

        const addCartBtn = document.createElement("span")
        addCartBtn.classList.add("product__btn--addCart")
        addCartBtn.textContent = "Sélectionner ce produit"
        addCartBtn.setAttribute("data-name", product.name)

        addCartBtn.addEventListener("click", () => {
            addToCart(product)
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

// Afficher image plein ecran
function showFullScreenImage(imgSrc, altText) {
    const existingOverlay = document.querySelector(".overlay-fullscreen")
    if (existingOverlay) 
        return

    const overlay = document.createElement("div")
    overlay.classList.add("overlay-fullscreen")

    const fullImg = document.createElement("img")
    fullImg.classList.add("img-fullscreen")
    fullImg.src = imgSrc
    fullImg.alt = altText

    overlay.appendChild(fullImg)
    document.body.appendChild(overlay)

    overlay.addEventListener("click", () => {
        overlay.remove()
    })  
}

// Creer liste produit dans le panier
function addToCart(product) {
    const cartItemsList = document.querySelector(".cart--items")
    
    const cartItem = document.createElement("li")
    cartItem.classList.add("cart--items__item")

    const imgItemShop = document.createElement("img")
    imgItemShop.classList.add("cart--items__item__img")
    imgItemShop.src = product.img
    imgItemShop.alt = product.name

    const itemsInfos = document.createElement("div")
    itemsInfos.classList.add("items__details")

    const nameItemshop = document.createElement("span")
    nameItemshop.classList.add("items__details__name")
    nameItemshop.textContent = product.name

    const priceItemShop = document.createElement("span")
    priceItemShop.classList.add("items__details__price")
    priceItemShop.textContent = product.price + " $"

    const removeItemShop = document.createElement("button")
    removeItemShop.classList.add("items__details__remove")
    removeItemShop.textContent = "Retirer du panier"

    const lineSeparator = document.createElement("div")
    lineSeparator.classList.add("items__details--separator")

    itemsInfos.appendChild(nameItemshop)
    itemsInfos.appendChild(priceItemShop)
    itemsInfos.appendChild(removeItemShop)
    itemsInfos.appendChild(lineSeparator)
    
    cartItem.appendChild(imgItemShop)
    cartItem.appendChild(itemsInfos)
    cartItemsList.appendChild(cartItem)

    // Retirer du panier
    removeItemShop.addEventListener("click", () => {
        cartItem.remove()
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