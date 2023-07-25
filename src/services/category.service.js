exports.getCategory = async () => {
    const response = await fetch('https://jewelly-f94d514b961f.herokuapp.com/api/v1/category')
    return await response.json()
}
