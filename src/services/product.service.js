exports.getProduct = async () => {
    const response  = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/product`)
    return await response.json()
}
