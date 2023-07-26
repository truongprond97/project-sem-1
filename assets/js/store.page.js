
console.log(jQuery)
const detailSelection = document.querySelector('#detail-selection')

const url = new URL(location.href)
const inputParams = new URLSearchParams(url.search)

const branchEls = document.querySelectorAll('input[name="branch-checkbox"]')
const categoryEls = document.querySelectorAll('input[name="category-checkbox"]')

try {

    console.log(inputParams.has('category'))
    if (inputParams.has('category')) {
        const paramCategory = inputParams.get('category')
        const els = Array.from(categoryEls)
        if (Array.isArray(paramCategory)) {
            paramCategory.forEach(
                (params) => {
                    const el = els.find(val => val.value === params)
                    if (el) el.checked = true
                }
            )
        } else if (!!paramCategory) {
            const el = els.find(val => val.value === paramCategory)
            if (el) el.checked = true
        }
    }

    if (inputParams.has('branch')) {
        const paramBranch = inputParams.get('branch')
        const els = Array.from(branchEls)
        if (Array.isArray(paramBranch)) {
            paramBranch.forEach(
                (params) => {
                    const el = els.find(val => val.value === params)
                    if (el) el.checked = true

                }
            )
        } else if (!!paramBranch) {
            const el = els.find(val => val.value === paramBranch)
            if (el) el.checked = true

        }
    }
} catch (e) {
    console.error(e)
}


const onClickSelection = (event) => {
    event.preventDefault()
    detailSelection.classList.toggle('show')
}

const passDataToParams = (event) => {
    console.log(event)
    event.preventDefault()
    const branches = Array.from(document.querySelectorAll('input[name="branch-checkbox"]:checked'))
    const categories = Array.from(document.querySelectorAll('input[name="category-checkbox"]:checked'))
    inputParams.delete('category', null)
    inputParams.delete('branch', null)

    categories.forEach(value => inputParams.append('category', value.value))
    branches.forEach(value => inputParams.append('branch', value.value))

    url.search = inputParams.toString()
    window.history.replaceState({path: url.toString()}, '', url.toString())
}
