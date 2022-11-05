const submit = document.querySelector('.add-btnn')
const popup = document.querySelector('.addd')
const input_code = document.getElementById('name-input')
const code_error = document.getElementById('name-error')
const input_percentage = document.getElementById('username-input')
const percentage_error = document.getElementById('username-error')
const input_expiry = document.getElementById('password-input')
const expiry_error = document.getElementById('password-error')

submit.addEventListener('click', () => {
  // check if input fields are valid before calling the api
  if (
    isEmpty(input_code, code_error, 'code') &&
    isEmpty(input_percentage, percentage_error, 'percentage') &&
    isNumberr(input_percentage, percentage_error, 'percentage') &&
    isEmpty(input_expiry, expiry_error, 'expiry date')
  ) {
    const data = new FormData()
    data.append('seller_id', user_id)
    data.append('code', input_code.value)
    data.append('percentage', input_percentage.value)
    data.append('expiry', input_expiry.value)
    // console.log(data)
    addCode(data)
  } else {
    console.log('bad format')
  }
})

async function addCode(data) {
  const response = await axios.post(
    'http://localhost/e-commerce/ecommerce-server/api/add_discount.php',
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
