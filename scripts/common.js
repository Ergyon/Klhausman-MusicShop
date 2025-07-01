// Side modale menu
window.addEventListener("DOMContentLoaded", () => {
    const openMenu = document.getElementById("openMenu")
    const closeMenu = document.getElementById("closeModal")
    const sideModal = document.getElementById("sideModal")
    const overlay = document.getElementById("overlay")
    
    openMenu?.addEventListener("click", () => {
        sideModal.classList.add("active")
        overlay.classList.remove("hidden")
    })
    
    closeMenu?.addEventListener("click", () => {
        sideModal.classList.remove("active")
        overlay.classList.add("hidden")
    } )
    
    overlay?.addEventListener("click", () => {
        sideModal.classList.remove("active")
        overlay.classList.add("hidden")
        sideModalShop.classList.remove("active")
    })
    
    // Side modale panier d'achat
    const openCartShop = document.getElementById("openCartShop")
    const closeCartShop = document.getElementById("closeCartShop")
    const sideModalShop = document.getElementById("sideModalShop")
    
    openCartShop?.addEventListener("click", () => {
        sideModalShop.classList.add("active")
        overlay.classList.remove("hidden")
    })
    
    closeCartShop?.addEventListener("click", () => {
        sideModalShop.classList.remove("active")
        overlay.classList.add("hidden")
    })
}) 

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
let cart = []
const cartSummary = document.querySelector(".cart__summary")
cartSummary.style.display = "none"

function addToCart(product, addCartBtn) {
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
    priceItemShop.textContent = product.price.toLocaleString("fr-FR") + " $"

    const removeItemShop = document.createElement("button")
    removeItemShop.classList.add("items__details__remove")
    removeItemShop.textContent = "Retirer"

    const lineSeparator = document.createElement("div")
    lineSeparator.classList.add("items__details--separator")

    itemsInfos.appendChild(nameItemshop)
    itemsInfos.appendChild(priceItemShop)
    itemsInfos.appendChild(removeItemShop)
    itemsInfos.appendChild(lineSeparator)
    
    cartItem.appendChild(imgItemShop)
    cartItem.appendChild(itemsInfos)
    cartItemsList.appendChild(cartItem)

    // push le porduit dans le panier
    cart.push(product)
    cartSummary.style.display = "flex"
    updateTotal()

    // produit checked
    addCartBtn.innerHTML ="Ajouté au panier"
    addCartBtn.classList.add("product__btn--addCart--checked")

    // Retirer du panier
    removeItemShop.addEventListener("click", () => {
        cartItem.remove()
        addCartBtn.classList.remove("product__btn--addCart--checked")
        addCartBtn.innerHTML = "Sélectionner ce produit"
        
        const index = cart.indexOf(product)
        if (index !== -1) {
            cart.splice(index, 1)
        }
        
        updateTotal()
        localStorage.setItem("cart", JSON.stringify(cart))
    })
    
    // Tout retirer du panier
    removeAll.addEventListener("click", () => {
        cartItemsList.innerHTML = ""
        cart = []
        cartSummary.style.display = "none"

        const allBtnsChecked = document.querySelectorAll(".product__btn--addCart")
        allBtnsChecked.forEach((btn) => {
            btn.classList.remove("product__btn--addCart--checked")
            btn.textContent = "Sélectionner ce produit"
        })

        updateTotal()
        localStorage.removeItem("cart")
    })

    localStorage.setItem("cart", JSON.stringify(cart))
}

// Calculer total panier
function updateTotal() {
    const tax = document.getElementById("tax")
    const totalContent = document.getElementById("total")
    let total = 0
    
    cart.forEach(product => {
        total += product.price
    })
    
    tax.innerHTML = "TVA : 2,4%"
    totalContent.innerHTML = "Total : " + total.toLocaleString("fr-FR") + " $"
    
    if (cart.length === 0) {
        cartSummary.classList.add("hidden")
    }
}

