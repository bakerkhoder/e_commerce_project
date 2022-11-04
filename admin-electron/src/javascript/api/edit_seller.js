const submit_edit = document.querySelector('.edit-btnn')
const popup_edit = document.querySelector('#edit-popup')
const edit_input_username = document.getElementById('edit-username-input')
const edit_username_error = document.getElementById('edit-username-error')
const edit_input_email = document.getElementById('edit-email-input')
const edit_email_error = document.getElementById('edit-email-error')
// const edit_input_password = document.getElementById('edit-password-input')
// const edit_password_error = document.getElementById('edit-password-error')
const edit_input_name = document.getElementById('edit-name-input')
const edit_name_error = document.getElementById('edit-name-error')

submit_edit.addEventListener('click', () => {
  // check if input fields are valid before calling the api
  if (
    validName(edit_input_name, edit_name_error) &&
    validUsername(edit_input_username, edit_username_error) &&
    // passStrong(edit_input_password, edit_password_error) &&
    validEmail(edit_input_email, edit_email_error)
  ) {
    const data = new FormData()
    data.append('id', popup_edit.dataset.id)
    data.append('username', edit_input_username.value)
    // data.append('password', edit_input_password.value)
    data.append('email', edit_input_email.value)
    data.append('name', edit_input_name.value)

    if (base64_image_edit) {
      data.append('profile_picture', base64_image_edit)
    }
    editSeller(data)
  } else {
    console.log('bad format')
  }
})

// call the create seller api and pass the required data and display a message for the user accordingly
async function editSeller(data) {
  const response = await axios.post(
    'http://localhost/e-commerce-project/e-commerce-server/api/edit_seller.php',
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
