const loading = () => {
    $('#spinner').addClass('load')
}

const removeLoading = () => {
    $('#spinner').removeClass('load')
}

const validateHeaderActive = () => {
    const url = window.location.href
    console.log(!url.split('/')[3])
    if(!url.split('/')[3]){
        document.querySelector('[data-header="home"]').classList.add('active')
    }else {
       const activeTag =  ['about','product', 'store', 'contact', 'cart'].find(val => url.includes(val))
        console.log(activeTag)
        if(activeTag)  document.querySelector(`[data-header="${activeTag}"]`).classList.add('active')
    }
}

validateHeaderActive()
