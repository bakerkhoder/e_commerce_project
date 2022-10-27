const currentId = sessionStorage.getItem('currentProduct')
const clientId = JSON.parse(localStorage.getItem('auth'))[0]

getProductInfo(currentId)

if (performance.getEntriesByType('navigation')[0].type == 'navigate') {
  addViewers(currentId)
}

async function getProductInfo(id) {


   const data= new FormData()
    data.append('id',id)
  axios({
    method: "post",
    url: "http://localhost/e-commerce-project/e-commerce-server/api/get_product_byid.php",
 data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
   
      const data=response.data.data[0]
      createProduct(data.title,data.price, data.name, data.description,data.image) 
      
      }
    )
    .catch(function (response) {
      //handle error
      console.log(error)
    })


    
//   const response = await axios.get(
//     'http://localhost/e-commerce/ecommerce-server/api/get_product_byid.php?id=' +
//       id
//   )
//   const data = response.data.data[0]
//   createProduct(data.title, data.price, data.name, data.description, data.image)
}

function createProduct(title, price, seller, description, image) {
  const productContainer = document.querySelector('.single-product')
  const left = document.createElement('div')
  left.classList.add('left-single-product')

  let newElement = document.createElement('h1')
  newElement.innerText = title
  left.appendChild(newElement)
  newElement = document.createElement('h2')
  newElement.innerText = 'Price: ' + price + '$'
  left.appendChild(newElement)

  newElement = document.createElement('div')
  newElement.classList.add('single-product-page-seller')
  newElement.innerHTML = '<p>By ' + seller + '</p>'
  left.appendChild(newElement)

  if (description) {
    newElement = document.createElement('div')
    newElement.classList.add('single-product-page-desc')
    newElement.innerHTML = '<p>' + description + '</p>'
    left.appendChild(newElement)
  }

  newElement = document.createElement('div')
  newElement.classList.add('single-product-page-btns')
  let buttonElement = document.createElement('button')
  buttonElement.classList.add('single-product-btn')
  buttonElement.classList.add('green-back')
  buttonElement.classList.add('add-to-cart')
  buttonElement.textContent = 'Add to cart'

  buttonElement.addEventListener('click', async () => {
    const response = await axios.get(
      'http://localhost/e-commerce/ecommerce-server/api/add_items_to_cart.php?client_id=' +
        clientId +
        '&product_id=' +
        currentId
    )
    const res = response.data
    if (res.status) {
      triggerAlert(res.message)
      setTimeout(function () {
        window.location.href = './checkout.html'
      }, 1500)
    } else {
      triggerAlert(res.message)
      setTimeout(function () {
        window.location.reload()
      }, 1500)
    }
  })
  newElement.appendChild(buttonElement)
  buttonElement = document.createElement('button')
  buttonElement.classList.add('single-product-btn')
  buttonElement.classList.add('white-back')
  buttonElement.textContent = 'Add to favorites'
  buttonElement.addEventListener('click', async () => {
    const response = await axios.get(
      'http://localhost/e-commerce/ecommerce-server/api/add_to_favorites.php?client_id=' +
        clientId +
        '&product_id=' +
        currentId
    )
    const res = response.data
    if (res.status) {
      triggerAlert(res.message)
      setTimeout(function () {
        window.location.href = './client_saved_items.html'
      }, 1500)
    } else {
      triggerAlert(res.message)
      setTimeout(function () {
        window.location.reload()
      }, 1500)
    }
  })
  newElement.appendChild(buttonElement)
  left.appendChild(newElement)

  productContainer.appendChild(left)

  newElement = document.createElement('div')
  newElement.classList.add('single-product-page-img')
  newElement.innerHTML =
    '<img src="../seller-frontend/assets/images/products/' + image + '">'

  productContainer.appendChild(newElement)
}
