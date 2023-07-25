const products = [];

const data = {
  titles: 'products',
  products: [{
    image: '../assets/img/product-1.jpg',
    imageAlt: 'Green Tea',
    title: 'Green Tea',
    description: 'Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum',

  }, {
    image: '../assets/img/product-2.jpg',
    imageAlt: 'Black Tea',
    title: 'Black Tea',
    description: 'Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum',
  }, {
    image: '../assets/img/product-3.jpg',
    imageAlt: 'Spiced Tea',
    title: 'Spiced Tea',
    description: 'Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum',
  }, {
    image: '../assets/img/product-4.jpg',
    imageAlt: 'Organic Tea',
    title: 'Organic Tea',
    description: 'Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum',
  }]
};

const addProduct = (product) =>{
  products.push(product);
};

module.exports ={
  products,
  addProduct
}

const product = document.getElementById('product');
getDataFromPublicAPI();

async function getDataFromPublicAPI() {
  const responseAPI = await fetch('https://jewelly-f94d514b961f.herokuapp.com/api/v1/product');
  console.log('responseAPI :>> ', responseAPI);
  const data = await responseAPI.json;
  console.log('data :>> ', data);
}