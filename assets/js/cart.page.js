const placeCartItem = document.querySelector('#cart-place-item')
const totalPriceEls = document.querySelector('#total-price')
const subTotal = document.querySelector('#sub-total')

let items = []

// const emptyTemplate = `<tr><td colspan="6"><h5>No result found</h5></td></tr>`

const totalPrice = 0

const setEmptyCart = () => {
    placeCartItem.innerHTML = emptyTemplate
}

setEmptyCart()

const mapTemplate = (item, index) => {
    console.log(item.quality)
    const itemTemplate = cartTemplate
    return itemTemplate.replaceAll('{{ONCLICK_REMOVE}}', `onClick="removeCartItem(${item.id})"`)
        .replaceAll('{{INDEX}}', index)
        .replaceAll('{{BACKGROUND}}', item.image)
        .replaceAll('{{ONCHANGE_QUANTITY}}', `onChangeQuantity(${index}, event)`)
        .replaceAll('{{NAME}}', item.name)
        .replaceAll('{{QUANTITY}}', item.quantity)
        .replaceAll('{{DESCRIPTION}}', item.description)
        .replaceAll('{{TOTAL_PRICE}}', ((item.price ?? 0) * (item.quantity ?? 0)) + '$')
        .replaceAll('{{PRICE}}', item.price + '$')
}

const generateCartItems = (items) => {
    let rs = ''
    items.forEach((val, index) => rs += mapTemplate(val, index))
    return rs
}

const onChangeQuantity = (index, event) => {
    const item = items[index]
    item.quantity = event.target.value
    sessionStorage.setItem('cart', JSON.stringify(
        items.map(val => ({id: val.id, quantity: +val.quantity}))
    ))
    updateCountSession()
    updateItemTotalPrice(item, index)
    updateCartTotalPrice()

}

const updateItemTotalPrice = (item, index) => {
    const totalEls = document.querySelector(`tr[data-index="${index}"] .total`)
    totalEls.innerText = (item.quantity * item.price) + '$'
}

const updateCartTotalPrice = () => {
    const total = calculateTotalPrice(items)
    totalPriceEls.innerText = total + '$'
    subTotal.innerText = total + '$'

}

const calculateTotalPrice = (items) => {
    let rs = 0
    items.forEach(val => {rs += (val.quantity * val.price)})
    return rs
}

const removeCartItem = (id, event) => {
    onCartRemove(id)
    onCartPageRemove(id, event)
}


const onCartPageRemove = (id, event) => {
    if (!cartItems.length) setEmptyCart()
    event.parentElement.parentElement.remove()
}


function init() {
    try {
        const sessionStorageCartItem = sessionStorage.getItem('cart')
        console.log(sessionStorageCartItem)

        if (sessionStorageCartItem && JSON.parse(sessionStorageCartItem) && Array.isArray(JSON.parse(sessionStorageCartItem))) {
            let sessionStorageCartItems = JSON.parse(sessionStorageCartItem)
            let totalCount = 0
            sessionStorageCartItems.forEach(val => {
                totalCount += val.quantity
            })

            let data = (async function () {
                const rawResponse = await fetch('/api/products', {
                    method: 'POST', headers: {
                        'Accept': 'application/json', 'Content-Type': 'application/json'
                    }, body: JSON.stringify({data: sessionStorageCartItems})
                });
                const content = await rawResponse.json()
                console.log(content)
                items = content.data
            })().then(() => {
                if (items.length === 0) return
                updateCartTotalPrice()
                placeCartItem.innerHTML = generateCartItems(items)
            })

        }
    } catch (e) {
        console.error(e)
    }
}

init()
