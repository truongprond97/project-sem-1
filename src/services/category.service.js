exports.getCategory = async () => {
    const response = await fetch('https://jewelly-f94d514b961f.herokuapp.com/api/v1/category')
    return await response.json()
}

exports.getSubCategory = async () => {
    return [
        {
            "name": "Nhân tạo", "id": 1
        },
        {
            "name": "Bán Quý", "id": 2
        },
        {
            "name": "Quý", "id": 3
        }
    ]
}
