exports.getProduct = async () => {
    const response = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/product`)
    return await response.json()
}

exports.getProductWithParams = async (params) => {
    const response = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/product?${params}`)
    return await response.json()
}

exports.getProductDetail = async (id) => {
    const response = await fetch(`https://jewelly-f94d514b961f.herokuapp.com/api/v1/product/detail?id=${id}`)
    return await response.json()
}

// branchId=1&categoryId=1&productType=1


exports.mappedQueryParams = (query) => {
    const result = []
    for (const [key, value] of Object.entries(query)) {
        switch (key) {
            case 'category':
                if(Array.isArray(value)){
                    result.push(value.map(val => "categoryId=" + val).join('&'))
                }else{
                    result.push(`categoryId=${String(value)}`)
                }
                break
            case 'subCategory':
                if(Array.isArray(value)){
                    result.push(value.map(val => "productType=" + val).join('&'))
                }else{
                    result.push(`productType=${String(value)}`)
                }
                break
            case 'branch':
                if(Array.isArray(value)){
                    result.push(value.map(val => "branchId=" + val).join('&'))
                }else{
                    result.push(`branchId=${String(value)}`)
                }
                break
        }
    }

    return result.join('&')

}
