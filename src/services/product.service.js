exports.getProduct = async () => {
    const response  = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/product`)
    return await response.json()
}

exports.getProductDetail = async (id) => {
    const response = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/product/detail?id=${id}`)
    return await response.json()
}
