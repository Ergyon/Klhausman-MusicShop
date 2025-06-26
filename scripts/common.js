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