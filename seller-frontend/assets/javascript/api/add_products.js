const submit = document.querySelector('.add-btnn')
const popup = document.querySelector('.addd')
const category_options = document.querySelector('#category')
const input_price = document.getElementById('username-input')
const price_error = document.getElementById('username-error')
const input_description = document.getElementById('email-input')
const description_error = document.getElementById('email-error')
const input_qty = document.getElementById('password-input')
const qty_error = document.getElementById('password-error')
const input_title = document.getElementById('name-input')
const title_error = document.getElementById('name-error')
const seller_id = JSON.parse(localStorage.getItem('user')).id

submit.addEventListener('click', () => {
  console.log('dsfdf')
  // check if input fields are valid before calling the api
  if (
    isEmpty(input_title, title_error, 'title') &&
    isEmpty(input_price, price_error, 'price') &&
    isNumberr(input_price, price_error, 'price') &&
    isEmpty(input_qty, qty_error, 'quantity') &&
    isNumberr(input_qty, qty_error, 'quantity') &&
    isEmpty(input_description, description_error, 'description')
  ) {
    const data = new FormData()
    data.append(
      'category_id',
      category_options.options[category_options.selectedIndex].value
    )
    data.append('title', input_title.value)
    data.append('price', input_price.value)
    data.append('qty', input_qty.value)
    data.append('description', input_description.value)
    if (base64_image) {
      data.append('picture', base64_image)
    }

    // console.log(data)
    addProduct(data)
  } else {
    console.log('bad format')
  }
})

// call the create seller api and pass the required data and display a message for the user accordingly
async function addProduct(data) {
  const response = await axios.post(
    'http://localhost/e-commerce/ecommerce-server/api/add_product.php',
    data
  )
  console.log(response.data)
  const old_message = document.querySelector('.status-message')
  if (old_message) {
    old_message.remove()
  }
  const message = document.createElement('span')
  message.classList.add('status-message')
  message.style.color = response.data.status == 1 ? 'lightgreen' : 'red'
  message.innerText = response.data.message
  popup.appendChild(message)

  if (response.data.status) {
    setTimeout(function () {
      window.location.reload()
    }, 1500)
  }
}
