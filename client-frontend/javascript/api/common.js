// created an html element containing product information
// adding the id of each product in the card dataset for further utilisation

function createCard(title, description, price, image, id) {
  const newCard = document.createElement('div')
  newCard.classList.add('card')
  newCard.dataset.id = id
  newCard.addEventListener('click', () => {
    sessionStorage.setItem('currentProduct', newCard.dataset.id)
    window.location.href = 'single_product.html'
  })

  let newElement = document.createElement('img')
  newElement.src = '../seller-frontend/assets/images/products/' + image
  newCard.appendChild(newElement)

  newElement = document.createElement('h3')
  newElement.innerText = title
  newCard.appendChild(newElement)

  newElement = document.createElement('p')
  newElement.classList.add('description')
  newElement.innerText = description
  newCard.appendChild(newElement)

  newElement = document.createElement('div')
  newElement.classList.add('price_and_heart')
  newElement.innerHTML =
    '<h6>$<span class="product_price">' +
    price +
    '</span></h6><i class="fa-regular fa-heart green"></i>'
  newCard.appendChild(newElement)

  newElement = document.createElement('button')
  newElement.classList.add('buy')
  newElement.innerText = 'Buy now'
  newCard.appendChild(newElement)
  return newCard
}

async function addViewers(id) {
  const data = new FormData()
  data.append('product_id', id)
  const response = await axios.post(
    'http://localhost/e-commerce/ecommerce-server/api/increment_views.php',
    data
  )
}
