const edit_submit = document.querySelector('.edit-btnn')
const popupp = document.querySelector('.editt')
const edit_category_options = document.querySelector('#edit-category')
const edit_input_price = document.getElementById('edit-username-input')
const edit_price_error = document.getElementById('edit-username-error')
const edit_input_description = document.getElementById('edit-email-input')
const edit_description_error = document.getElementById('edit-email-error')
const edit_input_qty = document.getElementById('edit-password-input')
const edit_qty_error = document.getElementById('edit-password-error')
const edit_input_title = document.getElementById('edit-name-input')
const edit_title_error = document.getElementById('edit-name-error')
const edit_seller_id = JSON.parse(localStorage.getItem('user')).id
const image_path = edit_popup.querySelector('#edit-image-element')

edit_submit.addEventListener('click', () => {
  // check if input fields are valid before calling the api
  if (
    isEmpty(edit_input_title, edit_title_error, 'title') &&
    isEmpty(edit_input_price, edit_price_error, 'price') &&
    isNumberr(edit_input_price, edit_price_error, 'price') &&
    isEmpty(edit_input_qty, edit_qty_error, 'quantity') &&
    isNumberr(edit_input_qty, edit_qty_error, 'quantity') &&
    isEmpty(edit_input_description, edit_description_error, 'description')
  ) {
    const data = new FormData()
    data.append('id', edit_popup.dataset.id)
    data.append(
      'category_id',
      edit_category_options.options[edit_category_options.selectedIndex].value
    )
    data.append('title', edit_input_title.value)
    data.append('price', edit_input_price.value)
    data.append('qty', edit_input_qty.value)
    data.append('description', edit_input_description.value)
    if (base64_image) {
      data.append('picture', base64_image)
    } else {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', image_path.src, true)
      xhr.responseType = 'blob'
      xhr.onload = function (e) {
        let reader = new FileReader()
        reader.onload = function (event) {
          var res = event.target.result
          console.log(res)
          data.append('picture', res)
        }
        let file = this.response
        reader.readAsDataURL(file)
      }
      xhr.send()
    }

    console.log(data)
    editProduct(data)
  } else {
    console.log('bad format')
  }
})

// call the create seller api and pass the required data and display a message for the user accordingly
async function editProduct(data) {
  const response = await axios.post(
    'http://localhost/e-commerce-project/e-commerce-server/api/edit_product.php',
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
  console.log(message)
  popupp.appendChild(message)

  if (response.data.status) {
    setTimeout(function () {
      window.location.reload()
    }, 1500)
  }
}
