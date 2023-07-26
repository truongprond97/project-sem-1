const cartCountEl = document.querySelector('#cart-item-count')
let count = 0
let cartItems = []

const emptyTemplate = `<tr><td colspan="6"><h5>No result found</h5></td></tr>`

const updateCount = (amount = 0) => {
    count += amount
    cartCountEl.innerText = count
}

const updateCountSession = () => {
    try {
        const sessionStorageCartItem = sessionStorage.getItem('cart')

        if (sessionStorageCartItem && JSON.parse(sessionStorageCartItem) && Array.isArray(JSON.parse(sessionStorageCartItem))) {
            cartItems = JSON.parse(sessionStorageCartItem)
            let totalCount = 0
            cartItems.forEach(val => {totalCount += val.quantity})
            count = totalCount
            cartCountEl.innerText = totalCount
            console.log(totalCount)
        }
    } catch (e) {
        console.error(e)
    }
}

updateCountSession()

const onCartRemove = (id) => {
    let cartItemIndex = cartItems.findIndex(val => val.id === id)
    if (cartItemIndex === -1) return
    updateCount(-1 * cartItems[cartItemIndex].quantity ?? 0)
    cartItems.splice(cartItemIndex, 1)
    sessionStorage.setItem('cart', JSON.stringify(cartItems))
    cartItems = JSON.parse(sessionStorage.getItem('cart'))
}


const addCartItem = (event, id, quantity) => {
    const item = {id, quantity}
    console.log(item)
    event.preventDefault()
    let cartItem = cartItems.find(val => val.id === item.id)
    if (cartItem) {
        cartItem.quantity += item.quantity
    } else {
        cartItems.push(item)
    }
    updateCount(item.quantity)
    sessionStorage.setItem('cart', JSON.stringify(cartItems))
}








