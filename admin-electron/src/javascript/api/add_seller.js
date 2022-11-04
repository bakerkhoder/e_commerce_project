const submit = document.querySelector('.add-btnn')
const popup = document.querySelector('.addd')
const input_username = document.getElementById('username-input')
const username_error = document.getElementById('username-error')
const input_email = document.getElementById('email-input')
const email_error = document.getElementById('email-error')
const input_password = document.getElementById('password-input')
const password_error = document.getElementById('password-error')
const input_name = document.getElementById('name-input')
const name_error = document.getElementById('name-error')

submit.addEventListener('click', () => {
  console.log('dsfdf')
  // check if input fields are valid before calling the api
  if (
    validName(input_name, name_error) &&
    validUsername(input_username, username_error) &&
    passStrong(input_password, password_error) &&
    validEmail(input_email, email_error)
  ) {
    const data = new FormData()
    data.append('username', input_username.value)
    data.append('password', input_password.value)
    data.append('email', input_email.value)
    data.append('type', 'seller')
    data.append('name', input_name.value)
    if (base64_image) {
      data.append('profile_picture', base64_image)
    }
    addSeller(data)
  } else {
    console.log('bad format')
  }
})

// call the create seller api and pass the required data and display a message for the user accordingly
async function addSeller(data) {
  const response = await axios.post(
    'http://localhost/e-commerce-project/e-commerce-server/api/create_user.php',
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
