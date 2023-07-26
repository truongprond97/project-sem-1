const buttonViewMore = document.querySelector('#viewMore'),
    productHidden = document.querySelector('#productHidden'),
    detailSelection = document.querySelector('#detail-selection'),
    mock = document.querySelector('#mock'),
    url = new URL(location.href),
    inputParams = new URLSearchParams(url.search)

const checkInputParams = (params, els) => {
    if (Array.isArray(params)) {
        params.forEach(
            (param) => {
                const el = els.find(val => val.value === param)
                if (el) el.checked = true
            }
        )
    } else if (!!params) {
        const el = els.find(val => val.value === params)
        if (el) el.checked = true
    }
}

const mapParams = key => {
    const params = inputParams.get(key)
    const query = `input[name="${key}-checkbox"]`
    const els = Array.from(document.querySelectorAll(query))
    checkInputParams(params, els)
}

try {
    if (inputParams.has('category')) mapParams('category')
    if (inputParams.has('branch')) mapParams('branch')
    if (inputParams.has('subCategory')) mapParams('subCategory')
} catch (e) {
    console.error(e)
}


const onClickSelection = (event) => {
    event.preventDefault()
    detailSelection.classList.toggle('show')
}

const applyFilter = async (event) => {
    passDataToParams()
    await getFilteredProducts()
    buttonViewMore.classList.add('d-none')
}

const passDataToParams = () => {
    setParams('category')
    setParams('branch')
    setParams('subCategory')
    url.search = inputParams.toString()
    window.history.replaceState({path: url.toString()}, '', url.toString())
}

const setParams = key => {
    const query = `input[name="${key}-checkbox"]:checked`
    inputParams.delete(key)
    const elements = Array.from(document.querySelectorAll(query))
    elements.forEach(value => inputParams.append(key, value.value))
}

const getFilteredProducts = async () => {
    try {
        loading()
        const paramsString = !!inputParams.size ? '?' + inputParams.toString() : ''
        const response = await fetch('/api/products' + paramsString, {
            method: "GET",
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            },

        })
        const data = await response.json()
        console.log(data.data)
        let stringTemplate = generateStringTemplate(data.data)
        mock.innerHTML = stringTemplate

    } catch (e) {
        console.error(e)
    } finally {
        removeLoading()
    }
}


const mappedProductTemplate = (item, index) => {
    const template = storeItemTemplate
    return template
        .replaceAll('<%=timeout%>', (index * 0.1) + 's')
        .replaceAll('<%=product.image%>', item.image)
        .replaceAll('<%=product.name%>', item.name)
        .replaceAll('<%=product.description%>', item.description)
        .replaceAll('<%=product.price%>', item.price)
        .replaceAll('<%=product.id%>', item.id)
}


const emptyTemplateForList = `<div><h4 class="text-center">Opp! No result found for. Try  <a href="javascript:void(0)" onclick="resetFilter()">reset filter</a> ?</h4></div> `
const generateStringTemplate = (items) => {
    let result = ''
    items.forEach((item, index) => result += mappedProductTemplate(item, index))
    !result && (result = emptyTemplateForList)
    return result
}

const removeAllCheckItem = key => {
    const query = `input[name="${key}-checkbox"]:checked`
    inputParams.delete(key)
    const elements = Array.from(document.querySelectorAll(query))
    elements.forEach(value => value.checked = false)
}


const resetFilter = async () => {
    removeAllCheckItem('category')
    removeAllCheckItem('branch')
    removeAllCheckItem('subCategory')
    url.search = inputParams.toString()
    window.history.replaceState({path: url.toString()}, '', url.toString())
    await getFilteredProducts()
}

buttonViewMore.onclick =  async (event) => {
    event.preventDefault()
    await getFilteredProducts()
    buttonViewMore.classList.add('d-none')
}
