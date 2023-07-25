exports.getProduct = async () => {
    const response = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/product`)
    return await response.json()
}

exports.getProductDetail = async (productId) => {
    const response = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/products/detail?id=${productId}`)
    return await response.json()
}
